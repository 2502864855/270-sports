import { NextRequest } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';
import { authMiddleware } from '@/lib/auth/middleware';
import { success, paginated, badRequest, serverError } from '@/lib/api/response';

// GET /api/admin/stores - 门店列表（分页 + 状态筛选）
export async function GET(request: NextRequest) {
  try {
    const auth = await authMiddleware(request);
    if ('status' in auth) return auth;

    const client = getSupabaseClient();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '20');
    const status = searchParams.get('status');
    const offset = (page - 1) * pageSize;

    let query = client
      .from('stores')
      .select('*', { count: 'exact' })
      .order('sort_order', { ascending: true })
      .range(offset, offset + pageSize - 1);

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error: err, count } = await query;

    if (err) throw err;

    return paginated(data || [], count || 0, page, pageSize);
  } catch (err: any) {
    console.error('Get stores error:', err);
    return serverError(err.message || '获取门店列表失败');
  }
}

// POST /api/admin/stores - 新增门店
export async function POST(request: NextRequest) {
  try {
    const auth = await authMiddleware(request);
    if ('status' in auth) return auth;

    const client = getSupabaseClient();

    const body = await request.json();

    if (!body.name || !body.address) {
      return badRequest('门店名称和地址不能为空');
    }

    const insertData = {
      ...body,
      created_at: new Date().toISOString(),
    };

    const { data, error: err } = await client
      .from('stores')
      .insert(insertData)
      .select()
      .single();

    if (err) throw err;

    return success(data, '门店创建成功');
  } catch (err: any) {
    console.error('Create store error:', err);
    return serverError(err.message || '创建门店失败');
  }
}
