import { NextRequest } from 'next/server';
import { success, error } from '@/lib/api/response';
import { authMiddleware } from '@/lib/auth/middleware';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// GET /api/admin/dashboard/overview - 核心指标概览
export async function GET(request: NextRequest) {
  try {
    const auth = await authMiddleware(request);
    if ('status' in auth) return auth;

    const client = getSupabaseClient();
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

    // Parallel queries
    const [
      { count: totalUsers },
      { count: todayNewUsers },
      { count: activeUsers },
      { count: totalVipMembers },
      { count: totalBookings },
      { count: todayBookings },
      { data: revenueData },
      { data: monthRevenueData },
      { data: todayRevenueData },
    ] = await Promise.all([
      client.from('users').select('*', { count: 'exact', head: true }),
      client.from('users').select('*', { count: 'exact', head: true }).gte('created_at', todayStart),
      client.from('users').select('*', { count: 'exact', head: true }).gte('last_login_at', sevenDaysAgo),
      client.from('memberships').select('*', { count: 'exact', head: true }).eq('status', 'ACTIVE'),
      client.from('bookings').select('*', { count: 'exact', head: true }),
      client.from('bookings').select('*', { count: 'exact', head: true }).gte('created_at', todayStart),
      client.from('orders').select('pay_amount').eq('status', 'PAID'),
      client.from('orders').select('pay_amount').eq('status', 'PAID').gte('pay_time', monthStart),
      client.from('orders').select('pay_amount').eq('status', 'PAID').gte('pay_time', todayStart),
    ]);

    // Calculate revenue
    const totalRevenue = (revenueData || []).reduce((sum: number, o: { pay_amount: number }) => sum + (o.pay_amount || 0), 0);
    const monthRevenue = (monthRevenueData || []).reduce((sum: number, o: { pay_amount: number }) => sum + (o.pay_amount || 0), 0);
    const todayRevenue = (todayRevenueData || []).reduce((sum: number, o: { pay_amount: number }) => sum + (o.pay_amount || 0), 0);

    // Completion rate
    const { count: completedBookings } = await client
      .from('bookings')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'COMPLETED');

    const completionRate = totalBookings && totalBookings > 0
      ? Math.round(((completedBookings || 0) / totalBookings) * 100)
      : 0;

    const vipConversionRate = totalUsers && totalUsers > 0
      ? Math.round(((totalVipMembers || 0) / totalUsers) * 100 * 100) / 100
      : 0;

    const totalPaidOrders = (revenueData || []).length;
    const avgOrderValue = totalPaidOrders > 0
      ? Math.round(totalRevenue / totalPaidOrders * 100) / 100
      : 0;

    return success({
      totalUsers: totalUsers || 0,
      todayNewUsers: todayNewUsers || 0,
      activeUsers: activeUsers || 0,
      totalVipMembers: totalVipMembers || 0,
      vipConversionRate,
      totalBookings: totalBookings || 0,
      todayBookings: todayBookings || 0,
      completionRate,
      totalRevenue: Math.round(totalRevenue * 100) / 100,
      monthRevenue: Math.round(monthRevenue * 100) / 100,
      todayRevenue: Math.round(todayRevenue * 100) / 100,
      avgOrderValue,
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : '获取概览数据失败';
    return error(500, message);
  }
}
