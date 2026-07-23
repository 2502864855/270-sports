import { NextRequest } from 'next/server';
import { paginated, serverError } from '@/lib/api/response';
import { apiKeyMiddleware } from '@/lib/auth/middleware';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// GET /api/v1/coaches - 教练列表（仅在职）
export async function GET(request: NextRequest) {
  try {
    const auth = await apiKeyMiddleware(request, 'coaches:read');
    if ('status' in auth) return auth;

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '20');

    const client = getSupabaseClient();
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error, count } = await client
      .from('coaches')
      .select('*', { count: 'exact' })
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
      .range(from, to);

    if (error) throw error;

    // 转换为驼峰命名
    const list = (data || []).map((item) => ({
      id: item.id,
      name: item.name,
      title: item.title,
      avatar: item.avatar,
      bio: item.bio,
      specialties: item.specialties || [],
      certifications: item.certifications || [],
      experienceYears: item.experience_years,
    }));

    return paginated(list, count || 0, page, pageSize);
  } catch (err: unknown) {
    return serverError((err as Error).message);
  }
}
