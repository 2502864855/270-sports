import { NextRequest } from 'next/server';
import { success, error, badRequest } from '@/lib/api/response';
import { authMiddleware } from '@/lib/auth/middleware';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// PATCH /api/admin/member-levels/[id]/status - 启用/禁用等级
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await authMiddleware(request);
    if ('status' in auth) return auth;

    const client = getSupabaseClient();
    const { id } = await params;
    const levelId = parseInt(id);
    if (isNaN(levelId)) return badRequest('无效的等级ID');

    const body = await request.json();
    const { isActive } = body;
    if (typeof isActive !== 'boolean') {
      return badRequest('isActive 必须是布尔值');
    }

    const { data, error: err } = await client
      .from('member_levels')
      .update({ is_active: isActive, updated_at: new Date().toISOString() })
      .eq('id', levelId)
      .select()
      .single();

    if (err) throw err;
    return success(data, isActive ? '已启用' : '已禁用');
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : '更新状态失败';
    return error(500, message);
  }
}
