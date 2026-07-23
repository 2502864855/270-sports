import { NextRequest } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';
import { authMiddleware } from '@/lib/auth/middleware';
import { success, notFound, serverError } from '@/lib/api/response';

// GET /api/admin/coaches/[id] - 教练详情
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
      .from('coaches')
      .select('*')
      .eq('id', parseInt(id))
      .single();

    if (err) {
      if (err.code === 'PGRST116') {
        return notFound('教练不存在');
      }
      throw err;
    }

    return success(data);
  } catch (err: any) {
    console.error('Get coach error:', err);
    return serverError(err.message || '获取教练详情失败');
  }
}

// PUT /api/admin/coaches/[id] - 更新教练
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
      .from('coaches')
      .update(updateData)
      .eq('id', parseInt(id))
      .select()
      .single();

    if (err) {
      if (err.code === 'PGRST116') {
        return notFound('教练不存在');
      }
      throw err;
    }

    return success(data, '教练更新成功');
  } catch (err: any) {
    console.error('Update coach error:', err);
    return serverError(err.message || '更新教练失败');
  }
}

// DELETE /api/admin/coaches/[id] - 删除教练
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
      .from('coaches')
      .delete()
      .eq('id', parseInt(id));

    if (err) throw err;

    return success(null, '教练删除成功');
  } catch (err: any) {
    console.error('Delete coach error:', err);
    return serverError(err.message || '删除教练失败');
  }
}
