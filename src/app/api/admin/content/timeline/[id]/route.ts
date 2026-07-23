import { NextRequest } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';
import { authMiddleware } from '@/lib/auth/middleware';
import { success, notFound, serverError } from '@/lib/api/response';

// PUT /api/admin/content/timeline/[id] - 更新时间线节点
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await authMiddleware(request);
    if ('status' in auth) return auth;

    const client = getSupabaseClient();

    const { id } = await params;
    const body = await request.json();

    const updateData = {
      ...body,
      updated_at: new Date().toISOString(),
    };

    const { data, error: err } = await client
      .from('timeline_events')
      .update(updateData)
      .eq('id', parseInt(id))
      .select()
      .single();

    if (err) {
      if (err.code === 'PGRST116') {
        return notFound('时间线节点不存在');
      }
      throw err;
    }

    return success(data, '时间线节点更新成功');
  } catch (err: any) {
    console.error('Update timeline error:', err);
    return serverError(err.message || '更新时间线节点失败');
  }
}

// DELETE /api/admin/content/timeline/[id] - 删除时间线节点
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await authMiddleware(request);
    if ('status' in auth) return auth;

    const client = getSupabaseClient();

    const { id } = await params;

    const { error: err } = await client
      .from('timeline_events')
      .delete()
      .eq('id', parseInt(id));

    if (err) throw err;

    return success(null, '时间线节点删除成功');
  } catch (err: any) {
    console.error('Delete timeline error:', err);
    return serverError(err.message || '删除时间线节点失败');
  }
}
