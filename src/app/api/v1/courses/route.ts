import { NextRequest } from 'next/server';
import { success, paginated, serverError } from '@/lib/api/response';
import { apiKeyMiddleware } from '@/lib/auth/middleware';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// GET /api/v1/courses - 课程列表（仅已发布）
export async function GET(request: NextRequest) {
  try {
    const auth = await apiKeyMiddleware(request, 'courses:read');
    if ('status' in auth) return auth;

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '20');
    const categoryId = searchParams.get('categoryId');
    const keyword = searchParams.get('keyword');
    const difficulty = searchParams.get('difficulty');
    const sortBy = searchParams.get('sortBy') || 'sort_order';
    const sortOrder = searchParams.get('sortOrder') || 'asc';

    const client = getSupabaseClient();
    let query = client
      .from('courses')
      .select('*', { count: 'exact' })
      .eq('status', 'PUBLISHED');

    if (categoryId) query = query.eq('category_id', parseInt(categoryId));
    if (difficulty) query = query.eq('difficulty', difficulty);
    if (keyword) query = query.ilike('title', `%${keyword}%`);

    const validSortFields = ['sort_order', 'created_at', 'price', 'total_bookings'];
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'sort_order';
    query = query.order(sortField, { ascending: sortOrder === 'asc' });

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;
    if (error) throw error;

    // 转换为驼峰命名
    const list = (data || []).map((item) => ({
      id: item.id,
      title: item.title,
      subtitle: item.subtitle,
      categoryId: item.category_id,
      description: item.description,
      highlights: item.highlights || [],
      suitableFor: item.suitable_for || [],
      duration: item.duration,
      difficulty: item.difficulty,
      price: item.price,
      originalPrice: item.original_price,
      memberPrice: item.member_price,
      coverImage: item.cover_image,
      coachId: item.coach_id,
      rating: item.rating,
      reviewCount: item.review_count,
      totalBookings: item.total_bookings,
      isRecommended: item.is_recommended,
      isHot: item.is_hot,
    }));

    return paginated(list, count || 0, page, pageSize);
  } catch (err: unknown) {
    return serverError((err as Error).message);
  }
}
