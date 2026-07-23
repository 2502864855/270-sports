import { NextRequest } from 'next/server';
import { paginated, serverError } from '@/lib/api/response';
import { apiKeyMiddleware } from '@/lib/auth/middleware';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// GET /api/v1/news - 媒体报道列表（仅已发布）
export async function GET(request: NextRequest) {
  try {
    const auth = await apiKeyMiddleware(request, 'news:read');
    if ('status' in auth) return auth;

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '20');
    const type = searchParams.get('type');

    const client = getSupabaseClient();
    let query = client
      .from('news')
      .select('*', { count: 'exact' })
      .eq('is_published', true);

    if (type) query = query.eq('type', type);

    query = query.order('sort_order', { ascending: true });

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;
    if (error) throw error;

    // 转换为驼峰命名
    const list = (data || []).map((item) => ({
      id: item.id,
      title: item.title,
      source: item.source,
      type: item.type,
      coverImage: item.cover_image,
      summary: item.summary,
      linkUrl: item.link_url,
      publishDate: item.publish_date,
    }));

    return paginated(list, count || 0, page, pageSize);
  } catch (err: unknown) {
    return serverError((err as Error).message);
  }
}
