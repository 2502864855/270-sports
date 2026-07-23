import { NextRequest } from 'next/server';
import { success, error, badRequest } from '@/lib/api/response';
import { authMiddleware } from '@/lib/auth/middleware';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// GET /api/admin/orders/[id] - 订单详情
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await authMiddleware(request);
    if ('status' in auth) return auth;

    const client = getSupabaseClient();
    const { id } = await params;
    const orderId = parseInt(id);
    if (isNaN(orderId)) return badRequest('无效的订单ID');

    const { data: order, error: orderErr } = await client
      .from('orders')
      .select(`
        *,
        users!orders_user_id_fkey (id, nickname, phone, avatar),
        order_items!order_items_order_id_fkey (*)
      `)
      .eq('id', orderId)
      .single();

    if (orderErr || !order) return error(404, '订单不存在');

    return success({
      ...order,
      user: order.users,
      items: order.order_items,
      users: undefined,
      order_items: undefined,
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : '获取订单详情失败';
    return error(500, message);
  }
}
