import { NextRequest } from 'next/server';
import { success, error, badRequest } from '@/lib/api/response';
import { authMiddleware } from '@/lib/auth/middleware';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// PATCH /api/admin/members/[id]/status - 启用/禁用用户
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await authMiddleware(request);
    if ('status' in auth) return auth;

    const client = getSupabaseClient();
    const { id } = await params;
    const userId = parseInt(id);
    if (isNaN(userId)) return badRequest('无效的用户ID');

    const body = await request.json();
    const { status } = body;
    if (!['ACTIVE', 'DISABLED'].includes(status)) {
      return badRequest('无效的状态值');
    }

    const { data, error: err } = await client
      .from('users')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', userId)
      .select()
      .single();

    if (err) throw err;
    return success(data, status === 'ACTIVE' ? '已启用' : '已禁用');
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : '更新状态失败';
    return error(500, message);
  }
}
