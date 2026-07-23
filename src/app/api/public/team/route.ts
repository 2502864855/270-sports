import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// GET /api/public/team - 公开团队成员列表
export async function GET() {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from('team_members')
    .select('id, name, role, avatar, bio')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });
  if (error) {
    return NextResponse.json({ code: 500, message: error.message, data: null }, { status: 500 });
  }
  return NextResponse.json({ code: 200, message: 'ok', data: data || [] });
}
