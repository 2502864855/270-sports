import { NextRequest } from 'next/server';
import { success, error, badRequest } from '@/lib/api/response';
import { authMiddleware } from '@/lib/auth/middleware';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// POST /api/admin/members/[id]/membership - 开通/续费会员
export async function POST(
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
    const { levelId, type, startDate, endDate, price, remark } = body;

    if (!levelId || !type || !price) {
      return badRequest('缺少必填参数: levelId, type, price');
    }
    if (!['NEW', 'RENEWAL', 'UPGRADE', 'GIFT'].includes(type)) {
      return badRequest('无效的会员类型');
    }

    // Get level info
    const { data: level, error: levelErr } = await client
      .from('member_levels')
      .select('*')
      .eq('id', levelId)
      .single();

    if (levelErr || !level) return error(404, '会员等级不存在');

    // Check existing active membership
    const { data: activeMembership } = await client
      .from('memberships')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'ACTIVE')
      .maybeSingle();

    const now = new Date();
    const effectiveStartDate = startDate ? new Date(startDate) : now;
    let effectiveEndDate: Date;

    if (endDate) {
      effectiveEndDate = new Date(endDate);
    } else {
      // Default: 1 month from start
      effectiveEndDate = new Date(effectiveStartDate);
      effectiveEndDate.setMonth(effectiveEndDate.getMonth() + 1);
    }

    // If renewing, extend from current end date
    if (type === 'RENEWAL' && activeMembership) {
      const currentEnd = new Date(activeMembership.end_date);
      if (currentEnd > now) {
        effectiveStartDate.setTime(currentEnd.getTime());
        effectiveEndDate = new Date(currentEnd);
        effectiveEndDate.setMonth(effectiveEndDate.getMonth() + 1);
      }
    }

    // If upgrading, expire old membership
    if (type === 'UPGRADE' && activeMembership) {
      await client
        .from('memberships')
        .update({ status: 'EXPIRED', updated_at: now.toISOString() })
        .eq('id', activeMembership.id);
    }

    // Create new membership
    const { data: membership, error: memErr } = await client
      .from('memberships')
      .insert({
        user_id: userId,
        level_id: levelId,
        type,
        start_date: effectiveStartDate.toISOString(),
        end_date: effectiveEndDate.toISOString(),
        status: 'ACTIVE',
        price,
        remark: remark || null,
      })
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
      .single();

    if (memErr) throw memErr;

    return success(membership, type === 'NEW' ? '开通成功' : type === 'RENEWAL' ? '续费成功' : '升级成功');
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : '操作失败';
    return error(500, message);
  }
}
