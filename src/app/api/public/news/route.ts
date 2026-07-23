import { NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';

export async function GET() {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from('news')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false });

  if (error) {
    return NextResponse.json({ code: 500, message: error.message, data: null });
  }
  return NextResponse.json({ code: 200, message: 'ok', data: { list: data || [] } });
}
