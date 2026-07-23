import { NextRequest } from 'next/server';
import { success, error } from '@/lib/api/response';
import { authMiddleware } from '@/lib/auth/middleware';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// GET /api/admin/dashboard/revenue - 营收统计
export async function GET(request: NextRequest) {
  try {
    const auth = await authMiddleware(request);
    if ('status' in auth) return auth;

    const client = getSupabaseClient();
    const now = new Date();

    // Total revenue
    const { data: allPaidOrders } = await client
      .from('orders')
      .select('pay_amount, type, pay_time')
      .eq('status', 'PAID');

    const totalRevenue = (allPaidOrders || []).reduce(
      (sum: number, o: { pay_amount: number }) => sum + (o.pay_amount || 0), 0
    );

    // Monthly revenue (last 12 months)
    const monthlyRevenue = new Map<string, number>();
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      monthlyRevenue.set(key, 0);
    }

    (allPaidOrders || []).forEach((o: { pay_amount: number; pay_time: string | null }) => {
      if (!o.pay_time) return;
      const date = new Date(o.pay_time);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (monthlyRevenue.has(key)) {
        monthlyRevenue.set(key, (monthlyRevenue.get(key) || 0) + (o.pay_amount || 0));
      }
    });

    // Revenue by type
    const typeRevenue = { COURSE: 0, MEMBERSHIP: 0, PRODUCT: 0 };
    (allPaidOrders || []).forEach((o: { pay_amount: number; type: string }) => {
      const type = o.type as keyof typeof typeRevenue;
      if (type in typeRevenue) {
        typeRevenue[type] += o.pay_amount || 0;
      }
    });

    const typeLabels: Record<string, string> = {
      COURSE: '课程收入',
      MEMBERSHIP: '会员收入',
      PRODUCT: '商品收入',
    };

    const revenueByType = Object.entries(typeRevenue).map(([type, amount]) => ({
      type,
      label: typeLabels[type] || type,
      amount: Math.round(amount * 100) / 100,
      percentage: totalRevenue > 0
        ? Math.round((amount / totalRevenue) * 100 * 100) / 100
        : 0,
    }));

    return success({
      totalRevenue: Math.round(totalRevenue * 100) / 100,
      monthlyRevenue: Array.from(monthlyRevenue.entries()).map(([month, amount]) => ({
        month,
        amount: Math.round(amount * 100) / 100,
      })),
      revenueByType,
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : '获取营收统计失败';
    return error(500, message);
  }
}
