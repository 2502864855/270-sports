import { NextRequest } from 'next/server';
import { success, error } from '@/lib/api/response';
import { authMiddleware } from '@/lib/auth/middleware';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// GET /api/admin/dashboard/members - 会员统计
export async function GET(request: NextRequest) {
  try {
    const auth = await authMiddleware(request);
    if ('status' in auth) return auth;

    const client = getSupabaseClient();
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59).toISOString();

    // Level distribution
    const { data: levelStats } = await client
      .from('memberships')
      .select(`
        member_levels!memberships_level_id_fkey (id, name, level, color, icon),
        status
      `)
      .eq('status', 'ACTIVE');

    const levelMap = new Map<number, { name: string; level: number; color: string; icon: string; count: number }>();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (levelStats || []).forEach((m: any) => {
      const level = m.member_levels;
      if (!level) return;
      const existing = levelMap.get(level.id);
      if (existing) {
        existing.count++;
      } else {
        levelMap.set(level.id, { name: level.name, level: level.level, color: level.color, icon: level.icon, count: 1 });
      }
    });

    const levelDistribution = Array.from(levelMap.values()).sort((a, b) => a.level - b.level);

    // New members this month
    const { count: newMembersThisMonth } = await client
      .from('memberships')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', monthStart)
      .lte('created_at', monthEnd);

    // Expiring this month
    const { count: expiringThisMonth } = await client
      .from('memberships')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'ACTIVE')
      .gte('end_date', monthStart)
      .lte('end_date', monthEnd);

    // Renewal rate (simplified: active / (active + expired this month))
    const { count: renewedThisMonth } = await client
      .from('memberships')
      .select('*', { count: 'exact', head: true })
      .eq('type', 'RENEWAL')
      .gte('created_at', monthStart)
      .lte('created_at', monthEnd);

    const renewalRate = (newMembersThisMonth || 0) > 0
      ? Math.round(((renewedThisMonth || 0) / (newMembersThisMonth || 1)) * 100 * 100) / 100
      : 0;

    return success({
      levelDistribution,
      newMembersThisMonth: newMembersThisMonth || 0,
      expiringThisMonth: expiringThisMonth || 0,
      renewedThisMonth: renewedThisMonth || 0,
      renewalRate,
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : '获取会员统计失败';
    return error(500, message);
  }
}
