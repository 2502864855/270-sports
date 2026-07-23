import { NextRequest } from 'next/server';
import { success, serverError } from '@/lib/api/response';
import { apiKeyMiddleware } from '@/lib/auth/middleware';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// GET /api/v1/members/stats - 会员统计
export async function GET(request: NextRequest) {
  try {
    const auth = await apiKeyMiddleware(request, 'members:read');
    if ('status' in auth) return auth;

    const client = getSupabaseClient();

    // 总用户数
    const { count: totalUsers } = await client
      .from('users')
      .select('*', { count: 'exact', head: true });

    // VIP 会员数（active memberships）
    const { count: totalVip } = await client
      .from('memberships')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'ACTIVE');

    // 各等级分布
    const { data: levelStats } = await client
      .from('memberships')
      .select('level_id, member_levels!memberships_level_id_fkey (name, level)')
      .eq('status', 'ACTIVE');

    const distribution: Record<string, number> = {};
    (levelStats || []).forEach((m) => {
      const levelName = m.member_levels?.[0]?.name || '未知';
      distribution[levelName] = (distribution[levelName] || 0) + 1;
    });

    // 本月新增会员
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    const { count: newThisMonth } = await client
      .from('memberships')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'ACTIVE')
      .gte('created_at', monthStart);

    // 本月到期会员
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59).toISOString();
    const { count: expiringThisMonth } = await client
      .from('memberships')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'ACTIVE')
      .lte('end_date', monthEnd)
      .gte('end_date', now.toISOString());

    const vipConversionRate = totalUsers && totalUsers > 0
      ? Math.round(((totalVip || 0) / totalUsers) * 10000) / 100
      : 0;

    return success({
      totalUsers: totalUsers || 0,
      totalVipMembers: totalVip || 0,
      vipConversionRate,
      levelDistribution: Object.entries(distribution).map(([name, count]) => ({ name, count })),
      newMembersThisMonth: newThisMonth || 0,
      expiringThisMonth: expiringThisMonth || 0,
    });
  } catch (err: unknown) {
    return serverError((err as Error).message);
  }
}
