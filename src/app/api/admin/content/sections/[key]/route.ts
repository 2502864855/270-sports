import { NextRequest } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';
import { authMiddleware } from '@/lib/auth/middleware';
import { success, notFound, serverError } from '@/lib/api/response';

// GET /api/admin/content/sections/[key] - 获取单个板块详情
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    const auth = await authMiddleware(request);
    if ('status' in auth) return auth;

    const client = getSupabaseClient();

    const { key } = await params;

    const { data, error: err } = await client
      .from('home_sections')
      .select('*')
      .eq('section_key', key)
      .single();

    if (err) {
      if (err.code === 'PGRST116') {
        return notFound('板块不存在');
      }
      throw err;
    }

    return success(data);
  } catch (err: any) {
    console.error('Get section error:', err);
    return serverError(err.message || '获取板块详情失败');
  }
}

// PUT /api/admin/content/sections/[key] - 更新指定板块
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    const auth = await authMiddleware(request);
    if ('status' in auth) return auth;

    const client = getSupabaseClient();

    const { key } = await params;
    const body = await request.json();

    const updateData = {
      ...body,
      updated_at: new Date().toISOString(),
    };

    const { data, error: err } = await client
      .from('home_sections')
      .update(updateData)
      .eq('section_key', key)
      .select()
      .single();

    if (err) {
      if (err.code === 'PGRST116') {
        return notFound('板块不存在');
      }
      throw err;
    }

    return success(data, '板块更新成功');
  } catch (err: any) {
    console.error('Update section error:', err);
    return serverError(err.message || '更新板块失败');
  }
}
