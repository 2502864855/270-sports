import { NextRequest } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';
import { authMiddleware } from '@/lib/auth/middleware';
import { success, serverError, badRequest } from '@/lib/api/response';

// GET /api/admin/content/team - 获取团队成员列表
export async function GET(request: NextRequest) {
  try {
    const auth = await authMiddleware(request);
    if ('status' in auth) return auth;

    const client = getSupabaseClient();
    const { data, error: err } = await client
      .from('team_members')
      .select('*')
      .order('sort_order', { ascending: true });
    if (err) throw err;
    return success(data || []);
  } catch (err: any) {
    return serverError(err.message || '获取团队成员失败');
  }
}

// POST /api/admin/content/team - 新增团队成员
export async function POST(request: NextRequest) {
  try {
    const auth = await authMiddleware(request);
    if ('status' in auth) return auth;

    const body = await request.json();
    if (!body.name) return badRequest('姓名不能为空');

    const client = getSupabaseClient();
    const { data, error: err } = await client
      .from('team_members')
      .insert({
        name: body.name,
        role: body.role || null,
        avatar: body.avatar || null,
        bio: body.bio || null,
        sort_order: body.sortOrder ?? 0,
        is_active: body.isActive ?? true,
      })
      .select()
      .single();
    if (err) throw err;
    return success(data);
  } catch (err: any) {
    return serverError(err.message || '新增团队成员失败');
  }
}
