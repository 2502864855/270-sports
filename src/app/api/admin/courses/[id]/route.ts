import { NextRequest } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';
import { success, error, notFound } from '@/lib/api/response';
import { authMiddleware } from '@/lib/auth/middleware';

// GET /api/admin/courses/[id] - 课程详情
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await authMiddleware(request);
  if ('status' in auth) return auth;

  const client = getSupabaseClient();
  const { id } = await params;

  const { data, error: err } = await client
    .from('courses')
    .select(`
      *,
      course_categories (name, name_en),
      coaches (name, title, avatar)
    `)
    .eq('id', id)
    .single();

  if (err) return notFound('课程不存在');

  // 转换数据格式
  const course = {
    ...data,
    categoryName: (data.course_categories as Record<string, unknown>)?.name || null,
    categoryNameEn: (data.course_categories as Record<string, unknown>)?.name_en || null,
    coachName: (data.coaches as Record<string, unknown>)?.name || null,
    coachTitle: (data.coaches as Record<string, unknown>)?.title || null,
    coachAvatar: (data.coaches as Record<string, unknown>)?.avatar || null,
    course_categories: undefined,
    coaches: undefined,
  };

  return success(course);
}

// PUT /api/admin/courses/[id] - 更新课程
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

  // 映射字段名
  const fieldMap: Record<string, string> = {
    title: 'title',
    subtitle: 'subtitle',
    categoryId: 'category_id',
    description: 'description',
    highlights: 'highlights',
    suitableFor: 'suitable_for',
    outline: 'outline',
    duration: 'duration',
    difficulty: 'difficulty',
    price: 'price',
    originalPrice: 'original_price',
    memberPrice: 'member_price',
    coverImage: 'cover_image',
    images: 'images',
    coachId: 'coach_id',
    capacity: 'capacity',
    status: 'status',
    sortOrder: 'sort_order',
    isRecommended: 'is_recommended',
    isHot: 'is_hot',
  };

  for (const [key, dbKey] of Object.entries(fieldMap)) {
    if (body[key] !== undefined) {
      updateData[dbKey] = body[key];
    }
  }

  const { data, error: err } = await client
    .from('courses')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (err) return notFound('课程不存在');

  return success(data, '更新成功');
}

// DELETE /api/admin/courses/[id] - 删除课程
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await authMiddleware(request);
  if ('status' in auth) return auth;

  const client = getSupabaseClient();
  const { id } = await params;

  // 检查是否有关联预约
  const { count } = await client
    .from('bookings')
    .select('*', { count: 'exact', head: true })
    .eq('course_id', id);

  if (count && count > 0) {
    return error(400, `该课程有 ${count} 个预约记录，无法删除`);
  }

  const { error: err } = await client
    .from('courses')
    .delete()
    .eq('id', id);

  if (err) return error(500, err.message);

  return success(null, '删除成功');
}
