import { NextRequest } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';
import { success, error, badRequest, paginated } from '@/lib/api/response';
import { authMiddleware } from '@/lib/auth/middleware';

// GET /api/admin/courses - 课程列表
export async function GET(request: NextRequest) {
  const auth = await authMiddleware(request);
  if ('status' in auth) return auth;

  const client = getSupabaseClient();
  const { searchParams } = new URL(request.url);

  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('pageSize') || '20');
  const keyword = searchParams.get('keyword');
  const categoryId = searchParams.get('categoryId');
  const status = searchParams.get('status');
  const difficulty = searchParams.get('difficulty');
  const isRecommended = searchParams.get('isRecommended');
  const isHot = searchParams.get('isHot');
  const sortBy = searchParams.get('sortBy') || 'sort_order';
  const sortOrder = searchParams.get('sortOrder') || 'asc';

  // 构建查询 - 使用 JOIN 获取分类名称和教练姓名
  let query = client
    .from('courses')
    .select(`
      *,
      course_categories (name, name_en),
      coaches (name, title)
    `, { count: 'exact' })
    .order(sortBy === 'createdAt' ? 'created_at' : sortBy === 'totalBookings' ? 'total_bookings' : sortBy === 'price' ? 'price' : 'sort_order', { ascending: sortOrder === 'asc' });

  // 应用筛选条件
  if (keyword) {
    query = query.or(`title.ilike.%${keyword}%,subtitle.ilike.%${keyword}%`);
  }
  if (categoryId) {
    query = query.eq('category_id', categoryId);
  }
  if (status) {
    query = query.eq('status', status);
  }
  if (difficulty) {
    query = query.eq('difficulty', difficulty);
  }
  if (isRecommended !== null) {
    query = query.eq('is_recommended', isRecommended === 'true');
  }
  if (isHot !== null) {
    query = query.eq('is_hot', isHot === 'true');
  }

  // 分页
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  query = query.range(from, to);

  const { data, error: err, count } = await query;
  if (err) return error(500, err.message);

  // 转换数据格式，将关联数据扁平化
  const list = (data || []).map((course: Record<string, unknown>) => ({
    ...course,
    categoryName: (course.course_categories as Record<string, unknown>)?.name || null,
    categoryNameEn: (course.course_categories as Record<string, unknown>)?.name_en || null,
    coachName: (course.coaches as Record<string, unknown>)?.name || null,
    coachTitle: (course.coaches as Record<string, unknown>)?.title || null,
    course_categories: undefined,
    coaches: undefined,
  }));

  return paginated(list, count || 0, page, pageSize);
}

// POST /api/admin/courses - 新增课程
export async function POST(request: NextRequest) {
  const auth = await authMiddleware(request);
  if ('status' in auth) return auth;

  const client = getSupabaseClient();
  const body = await request.json();

  // 验证必填字段
  if (!body.title) return badRequest('课程标题不能为空');
  if (!body.categoryId) return badRequest('课程分类不能为空');
  if (body.price === undefined) return badRequest('课程价格不能为空');
  if (!body.duration) return badRequest('课程时长不能为空');
  if (!body.difficulty) return badRequest('课程难度不能为空');

  const { data, error: err } = await client
    .from('courses')
    .insert({
      title: body.title,
      subtitle: body.subtitle,
      category_id: body.categoryId,
      description: body.description,
      highlights: body.highlights || [],
      suitable_for: body.suitableFor || [],
      outline: body.outline || [],
      duration: body.duration,
      difficulty: body.difficulty,
      price: body.price,
      original_price: body.originalPrice,
      member_price: body.memberPrice,
      cover_image: body.coverImage,
      images: body.images || [],
      coach_id: body.coachId,
      capacity: body.capacity,
      status: body.status || 'DRAFT',
      sort_order: body.sortOrder ?? 0,
      is_recommended: body.isRecommended ?? false,
      is_hot: body.isHot ?? false,
    })
    .select()
    .single();

  if (err) return error(500, err.message);

  return success(data, '创建成功');
}
