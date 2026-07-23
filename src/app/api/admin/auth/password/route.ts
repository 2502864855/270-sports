import { NextRequest } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';
import { authMiddleware } from '@/lib/auth/middleware';
import { verifyPassword, hashPassword } from '@/lib/auth/password';
import { success, badRequest, unauthorized } from '@/lib/api/response';

export async function PUT(request: NextRequest) {
  try {
    const auth = await authMiddleware(request);
    if (!('payload' in auth)) return auth;

    const { payload } = auth;
    const body = await request.json();
    const { oldPassword, newPassword } = body;

    if (!oldPassword || !newPassword) {
      return badRequest('旧密码和新密码不能为空');
    }
    if (newPassword.length < 6) {
      return badRequest('新密码长度不能少于 6 位');
    }

    const client = getSupabaseClient();

    // 查询管理员（含密码哈希）
    const { data, error } = await client
      .from('admin_users')
      .select('id, password_hash')
      .eq('id', payload.sub)
      .maybeSingle();

    if (error) throw new Error(`查询失败: ${error.message}`);
    if (!data) {
      return unauthorized('管理员不存在');
    }

    // 验证旧密码
    const isValid = await verifyPassword(oldPassword, data.password_hash);
    if (!isValid) {
      return badRequest('旧密码错误');
    }

    // 哈希新密码并更新
    const passwordHash = await hashPassword(newPassword);
    const { error: updateError } = await client
      .from('admin_users')
      .update({ password_hash: passwordHash })
      .eq('id', data.id);

    if (updateError) throw new Error(`更新失败: ${updateError.message}`);

    return success(null, '密码修改成功');
  } catch (error) {
    console.error('修改密码失败:', error);
    return badRequest('修改密码失败');
  }
}
