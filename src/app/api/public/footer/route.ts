import { NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// GET /api/public/footer - 公开页脚设置
export async function GET() {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from('footer_settings')
    .select('*')
    .order('id', { ascending: true })
    .limit(1)
    .single();
  if (error && error.code !== 'PGRST116') {
    return NextResponse.json({ code: 500, message: error.message, data: null }, { status: 500 });
  }
  return NextResponse.json({ code: 200, message: 'ok', data: data || {} });
}
