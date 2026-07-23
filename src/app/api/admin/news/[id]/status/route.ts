import { NextRequest } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';
import { authMiddleware } from '@/lib/auth/middleware';
import { success, notFound, serverError } from '@/lib/api/response';

// PATCH /api/admin/news/[id]/status - 切换发布状态
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
      .from('news')
      .select('is_published')
      .eq('id', parseInt(id))
      .single();

    if (getErr) {
      if (getErr.code === 'PGRST116') {
        return notFound('报道不存在');
      }
      throw getErr;
    }

    const { data, error: err } = await client
      .from('news')
      .update({ is_published: !current.is_published, updated_at: new Date().toISOString() })
      .eq('id', parseInt(id))
      .select()
      .single();

    if (err) throw err;

    return success(data, data.is_published ? '已发布' : '已取消发布');
  } catch (err: any) {
    console.error('Toggle news status error:', err);
    return serverError(err.message || '切换发布状态失败');
  }
}
