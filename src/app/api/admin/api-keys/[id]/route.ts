import { NextRequest } from 'next/server';
import { success, notFound, serverError } from '@/lib/api/response';
import { authMiddleware } from '@/lib/auth/middleware';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// DELETE /api/admin/api-keys/[id] - 吊销 API Key
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await authMiddleware(request);
    if ('status' in auth) return auth;

    const { id } = await params;
    const client = getSupabaseClient();

    const { data, error } = await client
      .from('api_keys')
      .delete()
      .eq('id', parseInt(id))
      .select()
      .single();

    if (error) throw error;
    if (!data) return notFound('API Key 不存在');

    return success(null, 'API Key 已吊销');
  } catch (err: unknown) {
    return serverError((err as Error).message);
  }
}
