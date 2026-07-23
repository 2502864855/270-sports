import { NextRequest } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';
import { authMiddleware } from '@/lib/auth/middleware';
import { success, paginated, badRequest, serverError } from '@/lib/api/response';

// GET /api/admin/news - 报道列表（分页 + 筛选 + 搜索）
export async function GET(request: NextRequest) {
  try {
    const auth = await authMiddleware(request);
    if ('status' in auth) return auth;

    const client = getSupabaseClient();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '20');
    const type = searchParams.get('type');
    const keyword = searchParams.get('keyword');
    const isPublished = searchParams.get('isPublished');
    const offset = (page - 1) * pageSize;

    let query = client
      .from('news')
      .select('*', { count: 'exact' })
      .order('sort_order', { ascending: true })
      .order('publish_date', { ascending: false })
      .range(offset, offset + pageSize - 1);

    if (type) {
      query = query.eq('type', type);
    }

    if (isPublished !== null && isPublished !== undefined && isPublished !== '') {
      query = query.eq('is_published', isPublished === 'true');
    }

    if (keyword) {
      query = query.or(`title.ilike.%${keyword}%,source.ilike.%${keyword}%`);
    }

    const { data, error: err, count } = await query;

    if (err) throw err;

    return paginated(data || [], count || 0, page, pageSize);
  } catch (err: any) {
    console.error('Get news error:', err);
    return serverError(err.message || '获取报道列表失败');
  }
}

// POST /api/admin/news - 新增报道
export async function POST(request: NextRequest) {
  try {
    const auth = await authMiddleware(request);
    if ('status' in auth) return auth;

    const client = getSupabaseClient();

    const body = await request.json();

    if (!body.title) {
      return badRequest('标题不能为空');
    }

    const insertData = {
      ...body,
      created_at: new Date().toISOString(),
    };

    const { data, error: err } = await client
      .from('news')
      .insert(insertData)
      .select()
      .single();

    if (err) throw err;

    return success(data, '报道创建成功');
  } catch (err: any) {
    console.error('Create news error:', err);
    return serverError(err.message || '创建报道失败');
  }
}
