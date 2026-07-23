import { NextRequest } from 'next/server';
import { error, badRequest } from '@/lib/api/response';
import { authMiddleware } from '@/lib/auth/middleware';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// GET /api/admin/orders/export - 订单导出 CSV
export async function GET(request: NextRequest) {
  try {
    const auth = await authMiddleware(request);
    if ('status' in auth) return auth;

    const client = getSupabaseClient();
    const searchParams = request.nextUrl.searchParams;
    const keyword = searchParams.get('keyword') || '';
    const status = searchParams.get('status') || '';
    const type = searchParams.get('type') || '';
    const startDate = searchParams.get('startDate') || '';
    const endDate = searchParams.get('endDate') || '';

    let query = client
      .from('orders')
      .select(`
        *,
        users!orders_user_id_fkey (nickname, phone)
      `)
      .order('created_at', { ascending: false });

    if (keyword) {
      query = query.or(`order_no.ilike.%${keyword}%,users.phone.ilike.%${keyword}%`);
    }
    if (status) query = query.eq('status', status);
    if (type) query = query.eq('type', type);
    if (startDate) query = query.gte('created_at', startDate);
    if (endDate) query = query.lte('created_at', endDate);

    // Limit to 10000 records for export
    query = query.limit(10000);

    const { data, error: err } = await query;
    if (err) throw err;

    const statusMap: Record<string, string> = {
      PENDING: '待支付', PAID: '已支付', CANCELLED: '已取消',
      REFUNDED: '已退款', COMPLETED: '已完成',
    };
    const typeMap: Record<string, string> = {
      COURSE: '课程', MEMBERSHIP: '会员', PRODUCT: '商品',
    };

    // Build CSV
    const headers = ['订单号', '用户昵称', '手机号', '类型', '总金额', '优惠金额', '实付金额', '支付方式', '状态', '下单时间', '支付时间'];
    const rows = (data || []).map(o => [
      o.order_no,
      o.users?.nickname || '',
      o.users?.phone || '',
      typeMap[o.type] || o.type,
      o.total_amount,
      o.discount_amount || 0,
      o.pay_amount,
      o.pay_method || '',
      statusMap[o.status] || o.status,
      o.created_at,
      o.pay_time || '',
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')),
    ].join('\n');

    // Add BOM for Excel compatibility
    const bom = '\uFEFF';
    const csv = bom + csvContent;

    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="orders_${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : '导出失败';
    return error(500, message);
  }
}
