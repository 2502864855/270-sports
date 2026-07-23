import { NextRequest } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';
import { success, error, notFound } from '@/lib/api/response';

// GET /api/public/courses/[id] - 公开课程详情
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const client = getSupabaseClient();
  const { id } = await params;

  const { data, error: err } = await client
    .from('courses')
    .select(`
      *,
      course_categories (name, name_en),
      coaches (name, title, avatar, bio, specialties, certifications)
    `)
    .eq('id', id)
    .eq('status', 'PUBLISHED')
    .single();

  if (err) return notFound('课程不存在');

  // 转换数据格式
  const course = {
    id: data.id,
    title: data.title,
    subtitle: data.subtitle,
    categoryId: data.category_id,
    categoryName: (data.course_categories as Record<string, unknown>)?.name || null,
    categoryNameEn: (data.course_categories as Record<string, unknown>)?.name_en || null,
    description: data.description,
    highlights: data.highlights,
    suitableFor: data.suitable_for,
    outline: data.outline,
    duration: data.duration,
    difficulty: data.difficulty,
    price: data.price,
    originalPrice: data.original_price,
    memberPrice: data.member_price,
    coverImage: data.cover_image,
    images: data.images,
    coachId: data.coach_id,
    coach: data.coaches ? {
      name: (data.coaches as Record<string, unknown>).name,
      title: (data.coaches as Record<string, unknown>).title,
      avatar: (data.coaches as Record<string, unknown>).avatar,
      bio: (data.coaches as Record<string, unknown>).bio,
      specialties: (data.coaches as Record<string, unknown>).specialties,
      certifications: (data.coaches as Record<string, unknown>).certifications,
    } : null,
    capacity: data.capacity,
    totalBookings: data.total_bookings,
    rating: data.rating,
    reviewCount: data.review_count,
    isRecommended: data.is_recommended,
    isHot: data.is_hot,
  };

  return success(course);
}
