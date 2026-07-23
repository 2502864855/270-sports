import { NextRequest } from 'next/server';
import { success, notFound, serverError } from '@/lib/api/response';
import { apiKeyMiddleware } from '@/lib/auth/middleware';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// GET /api/v1/courses/[id] - 课程详情
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await apiKeyMiddleware(request, 'courses:read');
    if ('status' in auth) return auth;

    const { id } = await params;
    const client = getSupabaseClient();

    const { data, error } = await client
      .from('courses')
      .select('*')
      .eq('id', parseInt(id))
      .eq('status', 'PUBLISHED')
      .single();

    if (error) throw error;
    if (!data) return notFound('课程不存在');

    // 转换为驼峰命名
    const result = {
      id: data.id,
      title: data.title,
      subtitle: data.subtitle,
      categoryId: data.category_id,
      description: data.description,
      highlights: data.highlights || [],
      suitableFor: data.suitable_for || [],
      outline: data.outline || [],
      duration: data.duration,
      difficulty: data.difficulty,
      price: data.price,
      originalPrice: data.original_price,
      memberPrice: data.member_price,
      coverImage: data.cover_image,
      images: data.images || [],
      coachId: data.coach_id,
      capacity: data.capacity,
      totalBookings: data.total_bookings,
      rating: data.rating,
      reviewCount: data.review_count,
      isRecommended: data.is_recommended,
      isHot: data.is_hot,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };

    return success(result);
  } catch (err: unknown) {
    return serverError((err as Error).message);
  }
}
