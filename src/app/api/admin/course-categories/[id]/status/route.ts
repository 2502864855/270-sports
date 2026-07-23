import { NextRequest } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';
import { success, error, notFound } from '@/lib/api/response';
import { authMiddleware } from '@/lib/auth/middleware';

// PATCH /api/admin/course-categories/[id]/status - 切换启用状态
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await authMiddleware(request);
  if ('status' in auth) return auth;

  const client = getSupabaseClient();
  const { id } = await params;
  const body = await request.json();

  // 先获取当前状态
  const { data: current, error: fetchErr } = await client
    .from('course_categories')
    .select('is_active')
    .eq('id', id)
    .single();

  if (fetchErr) return notFound('分类不存在');

  const newStatus = body.isActive !== undefined ? body.isActive : !current.is_active;

  const { data, error: err } = await client
    .from('course_categories')
    .update({ is_active: newStatus, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (err) return error(500, err.message);

  return success(data, '状态更新成功');
}
