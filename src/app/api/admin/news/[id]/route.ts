import { NextRequest } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';
import { authMiddleware } from '@/lib/auth/middleware';
import { success, notFound, serverError } from '@/lib/api/response';

// GET /api/admin/news/[id] - 获取单条详情
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await authMiddleware(request);
    if ('status' in auth) return auth;

    const client = getSupabaseClient();

    const { id } = await params;

    const { data, error: err } = await client
      .from('news')
      .select('*')
      .eq('id', parseInt(id))
      .single();

    if (err) {
      if (err.code === 'PGRST116') {
        return notFound('报道不存在');
      }
      throw err;
    }

    return success(data);
  } catch (err: any) {
    console.error('Get news error:', err);
    return serverError(err.message || '获取报道详情失败');
  }
}

// PUT /api/admin/news/[id] - 更新报道
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
      .from('news')
      .update(updateData)
      .eq('id', parseInt(id))
      .select()
      .single();

    if (err) {
      if (err.code === 'PGRST116') {
        return notFound('报道不存在');
      }
      throw err;
    }

    return success(data, '报道更新成功');
  } catch (err: any) {
    console.error('Update news error:', err);
    return serverError(err.message || '更新报道失败');
  }
}

// DELETE /api/admin/news/[id] - 删除报道
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
      .from('news')
      .delete()
      .eq('id', parseInt(id));

    if (err) throw err;

    return success(null, '报道删除成功');
  } catch (err: any) {
    console.error('Delete news error:', err);
    return serverError(err.message || '删除报道失败');
  }
}
