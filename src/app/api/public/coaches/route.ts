import { NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';

export async function GET() {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from('coaches')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    return NextResponse.json({ code: 500, message: error.message, data: null });
  }
  return NextResponse.json({ code: 200, message: 'ok', data: data || [] });
}
