import { NextRequest } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';
import { authMiddleware } from '@/lib/auth/middleware';
import { success, notFound, serverError } from '@/lib/api/response';

type RouteContext = { params: Promise<{ id: string }> };

// PUT /api/admin/content/team/[id] - 更新团队成员
export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const auth = await authMiddleware(request);
    if ('status' in auth) return auth;

    const { id } = await context.params;
    const body = await request.json();
    const client = getSupabaseClient();
    const { data, error: err } = await client
      .from('team_members')
      .update({
        name: body.name,
        role: body.role,
        avatar: body.avatar,
        bio: body.bio,
        sort_order: body.sortOrder,
        is_active: body.isActive,
        updated_at: new Date().toISOString(),
      })
      .eq('id', Number(id))
      .select()
      .single();
    if (err) throw err;
    if (!data) return notFound('成员不存在');
    return success(data);
  } catch (err: any) {
    return serverError(err.message || '更新团队成员失败');
  }
}

// DELETE /api/admin/content/team/[id] - 删除团队成员
export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const auth = await authMiddleware(request);
    if ('status' in auth) return auth;

    const { id } = await context.params;
    const client = getSupabaseClient();
    const { error: err } = await client
      .from('team_members')
      .delete()
      .eq('id', Number(id));
    if (err) throw err;
    return success({ message: '删除成功' });
  } catch (err: any) {
    return serverError(err.message || '删除团队成员失败');
  }
}
