import { NextRequest } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';
import { authMiddleware } from '@/lib/auth/middleware';
import { success, error, badRequest, serverError } from '@/lib/api/response';

// GET /api/admin/content/brand - 获取品牌信息
export async function GET(request: NextRequest) {
  try {
    const auth = await authMiddleware(request);
    if ('status' in auth) return auth;

    const client = getSupabaseClient();

    const { data, error: err } = await client
      .from('brand_info')
      .select('*')
      .order('id', { ascending: true })
      .limit(1)
      .single();

    if (err && err.code !== 'PGRST116') {
      throw err;
    }

    return success(data);
  } catch (err: any) {
    console.error('Get brand info error:', err);
    return serverError(err.message || '获取品牌信息失败');
  }
}

// PUT /api/admin/content/brand - 更新品牌信息
export async function PUT(request: NextRequest) {
  try {
    const auth = await authMiddleware(request);
    if ('status' in auth) return auth;

    const client = getSupabaseClient();

    const body = await request.json();

    // 检查是否存在品牌信息
    const { data: existing } = await client
      .from('brand_info')
      .select('id')
      .limit(1)
      .single();

    const updateData = {
      ...body,
      updated_at: new Date().toISOString(),
    };

    if (existing) {
      const { data, error: err } = await client
        .from('brand_info')
        .update(updateData)
        .eq('id', existing.id)
        .select()
        .single();

      if (err) throw err;
      return success(data, '品牌信息更新成功');
    } else {
      const { data, error: err } = await client
        .from('brand_info')
        .insert(updateData)
        .select()
        .single();

      if (err) throw err;
      return success(data, '品牌信息创建成功');
    }
  } catch (err: any) {
    console.error('Update brand info error:', err);
    return serverError(err.message || '更新品牌信息失败');
  }
}
