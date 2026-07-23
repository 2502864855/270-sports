import { NextRequest } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';
import { authMiddleware } from '@/lib/auth/middleware';
import { success, notFound, serverError } from '@/lib/api/response';

// PATCH /api/admin/coaches/[id]/status - 切换在职状态
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await authMiddleware(request);
    if ('status' in auth) return auth;

    const client = getSupabaseClient();

    const { id } = await params;

    // 先获取当前状态
    const { data: current, error: getErr } = await client
      .from('coaches')
      .select('is_active')
      .eq('id', parseInt(id))
      .single();

    if (getErr) {
      if (getErr.code === 'PGRST116') {
        return notFound('教练不存在');
      }
      throw getErr;
    }

    const { data, error: err } = await client
      .from('coaches')
      .update({ is_active: !current.is_active, updated_at: new Date().toISOString() })
      .eq('id', parseInt(id))
      .select()
      .single();

    if (err) throw err;

    return success(data, data.is_active ? '已设为在职' : '已设为离职');
  } catch (err: any) {
    console.error('Toggle coach status error:', err);
    return serverError(err.message || '切换在职状态失败');
  }
}
