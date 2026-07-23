import { NextRequest } from 'next/server';
import { success, error } from '@/lib/api/response';
import { authMiddleware } from '@/lib/auth/middleware';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// GET /api/admin/dashboard/courses - 课程统计
export async function GET(request: NextRequest) {
  try {
    const auth = await authMiddleware(request);
    if ('status' in auth) return auth;

    const client = getSupabaseClient();

    // Total courses
    const { count: totalCourses } = await client
      .from('courses')
      .select('*', { count: 'exact', head: true });

    // Courses by category
    const { data: coursesByCategory } = await client
      .from('courses')
      .select(`
        category_id,
        course_categories!courses_category_id_fkey (id, name)
      `)
      .eq('status', 'PUBLISHED');

    const categoryMap = new Map<number, { name: string; count: number }>();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (coursesByCategory || []).forEach((c: any) => {
      const catName = c.course_categories?.name || '未分类';
      const existing = categoryMap.get(c.category_id);
      if (existing) {
        existing.count++;
      } else {
        categoryMap.set(c.category_id, { name: catName, count: 1 });
      }
    });

    // Top 5 courses by bookings
    const { data: topCourses } = await client
      .from('courses')
      .select('id, title, total_bookings, cover_image')
      .eq('status', 'PUBLISHED')
      .order('total_bookings', { ascending: false })
      .limit(5);

    // Booking trends (last 7 days)
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const { data: recentBookings } = await client
      .from('bookings')
      .select('created_at')
      .gte('created_at', sevenDaysAgo)
      .order('created_at', { ascending: true });

    const bookingTrends = new Map<string, number>();
    for (let i = 0; i < 7; i++) {
      const d = new Date(now.getTime() - (6 - i) * 24 * 60 * 60 * 1000);
      bookingTrends.set(d.toISOString().split('T')[0], 0);
    }
    (recentBookings || []).forEach((b: { created_at: string }) => {
      const dateKey = b.created_at.split('T')[0];
      if (bookingTrends.has(dateKey)) {
        bookingTrends.set(dateKey, (bookingTrends.get(dateKey) || 0) + 1);
      }
    });

    return success({
      totalCourses: totalCourses || 0,
      coursesByCategory: Array.from(categoryMap.values()),
      topCourses: topCourses || [],
      bookingTrends: Array.from(bookingTrends.entries()).map(([date, count]) => ({ date, count })),
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : '获取课程统计失败';
    return error(500, message);
  }
}
