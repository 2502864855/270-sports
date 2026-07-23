import { NextRequest } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';
import { authMiddleware } from '@/lib/auth/middleware';
import { success, badRequest, serverError } from '@/lib/api/response';

// POST /api/admin/content/sections/sort - 批量更新排序
export async function POST(request: NextRequest) {
  try {
    const auth = await authMiddleware(request);
    if ('status' in auth) return auth;

    const client = getSupabaseClient();

    const body = await request.json();
    const { sorts } = body as { sorts: Array<{ key: string; sortOrder: number }> };

    if (!Array.isArray(sorts) || sorts.length === 0) {
      return badRequest('请提供排序数据');
    }

    // 批量更新
    const updates = sorts.map(async (item) => {
      const { error: err } = await client
        .from('home_sections')
        .update({ sort_order: item.sortOrder, updated_at: new Date().toISOString() })
        .eq('section_key', item.key);

      if (err) throw err;
    });

    await Promise.all(updates);

    // 返回更新后的列表
    const { data, error: err } = await client
      .from('home_sections')
      .select('*')
      .order('sort_order', { ascending: true });

    if (err) throw err;

    return success(data, '排序更新成功');
  } catch (err: any) {
    console.error('Sort sections error:', err);
    return serverError(err.message || '更新排序失败');
  }
}
