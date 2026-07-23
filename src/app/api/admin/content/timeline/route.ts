import { NextRequest } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';
import { authMiddleware } from '@/lib/auth/middleware';
import { success, paginated, badRequest, serverError } from '@/lib/api/response';

// GET /api/admin/content/timeline - 获取时间线列表（分页）
export async function GET(request: NextRequest) {
  try {
    const auth = await authMiddleware(request);
    if ('status' in auth) return auth;

    const client = getSupabaseClient();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '20');
    const offset = (page - 1) * pageSize;

    const { data, error: err, count } = await client
      .from('timeline_events')
      .select('*', { count: 'exact' })
      .order('year', { ascending: true })
      .order('sort_order', { ascending: true })
      .range(offset, offset + pageSize - 1);

    if (err) throw err;

    return paginated(data || [], count || 0, page, pageSize);
  } catch (err: any) {
    console.error('Get timeline error:', err);
    return serverError(err.message || '获取时间线失败');
  }
}

// POST /api/admin/content/timeline - 新增时间线节点
export async function POST(request: NextRequest) {
  try {
    const auth = await authMiddleware(request);
    if ('status' in auth) return auth;

    const client = getSupabaseClient();

    const body = await request.json();

    if (!body.title || !body.year) {
      return badRequest('标题和年份不能为空');
    }

    const insertData = {
      ...body,
      created_at: new Date().toISOString(),
    };

    const { data, error: err } = await client
      .from('timeline_events')
      .insert(insertData)
      .select()
      .single();

    if (err) throw err;

    return success(data, '时间线节点创建成功');
  } catch (err: any) {
    console.error('Create timeline error:', err);
    return serverError(err.message || '创建时间线节点失败');
  }
}
