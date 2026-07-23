import { NextRequest } from 'next/server';
import { success, error, badRequest } from '@/lib/api/response';
import { authMiddleware } from '@/lib/auth/middleware';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// GET /api/admin/members/[id]/memberships - 用户会员记录列表
export async function GET(
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

    const { data, error: err } = await client
      .from('memberships')
      .select(`
        *,
        member_levels!memberships_level_id_fkey (
          id,
          name,
          level,
          color,
          icon
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (err) throw err;
    return success(data || []);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : '获取会员记录失败';
    return error(500, message);
  }
}
