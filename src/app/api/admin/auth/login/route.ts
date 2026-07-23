import { NextRequest } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';
import { verifyPassword } from '@/lib/auth/password';
import { signToken } from '@/lib/auth/jwt';
import { success, badRequest, unauthorized } from '@/lib/api/response';

interface AdminUser {
  id: number;
  username: string;
  password_hash: string;
  real_name: string | null;
  role: string;
  avatar: string | null;
  email: string | null;
  phone: string | null;
  status: string;
  last_login_at: string | null;
  last_login_ip: string | null;
  created_at: string;
  updated_at: string | null;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return badRequest('用户名和密码不能为空');
    }

    const client = getSupabaseClient();

    // 查询管理员
    const { data, error } = await client
      .from('admin_users')
      .select('id, username, password_hash, real_name, role, avatar, email, phone, status, last_login_at, last_login_ip, created_at, updated_at')
      .eq('username', username)
      .eq('status', 'ACTIVE')
      .maybeSingle();

    if (error) throw new Error(`查询失败: ${error.message}`);
    if (!data) {
      return unauthorized('用户名或密码错误');
    }

    const admin = data as AdminUser;

    // 验证密码
    const isValid = await verifyPassword(password, admin.password_hash);
    if (!isValid) {
      return unauthorized('用户名或密码错误');
    }

    // 签发 JWT
    const token = await signToken({
      sub: admin.id,
      username: admin.username,
      role: admin.role,
    });

    // 更新最后登录信息
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const { error: updateError } = await client
      .from('admin_users')
      .update({ last_login_at: new Date().toISOString(), last_login_ip: ip })
      .eq('id', admin.id);

    if (updateError) throw new Error(`更新失败: ${updateError.message}`);

    // 返回 token 和管理员信息（不含密码）
    const { password_hash, ...adminInfo } = admin;

    return success({
      token,
      admin: adminInfo,
    }, '登录成功');
  } catch (error) {
    console.error('登录失败:', error);
    return badRequest('登录失败');
  }
}
