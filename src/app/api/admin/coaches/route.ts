import { NextRequest } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';
import { authMiddleware } from '@/lib/auth/middleware';
import { success, paginated, badRequest, serverError } from '@/lib/api/response';

// GET /api/admin/coaches - 教练列表（分页 + 状态筛选 + 搜索）
export async function GET(request: NextRequest) {
  try {
    const auth = await authMiddleware(request);
    if ('status' in auth) return auth;

    const client = getSupabaseClient();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '20');
    const isActive = searchParams.get('isActive');
    const keyword = searchParams.get('keyword');
    const offset = (page - 1) * pageSize;

    let query = client
      .from('coaches')
      .select('*', { count: 'exact' })
      .order('sort_order', { ascending: true })
      .range(offset, offset + pageSize - 1);

    if (isActive !== null && isActive !== undefined && isActive !== '') {
      query = query.eq('is_active', isActive === 'true');
    }

    if (keyword) {
      query = query.or(`name.ilike.%${keyword}%,title.ilike.%${keyword}%,specialties.cs.{${keyword}}`);
    }

    const { data, error: err, count } = await query;

    if (err) throw err;

    return paginated(data || [], count || 0, page, pageSize);
  } catch (err: any) {
    console.error('Get coaches error:', err);
    return serverError(err.message || '获取教练列表失败');
  }
}

// POST /api/admin/coaches - 新增教练
export async function POST(request: NextRequest) {
  try {
    const auth = await authMiddleware(request);
    if ('status' in auth) return auth;

    const client = getSupabaseClient();

    const body = await request.json();

    if (!body.name) {
      return badRequest('教练姓名不能为空');
    }

    const insertData = {
      ...body,
      created_at: new Date().toISOString(),
    };

    const { data, error: err } = await client
      .from('coaches')
      .insert(insertData)
      .select()
      .single();

    if (err) throw err;

    return success(data, '教练创建成功');
  } catch (err: any) {
    console.error('Create coach error:', err);
    return serverError(err.message || '创建教练失败');
  }
}
