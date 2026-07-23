import { NextRequest } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';
import { verifyPassword } from '@/lib/auth/password';
import { signToken } from '@/lib/auth/jwt';
import { success, badRequest, unauthorized } from '@/lib/api/response';

interface FrontendUser {
  id: number;
  username: string | null;
  phone: string;
  nickname: string | null;
  password_hash: string | null;
  avatar: string | null;
  gender: string;
  status: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return badRequest('用户名和密码不能为空');
    }

    const client = getSupabaseClient();

    // Query user by username
    const { data, error } = await client
      .from('users')
      .select('id, username, phone, nickname, password_hash, avatar, gender, status')
      .eq('username', username)
      .eq('status', 'ACTIVE')
      .maybeSingle();

    if (error) throw new Error(`Query failed: ${error.message}`);
    if (!data || !data.password_hash) {
      return unauthorized('用户名或密码错误');
    }

    const user = data as FrontendUser;

    if (!user.password_hash) {
      return unauthorized('用户名或密码错误');
    }

    // Verify password
    const isValid = await verifyPassword(password, user.password_hash);
    if (!isValid) {
      return unauthorized('用户名或密码错误');
    }

    // Sign JWT
    const token = await signToken({
      sub: user.id,
      username: user.username || user.phone,
      role: 'USER',
    });

    // Update last login
    await client
      .from('users')
      .update({ last_login_at: new Date().toISOString() })
      .eq('id', user.id);

    // Return token and user info (no password)
    const { password_hash: _pw, ...userInfo } = user;

    return success({
      token,
      user: userInfo,
    }, '登录成功');
  } catch (error) {
    console.error('User login failed:', error);
    return badRequest('登录失败，请稍后重试');
  }
}
