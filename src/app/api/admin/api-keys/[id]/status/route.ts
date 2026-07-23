import { NextRequest } from 'next/server';
import { success, badRequest, notFound, serverError } from '@/lib/api/response';
import { authMiddleware } from '@/lib/auth/middleware';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// PATCH /api/admin/api-keys/[id]/status - 启用/禁用
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await authMiddleware(request);
    if ('status' in auth) return auth;

    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!['ACTIVE', 'DISABLED'].includes(status)) {
      return badRequest('状态值无效');
    }

    const client = getSupabaseClient();
    const { data, error } = await client
      .from('api_keys')
      .update({ status })
      .eq('id', parseInt(id))
      .select()
      .single();

    if (error) throw error;
    if (!data) return notFound('API Key 不存在');

    return success(data);
  } catch (err: unknown) {
    return serverError((err as Error).message);
  }
}
