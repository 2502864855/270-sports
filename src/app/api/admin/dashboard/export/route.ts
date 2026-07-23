import { NextRequest } from 'next/server';
import { error } from '@/lib/api/response';
import { authMiddleware } from '@/lib/auth/middleware';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// GET /api/admin/dashboard/export - 导出数据看板 CSV
export async function GET(request: NextRequest) {
  try {
    const auth = await authMiddleware(request);
    if ('status' in auth) return auth;

    const client = getSupabaseClient();

    // Get overview data
    const { count: totalUsers } = await client.from('users').select('*', { count: 'exact', head: true });
    const { count: totalVip } = await client.from('memberships').select('*', { count: 'exact', head: true }).eq('status', 'ACTIVE');
    const { count: totalBookings } = await client.from('bookings').select('*', { count: 'exact', head: true });

    const { data: orders } = await client.from('orders').select('pay_amount').eq('status', 'PAID');
    const totalRevenue = (orders || []).reduce((sum: number, o: { pay_amount: number }) => sum + (o.pay_amount || 0), 0);

    // Build CSV
    const headers = ['指标', '数值'];
    const rows = [
      ['总用户数', totalUsers || 0],
      ['VIP会员数', totalVip || 0],
      ['总预约数', totalBookings || 0],
      ['总营收', `¥${(Math.round(totalRevenue * 100) / 100).toFixed(2)}`],
      ['导出时间', new Date().toLocaleString('zh-CN')],
    ];

    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')),
    ].join('\n');

    const bom = '\uFEFF';
    const csv = bom + csvContent;

    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="dashboard_${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : '导出失败';
    return error(500, message);
  }
}
