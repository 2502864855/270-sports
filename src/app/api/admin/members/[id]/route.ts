import { NextRequest } from 'next/server';
import { success, error, badRequest } from '@/lib/api/response';
import { authMiddleware } from '@/lib/auth/middleware';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// GET /api/admin/members/[id] - 用户详情
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await authMiddleware(request);
    if ('status' in auth) return auth;

    const client = getSupabaseClient();
    const { id } = await params;
    const userId = parseInt(id);
    if (isNaN(userId)) return badRequest('无效的用户ID');

    // Get user with membership info
    const { data: user, error: userErr } = await client
      .from('users')
      .select(`
        *,
        memberships!memberships_user_id_fkey (
          id,
          type,
          start_date,
          end_date,
          status,
          price,
          member_levels!memberships_level_id_fkey (
            id,
            name,
            level,
            color,
            icon
          )
        )
      `)
      .eq('id', userId)
      .single();

    if (userErr || !user) return error(404, '用户不存在');

    // Get recent orders
    const { data: recentOrders } = await client
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(5);

    // Get recent bookings
    const { data: recentBookings } = await client
      .from('bookings')
      .select(`
        *,
        courses!bookings_course_id_fkey (id, title),
        coaches!bookings_coach_id_fkey (id, name)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(5);

    const activeMembership = user.memberships?.find((m: { status: string }) => m.status === 'ACTIVE');

    return success({
      ...user,
      currentMembership: activeMembership ? {
        id: activeMembership.id,
        level: activeMembership.member_levels,
        startDate: activeMembership.start_date,
        endDate: activeMembership.end_date,
        type: activeMembership.type,
      } : null,
      recentOrders: recentOrders || [],
      recentBookings: recentBookings || [],
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : '获取用户详情失败';
    return error(500, message);
  }
}

// PUT /api/admin/members/[id] - 编辑用户基本信息
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await authMiddleware(request);
    if ('status' in auth) return auth;

    const client = getSupabaseClient();
    const { id } = await params;
    const userId = parseInt(id);
    if (isNaN(userId)) return badRequest('无效的用户ID');

    const body = await request.json();
    const { nickname, avatar, gender, birthday, phone } = body;

    const updateData: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (nickname !== undefined) updateData.nickname = nickname;
    if (avatar !== undefined) updateData.avatar = avatar;
    if (gender !== undefined) updateData.gender = gender;
    if (birthday !== undefined) updateData.birthday = birthday;
    if (phone !== undefined) updateData.phone = phone;

    const { data, error: err } = await client
      .from('users')
      .update(updateData)
      .eq('id', userId)
      .select()
      .single();

    if (err) throw err;
    return success(data, '更新成功');
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : '更新用户失败';
    return error(500, message);
  }
}
