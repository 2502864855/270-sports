import { NextRequest } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';
import { success, error, notFound, badRequest } from '@/lib/api/response';
import { authMiddleware } from '@/lib/auth/middleware';

// PATCH /api/admin/courses/[id]/status - 切换状态
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await authMiddleware(request);
  if ('status' in auth) return auth;

  const client = getSupabaseClient();
  const { id } = await params;
  const body = await request.json();

  const validStatuses = ['DRAFT', 'PUBLISHED', 'OFFLINE'];
  if (!body.status || !validStatuses.includes(body.status)) {
    return badRequest(`状态必须是 ${validStatuses.join('、')} 之一`);
  }

  const { data, error: err } = await client
    .from('courses')
    .update({ status: body.status, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (err) return notFound('课程不存在');

  return success(data, '状态更新成功');
}
