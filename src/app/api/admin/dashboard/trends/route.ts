import { NextRequest } from 'next/server';
import { success, error, badRequest } from '@/lib/api/response';
import { authMiddleware } from '@/lib/auth/middleware';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// GET /api/admin/dashboard/trends - 趋势数据
export async function GET(request: NextRequest) {
  try {
    const auth = await authMiddleware(request);
    if ('status' in auth) return auth;

    const client = getSupabaseClient();
    const searchParams = request.nextUrl.searchParams;
    const period = searchParams.get('period') || 'day';
    const metric = searchParams.get('metric') || 'users';
    const days = searchParams.get('days') || '30';

    const numDays = parseInt(days);
    if (isNaN(numDays) || numDays < 1 || numDays > 365) {
      return badRequest('days 参数必须在 1-365 之间');
    }

    const now = new Date();
    const startDate = new Date(now.getTime() - numDays * 24 * 60 * 60 * 1000);

    let tableName = '';
    let dateField = '';
    let countField = '';

    switch (metric) {
      case 'users':
        tableName = 'users';
        dateField = 'created_at';
        break;
      case 'revenue':
        tableName = 'orders';
        dateField = 'pay_time';
        countField = 'pay_amount';
        break;
      case 'bookings':
        tableName = 'bookings';
        dateField = 'created_at';
        break;
      default:
        return badRequest('无效的 metric 参数');
    }

    let query = client
      .from(tableName)
      .select(`${countField || 'id'}, ${dateField}`)
      .gte(dateField, startDate.toISOString())
      .order(dateField, { ascending: true });

    if (metric === 'revenue') {
      query = query.eq('status', 'PAID');
    }

    const { data, error: err } = await query;
    if (err) throw err;

    // Group by date
    const trendMap = new Map<string, number>();
    for (let i = 0; i < numDays; i++) {
      const d = new Date(startDate.getTime() + (i + 1) * 24 * 60 * 60 * 1000);
      const dateKey = d.toISOString().split('T')[0];
      trendMap.set(dateKey, 0);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (data || []).forEach((item: any) => {
      const dateStr = (item[dateField] as string).split('T')[0];
      if (trendMap.has(dateStr)) {
        const current = trendMap.get(dateStr) || 0;
        if (countField) {
          trendMap.set(dateStr, current + (Number(item[countField]) || 0));
        } else {
          trendMap.set(dateStr, current + 1);
        }
      }
    });

    const trends = Array.from(trendMap.entries()).map(([date, value]) => ({
      date,
      value: Math.round(value * 100) / 100,
    }));

    return success({ trends, period, metric, days: numDays });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : '获取趋势数据失败';
    return error(500, message);
  }
}
