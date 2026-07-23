import { NextRequest } from 'next/server';
import { success, error, badRequest } from '@/lib/api/response';
import { authMiddleware } from '@/lib/auth/middleware';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// GET /api/admin/member-levels - 等级列表
export async function GET(request: NextRequest) {
  try {
    const auth = await authMiddleware(request);
    if ('status' in auth) return auth;

    const client = getSupabaseClient();
    const { data, error: err } = await client
      .from('member_levels')
      .select('*')
      .order('level', { ascending: true });

    if (err) throw err;
    return success(data || []);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : '获取等级列表失败';
    return error(500, message);
  }
}

// POST /api/admin/member-levels - 新增等级
export async function POST(request: NextRequest) {
  try {
    const auth = await authMiddleware(request);
    if ('status' in auth) return auth;

    const client = getSupabaseClient();
    const body = await request.json();
    const { name, level, description, benefits, upgradeCondition, basePrice, color, icon } = body;

    if (!name || level === undefined || basePrice === undefined) {
      return badRequest('缺少必填参数: name, level, basePrice');
    }

    const { data, error: err } = await client
      .from('member_levels')
      .insert({
        name,
        level,
        description: description || null,
        benefits: benefits || [],
        upgrade_condition: upgradeCondition || null,
        base_price: basePrice,
        color: color || '#C45A2C',
        icon: icon || 'crown',
        is_active: true,
      })
      .select()
      .single();

    if (err) throw err;
    return success(data, '创建成功');
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : '创建等级失败';
    return error(500, message);
  }
}
