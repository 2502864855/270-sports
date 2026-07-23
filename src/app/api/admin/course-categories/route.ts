import { NextRequest } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';
import { success, error, badRequest } from '@/lib/api/response';
import { authMiddleware } from '@/lib/auth/middleware';

// GET /api/admin/course-categories - 分类列表
export async function GET(request: NextRequest) {
  const auth = await authMiddleware(request);
  if ('status' in auth) return auth;

  const client = getSupabaseClient();
  const { searchParams } = new URL(request.url);
  const isActive = searchParams.get('isActive');

  let query = client
    .from('course_categories')
    .select('*')
    .order('sort_order', { ascending: true });

  if (isActive !== null) {
    query = query.eq('is_active', isActive === 'true');
  }

  const { data, error: err } = await query;
  if (err) return error(500, err.message);

  return success(data);
}

// POST /api/admin/course-categories - 新增分类
export async function POST(request: NextRequest) {
  const auth = await authMiddleware(request);
  if ('status' in auth) return auth;

  const client = getSupabaseClient();
  const body = await request.json();

  if (!body.name) {
    return badRequest('分类名称不能为空');
  }

  const { data, error: err } = await client
    .from('course_categories')
    .insert({
      name: body.name,
      name_en: body.nameEn,
      description: body.description,
      icon: body.icon,
      sort_order: body.sortOrder ?? 0,
      is_active: body.isActive ?? true,
    })
    .select()
    .single();

  if (err) return error(500, err.message);

  return success(data, '创建成功');
}
