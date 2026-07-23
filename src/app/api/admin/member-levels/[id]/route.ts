import { NextRequest } from 'next/server';
import { success, error, badRequest } from '@/lib/api/response';
import { authMiddleware } from '@/lib/auth/middleware';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// GET /api/admin/member-levels/[id] - 等级详情
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await authMiddleware(request);
    if ('status' in auth) return auth;

    const client = getSupabaseClient();
    const { id } = await params;
    const levelId = parseInt(id);
    if (isNaN(levelId)) return badRequest('无效的等级ID');

    const { data, error: err } = await client
      .from('member_levels')
      .select('*')
      .eq('id', levelId)
      .single();

    if (err || !data) return error(404, '等级不存在');
    return success(data);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : '获取等级详情失败';
    return error(500, message);
  }
}

// PUT /api/admin/member-levels/[id] - 更新等级
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await authMiddleware(request);
    if ('status' in auth) return auth;

    const client = getSupabaseClient();
    const { id } = await params;
    const levelId = parseInt(id);
    if (isNaN(levelId)) return badRequest('无效的等级ID');

    const body = await request.json();
    const updateData: Record<string, unknown> = { updated_at: new Date().toISOString() };

    const allowedFields = ['name', 'level', 'description', 'benefits', 'upgrade_condition', 'base_price', 'color', 'icon', 'is_active'];
    for (const field of allowedFields) {
      const camelField = field.replace(/_([a-z])/g, (_, l) => l.toUpperCase());
      if (body[camelField] !== undefined) {
        updateData[field] = body[camelField];
      }
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    const { data, error: err } = await client
      .from('member_levels')
      .update(updateData)
      .eq('id', levelId)
      .select()
      .single();

    if (err) throw err;
    return success(data, '更新成功');
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : '更新等级失败';
    return error(500, message);
  }
}

// DELETE /api/admin/member-levels/[id] - 删除等级
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await authMiddleware(request);
    if ('status' in auth) return auth;

    const client = getSupabaseClient();
    const { id } = await params;
    const levelId = parseInt(id);
    if (isNaN(levelId)) return badRequest('无效的等级ID');

    // Check if any users are using this level
    const { count } = await client
      .from('memberships')
      .select('*', { count: 'exact', head: true })
      .eq('level_id', levelId);

    if (count && count > 0) {
      return error(400, '该等级下还有会员记录，无法删除');
    }

    const { error: err } = await client
      .from('member_levels')
      .delete()
      .eq('id', levelId);

    if (err) throw err;
    return success(null, '删除成功');
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : '删除等级失败';
    return error(500, message);
  }
}
