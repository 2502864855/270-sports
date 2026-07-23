import { NextRequest } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';
import { authMiddleware } from '@/lib/auth/middleware';
import { success, serverError } from '@/lib/api/response';

// GET /api/admin/content/sections - 获取所有板块列表
export async function GET(request: NextRequest) {
  try {
    const auth = await authMiddleware(request);
    if ('status' in auth) return auth;

    const client = getSupabaseClient();

    const { data, error: err } = await client
      .from('home_sections')
      .select('*')
      .order('sort_order', { ascending: true });

    if (err) throw err;

    return success(data || []);
  } catch (err: any) {
    console.error('Get sections error:', err);
    return serverError(err.message || '获取板块列表失败');
  }
}
