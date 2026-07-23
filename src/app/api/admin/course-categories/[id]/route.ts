import { NextRequest } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';
import { success, error, notFound } from '@/lib/api/response';
import { authMiddleware } from '@/lib/auth/middleware';

// GET /api/admin/course-categories/[id] - 分类详情
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await authMiddleware(request);
  if ('status' in auth) return auth;

  const client = getSupabaseClient();
  const { id } = await params;

  const { data, error: err } = await client
    .from('course_categories')
    .select('*')
    .eq('id', id)
    .single();

  if (err) return notFound('分类不存在');

  return success(data);
}

// PUT /api/admin/course-categories/[id] - 更新分类
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await authMiddleware(request);
  if ('status' in auth) return auth;

  const client = getSupabaseClient();
  const { id } = await params;
  const body = await request.json();

  const updateData: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (body.name !== undefined) updateData.name = body.name;
  if (body.nameEn !== undefined) updateData.name_en = body.nameEn;
  if (body.description !== undefined) updateData.description = body.description;
  if (body.icon !== undefined) updateData.icon = body.icon;
  if (body.sortOrder !== undefined) updateData.sort_order = body.sortOrder;
  if (body.isActive !== undefined) updateData.is_active = body.isActive;

  const { data, error: err } = await client
    .from('course_categories')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (err) return notFound('分类不存在');

  return success(data, '更新成功');
}

// DELETE /api/admin/course-categories/[id] - 删除分类
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await authMiddleware(request);
  if ('status' in auth) return auth;

  const client = getSupabaseClient();
  const { id } = await params;

  // 检查是否有关联课程
  const { count } = await client
    .from('courses')
    .select('*', { count: 'exact', head: true })
    .eq('category_id', id);

  if (count && count > 0) {
    return error(400, `该分类下有 ${count} 个课程，无法删除`);
  }

  const { error: err } = await client
    .from('course_categories')
    .delete()
    .eq('id', id);

  if (err) return error(500, err.message);

  return success(null, '删除成功');
}
