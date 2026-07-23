import { NextRequest } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';
import { success, error, badRequest } from '@/lib/api/response';
import { authMiddleware } from '@/lib/auth/middleware';

// POST /api/admin/courses/batch-status - 批量上下架
export async function POST(request: NextRequest) {
  const auth = await authMiddleware(request);
  if ('status' in auth) return auth;

  const client = getSupabaseClient();
  const body = await request.json();

  if (!body.ids || !Array.isArray(body.ids) || body.ids.length === 0) {
    return badRequest('课程ID列表不能为空');
  }

  const validStatuses = ['DRAFT', 'PUBLISHED', 'OFFLINE'];
  if (!body.status || !validStatuses.includes(body.status)) {
    return badRequest(`状态必须是 ${validStatuses.join('、')} 之一`);
  }

  const { data, error: err } = await client
    .from('courses')
    .update({ status: body.status, updated_at: new Date().toISOString() })
    .in('id', body.ids)
    .select();

  if (err) return error(500, err.message);

  return success({ updated: data?.length || 0 }, '批量更新成功');
}
