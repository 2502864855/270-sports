import { NextRequest } from 'next/server';
import { success, error, badRequest } from '@/lib/api/response';
import { authMiddleware } from '@/lib/auth/middleware';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// POST /api/admin/memberships/[id]/unfreeze - 解冻会员
export async function POST(
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

    const { data: membership, error: findErr } = await client
      .from('memberships')
      .select('*')
      .eq('id', membershipId)
      .single();

    if (findErr || !membership) return error(404, '会员记录不存在');
    if (membership.status !== 'FROZEN') return error(400, '只能解冻已冻结的会员');

    const { data, error: err } = await client
      .from('memberships')
      .update({ status: 'ACTIVE', updated_at: new Date().toISOString() })
      .eq('id', membershipId)
      .select()
      .single();

    if (err) throw err;
    return success(data, '会员已解冻');
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : '解冻失败';
    return error(500, message);
  }
}
