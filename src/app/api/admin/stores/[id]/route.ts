import { NextRequest } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';
import { authMiddleware } from '@/lib/auth/middleware';
import { success, notFound, serverError } from '@/lib/api/response';

// GET /api/admin/stores/[id] - 门店详情
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
      .from('stores')
      .select('*')
      .eq('id', parseInt(id))
      .single();

    if (err) {
      if (err.code === 'PGRST116') {
        return notFound('门店不存在');
      }
      throw err;
    }

    return success(data);
  } catch (err: any) {
    console.error('Get store error:', err);
    return serverError(err.message || '获取门店详情失败');
  }
}

// PUT /api/admin/stores/[id] - 更新门店
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
      .from('stores')
      .update(updateData)
      .eq('id', parseInt(id))
      .select()
      .single();

    if (err) {
      if (err.code === 'PGRST116') {
        return notFound('门店不存在');
      }
      throw err;
    }

    return success(data, '门店更新成功');
  } catch (err: any) {
    console.error('Update store error:', err);
    return serverError(err.message || '更新门店失败');
  }
}

// DELETE /api/admin/stores/[id] - 删除门店
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
      .from('stores')
      .delete()
      .eq('id', parseInt(id));

    if (err) throw err;

    return success(null, '门店删除成功');
  } catch (err: any) {
    console.error('Delete store error:', err);
    return serverError(err.message || '删除门店失败');
  }
}
