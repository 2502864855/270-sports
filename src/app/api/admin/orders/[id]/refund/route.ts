import { NextRequest } from 'next/server';
import { success, error, badRequest } from '@/lib/api/response';
import { authMiddleware } from '@/lib/auth/middleware';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// POST /api/admin/orders/[id]/refund - 退款处理
export async function POST(
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

    const body = await request.json();
    const { refundReason, refundAmount } = body;
    if (!refundReason) return badRequest('退款原因不能为空');

    // Get order
    const { data: order, error: findErr } = await client
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (findErr || !order) return error(404, '订单不存在');
    if (order.status !== 'PAID' && order.status !== 'COMPLETED') {
      return error(400, '只能退款已支付或已完成的订单');
    }

    const actualRefundAmount = refundAmount || order.pay_amount;
    if (actualRefundAmount > order.pay_amount) {
      return error(400, '退款金额不能超过支付金额');
    }

    const now = new Date().toISOString();
    const { data, error: err } = await client
      .from('orders')
      .update({
        status: 'REFUNDED',
        refund_time: now,
        refund_reason: refundReason,
        remark: `退款金额: ¥${actualRefundAmount}. ${order.remark || ''}`.trim(),
        updated_at: now,
      })
      .eq('id', orderId)
      .select()
      .single();

    if (err) throw err;
    return success(data, '退款成功');
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : '退款失败';
    return error(500, message);
  }
}
