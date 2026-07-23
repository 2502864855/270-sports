import { NextRequest } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';
import { authMiddleware } from '@/lib/auth/middleware';
import { success, serverError } from '@/lib/api/response';

// GET /api/admin/settings/site - 获取网站设置
export async function GET(request: NextRequest) {
  try {
    const auth = await authMiddleware(request);
    if ('status' in auth) return auth;

    const client = getSupabaseClient();

    const { data, error: err } = await client
      .from('site_settings')
      .select('*')
      .order('id', { ascending: true })
      .limit(1)
      .single();

    if (err && err.code !== 'PGRST116') {
      throw err;
    }

    return success(data);
  } catch (err: any) {
    console.error('Get site settings error:', err);
    return serverError(err.message || '获取网站设置失败');
  }
}

// PUT /api/admin/settings/site - 更新网站设置
export async function PUT(request: NextRequest) {
  try {
    const auth = await authMiddleware(request);
    if ('status' in auth) return auth;

    const client = getSupabaseClient();

    const body = await request.json();

    // 检查是否存在设置
    const { data: existing } = await client
      .from('site_settings')
      .select('id')
      .limit(1)
      .single();

    const updateData = {
      ...body,
      updated_at: new Date().toISOString(),
    };

    if (existing) {
      const { data, error: err } = await client
        .from('site_settings')
        .update(updateData)
        .eq('id', existing.id)
        .select()
        .single();

      if (err) throw err;
      return success(data, '网站设置更新成功');
    } else {
      const { data, error: err } = await client
        .from('site_settings')
        .insert(updateData)
        .select()
        .single();

      if (err) throw err;
      return success(data, '网站设置创建成功');
    }
  } catch (err: any) {
    console.error('Update site settings error:', err);
    return serverError(err.message || '更新网站设置失败');
  }
}
