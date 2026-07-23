import { NextRequest } from 'next/server';
import { success, paginated, badRequest, serverError } from '@/lib/api/response';
import { authMiddleware } from '@/lib/auth/middleware';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// GET /api/admin/api-keys - API Key 列表
export async function GET(request: NextRequest) {
  try {
    const auth = await authMiddleware(request);
    if ('status' in auth) return auth;

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '20');
    const status = searchParams.get('status');

    const client = getSupabaseClient();
    let query = client
      .from('api_keys')
      .select('id, name, key, scopes, status, expires_at, last_used_at, created_at', { count: 'exact' })
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;
    if (error) throw error;

    // 只返回 key 前缀
    const list = (data || []).map((item) => ({
      ...item,
      key_prefix: item.key?.substring(0, 8) + '...',
      key: undefined,
    }));

    return paginated(list, count || 0, page, pageSize);
  } catch (err: unknown) {
    return serverError((err as Error).message);
  }
}
