import { NextRequest } from 'next/server';
import { success, error, badRequest } from '@/lib/api/response';
import { authMiddleware } from '@/lib/auth/middleware';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// PUT /api/admin/memberships/[id] - 修改会员记录
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await authMiddleware(request);
    if ('status' in auth) return auth;

    const client = getSupabaseClient();
    const { id } = await params;
    const membershipId = parseInt(id);
    if (isNaN(membershipId)) return badRequest('无效的会员记录ID');

    const body = await request.json();
    const updateData: Record<string, unknown> = { updated_at: new Date().toISOString() };

    if (body.levelId !== undefined) updateData.level_id = body.levelId;
    if (body.startDate !== undefined) updateData.start_date = body.startDate;
    if (body.endDate !== undefined) updateData.end_date = body.endDate;
    if (body.status !== undefined) updateData.status = body.status;
    if (body.price !== undefined) updateData.price = body.price;
    if (body.remark !== undefined) updateData.remark = body.remark;

    const { data, error: err } = await client
      .from('memberships')
      .update(updateData)
      .eq('id', membershipId)
      .select(`
        *,
        member_levels!memberships_level_id_fkey (id, name, level, color, icon)
      `)
      .single();

    if (err) throw err;
    return success(data, '更新成功');
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : '更新会员记录失败';
    return error(500, message);
  }
}
