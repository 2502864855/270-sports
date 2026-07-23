import { getSupabaseClient } from '@/storage/database/supabase-client';
import bcrypt from 'bcryptjs';
import type { NextRequest } from 'next/server';

// 从请求头获取 API Key
export function getApiKeyFromRequest(request: NextRequest): string | null {
  const apiKey = request.headers.get('X-API-Key');
  if (apiKey && apiKey.startsWith('sk_')) {
    return apiKey;
  }
  return null;
}

// 验证 API Key（支持 bcrypt 哈希比对）
export async function verifyApiKey(plainKey: string, requiredScope?: string): Promise<boolean> {
  const client = getSupabaseClient();
  const now = new Date().toISOString();

  // 获取所有 ACTIVE 且未过期的 key
  const { data: keys, error } = await client
    .from('api_keys')
    .select('id, key, scopes')
    .eq('status', 'ACTIVE')
    .or(`expires_at.is.null,expires_at.gt.${now}`);

  if (error) throw new Error(`验证 API Key 失败: ${error.message}`);
  if (!keys || keys.length === 0) return false;

  // 逐个比对 bcrypt 哈希
  let matchedKey: { id: number; scopes: string[] | null } | null = null;
  for (const k of keys) {
    const isMatch = await bcrypt.compare(plainKey, k.key);
    if (isMatch) {
      matchedKey = { id: k.id, scopes: k.scopes as string[] | null };
      break;
    }
  }

  if (!matchedKey) return false;

  // 更新最后使用时间
  await client
    .from('api_keys')
    .update({ last_used_at: now })
    .eq('id', matchedKey.id);

  // 验证权限范围
  if (requiredScope && matchedKey.scopes) {
    const scopes = matchedKey.scopes;
    const [requiredResource, requiredAction] = requiredScope.split(':');
    const hasScope = scopes.some((scope: string) => {
      const [resource, actions] = scope.split(':');
      // 'all' 是通配符，匹配所有资源
      const resourceMatch = resource === 'all' || resource === requiredResource;
      const actionMatch = actions === 'all' || actions.includes(requiredAction);
      return resourceMatch && actionMatch;
    });
    return hasScope;
  }

  return true;
}
