import { NextRequest } from 'next/server';
import { success, error, badRequest } from '@/lib/api/response';
import { authMiddleware } from '@/lib/auth/middleware';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// PATCH /api/admin/orders/[id]/status - 修改订单状态
export async function PATCH(
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
    const { status, remark } = body;
    if (!['PENDING', 'PAID', 'CANCELLED', 'REFUNDED', 'COMPLETED'].includes(status)) {
      return badRequest('无效的状态值');
    }

    const updateData: Record<string, unknown> = {
      status,
      updated_at: new Date().toISOString(),
    };
    if (remark) updateData.remark = remark;

    const { data, error: err } = await client
      .from('orders')
      .update(updateData)
      .eq('id', orderId)
      .select()
      .single();

    if (err) throw err;
    return success(data, '状态已更新');
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : '更新状态失败';
    return error(500, message);
  }
}
