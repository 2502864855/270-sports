import { NextRequest } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';
import { success, error, paginated } from '@/lib/api/response';

// GET /api/public/courses - 公开课程列表（仅 PUBLISHED 状态）
export async function GET(request: NextRequest) {
  const client = getSupabaseClient();
  const { searchParams } = new URL(request.url);

  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('pageSize') || '20');
  const categoryId = searchParams.get('categoryId');
  const difficulty = searchParams.get('difficulty');
  const isRecommended = searchParams.get('isRecommended');
  const isHot = searchParams.get('isHot');

  let query = client
    .from('courses')
    .select(`
      id,
      title,
      subtitle,
      category_id,
      description,
      highlights,
      suitable_for,
      duration,
      difficulty,
      price,
      original_price,
      member_price,
      cover_image,
      coach_id,
      capacity,
      total_bookings,
      rating,
      review_count,
      is_recommended,
      is_hot,
      sort_order,
      course_categories (name, name_en),
      coaches (name, title, avatar)
    `, { count: 'exact' })
    .eq('status', 'PUBLISHED')
    .order('sort_order', { ascending: true });

  if (categoryId) {
    query = query.eq('category_id', categoryId);
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

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  query = query.range(from, to);

  const { data, error: err, count } = await query;
  if (err) return error(500, err.message);

  // 转换数据格式
  const list = (data || []).map((course: Record<string, unknown>) => ({
    id: course.id,
    title: course.title,
    subtitle: course.subtitle,
    categoryId: course.category_id,
    categoryName: (course.course_categories as Record<string, unknown>)?.name || null,
    description: course.description,
    highlights: course.highlights,
    suitableFor: course.suitable_for,
    duration: course.duration,
    difficulty: course.difficulty,
    price: course.price,
    originalPrice: course.original_price,
    memberPrice: course.member_price,
    coverImage: course.cover_image,
    coachId: course.coach_id,
    coachName: (course.coaches as Record<string, unknown>)?.name || null,
    coachTitle: (course.coaches as Record<string, unknown>)?.title || null,
    coachAvatar: (course.coaches as Record<string, unknown>)?.avatar || null,
    capacity: course.capacity,
    totalBookings: course.total_bookings,
    rating: course.rating,
    reviewCount: course.review_count,
    isRecommended: course.is_recommended,
    isHot: course.is_hot,
    sortOrder: course.sort_order,
  }));

  return paginated(list, count || 0, page, pageSize);
}
