import { NextRequest } from 'next/server';
import { success, error, paginated } from '@/lib/api/response';
import { authMiddleware } from '@/lib/auth/middleware';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// GET /api/admin/orders - 订单列表（分页）
export async function GET(request: NextRequest) {
  try {
    const auth = await authMiddleware(request);
    if ('status' in auth) return auth;

    const client = getSupabaseClient();
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '20');
    const keyword = searchParams.get('keyword') || '';
    const status = searchParams.get('status') || '';
    const type = searchParams.get('type') || '';
    const startDate = searchParams.get('startDate') || '';
    const endDate = searchParams.get('endDate') || '';
    const sortBy = searchParams.get('sortBy') || 'created_at';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    let query = client
      .from('orders')
      .select('*', { count: 'exact' });

    if (keyword) {
      query = query.ilike('order_no', `%${keyword}%`);
    }
    if (status) query = query.eq('status', status);
    if (type) query = query.eq('type', type);
    if (startDate) query = query.gte('created_at', startDate);
    if (endDate) query = query.lte('created_at', endDate);

    const validSortFields = ['created_at', 'pay_amount', 'status', 'order_no'];
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'created_at';
    query = query.order(sortField, { ascending: sortOrder === 'asc' });

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    query = query.range(from, to);

    const { data, error: err, count } = await query;
    if (err) throw err;

    // Enrich with user info
    const orders = data || [];
    const list = await Promise.all(orders.map(async (o: Record<string, unknown>) => {
      const { data: userData } = await client
        .from('users')
        .select('id, nickname, phone, avatar')
        .eq('id', o.user_id as number)
        .single();

      return {
        ...o,
        user: userData || null,
      };
    }));

    return paginated(list, count || 0, page, pageSize);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : '获取订单列表失败';
    return error(500, message);
  }
}
