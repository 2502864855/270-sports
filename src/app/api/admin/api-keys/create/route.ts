import { NextRequest } from 'next/server';
import { success, badRequest, serverError } from '@/lib/api/response';
import { authMiddleware } from '@/lib/auth/middleware';
import { getSupabaseClient } from '@/storage/database/supabase-client';
import { randomBytes } from 'crypto';
import bcrypt from 'bcryptjs';

// POST /api/admin/api-keys - 生成 API Key
export async function POST(request: NextRequest) {
  try {
    const auth = await authMiddleware(request);
    if ('status' in auth) return auth;

    const body = await request.json();
    const { name, scopes, expiresAt } = body;

    if (!name) return badRequest('名称不能为空');
    if (!scopes || !Array.isArray(scopes) || scopes.length === 0) {
      return badRequest('权限范围不能为空');
    }

    // 生成 API Key: sk_ + 32位随机字符串
    const plainKey = `sk_${randomBytes(32).toString('hex')}`;
    
    // 存储 bcrypt 哈希
    const keyHash = await bcrypt.hash(plainKey, 10);

    const client = getSupabaseClient();
    const { data, error } = await client
      .from('api_keys')
      .insert({
        key: keyHash,
        name,
        scopes: scopes.map((s: { resource: string; actions: string[] }) => 
          `${s.resource}:${s.actions.join(',')}`
        ),
        expires_at: expiresAt ? new Date(expiresAt).toISOString() : null,
        status: 'ACTIVE',
        created_by: (auth.payload as { sub: number }).sub,
      })
      .select()
      .single();

    if (error) throw error;

    // 仅创建时返回完整 key
    return success({
      id: data.id,
      name: data.name,
      key: plainKey, // 仅此一次返回明文
      key_prefix: plainKey.substring(0, 8) + '...',
      scopes: data.scopes,
      status: data.status,
      expires_at: data.expires_at,
      created_at: data.created_at,
    }, 'API Key 创建成功，请妥善保存');
  } catch (err: unknown) {
    return serverError((err as Error).message);
  }
}
