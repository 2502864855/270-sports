import { NextRequest } from 'next/server';
import { success, error, paginated } from '@/lib/api/response';
import { authMiddleware } from '@/lib/auth/middleware';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// GET /api/admin/members - 用户列表（分页）
export async function GET(request: NextRequest) {
  try {
    const auth = await authMiddleware(request);
    if ('status' in auth) return auth;

    const client = getSupabaseClient();
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '20');
    const keyword = searchParams.get('keyword') || '';
    const status = searchParams.get('status') || '';
    const sortBy = searchParams.get('sortBy') || 'created_at';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    let query = client
      .from('users')
      .select('*', { count: 'exact' });

    if (keyword) {
      query = query.or(`phone.ilike.%${keyword}%,nickname.ilike.%${keyword}%`);
    }
    if (status) {
      query = query.eq('status', status);
    }

    const validSortFields = ['created_at', 'nickname', 'phone', 'total_training_count'];
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'created_at';
    query = query.order(sortField, { ascending: sortOrder === 'asc' });

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    query = query.range(from, to);

    const { data, error: err, count } = await query;
    if (err) throw err;

    const users = data || [];

    // Enrich with membership info
    const list = await Promise.all(users.map(async (u: Record<string, unknown>) => {
      const { data: activeMship } = await client
        .from('memberships')
        .select('id, level_id, status, end_date')
        .eq('user_id', u.id as number)
        .eq('status', 'ACTIVE')
        .order('created_at', { ascending: false })
        .limit(1);

      const membership = activeMship && activeMship.length > 0 ? activeMship[0] : null;

      // Get level info if has active membership
      let levelInfo = null;
      if (membership) {
        const { data: levelData } = await client
          .from('member_levels')
          .select('id, name, level, color, icon')
          .eq('id', membership.level_id)
          .single();
        levelInfo = levelData;
      }

      return {
        ...u,
        currentMembership: membership ? {
          id: membership.id,
          level: levelInfo,
          endDate: membership.end_date,
        } : null,
        isVip: !!membership,
      };
    }));

    return paginated(list, count || 0, page, pageSize);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : '获取用户列表失败';
    return error(500, message);
  }
}
