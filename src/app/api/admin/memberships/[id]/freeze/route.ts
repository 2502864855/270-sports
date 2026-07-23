import { NextRequest } from 'next/server';
import { success, error, badRequest } from '@/lib/api/response';
import { authMiddleware } from '@/lib/auth/middleware';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// POST /api/admin/memberships/[id]/freeze - 冻结会员
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
    if (membership.status !== 'ACTIVE') return error(400, '只能冻结生效中的会员');

    const { data, error: err } = await client
      .from('memberships')
      .update({ status: 'FROZEN', updated_at: new Date().toISOString() })
      .eq('id', membershipId)
      .select()
      .single();

    if (err) throw err;
    return success(data, '会员已冻结');
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : '冻结失败';
    return error(500, message);
  }
}
