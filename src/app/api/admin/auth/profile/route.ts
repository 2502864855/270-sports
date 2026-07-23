import { NextRequest } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';
import { authMiddleware } from '@/lib/auth/middleware';
import { success, unauthorized, notFound } from '@/lib/api/response';

export async function GET(request: NextRequest) {
  try {
    const auth = await authMiddleware(request);
    if (!('payload' in auth)) return auth;

    const { payload } = auth;
    const client = getSupabaseClient();

    const { data, error } = await client
      .from('admin_users')
      .select('id, username, real_name, role, avatar, email, phone, status, last_login_at, last_login_ip, created_at, updated_at')
      .eq('id', payload.sub)
      .maybeSingle();

    if (error) throw new Error(`查询失败: ${error.message}`);
    if (!data) {
      return notFound('管理员不存在');
    }

    return success(data);
  } catch (error) {
    console.error('获取管理员信息失败:', error);
    return unauthorized('获取信息失败');
  }
}
