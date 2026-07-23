import { NextRequest } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';
import { authMiddleware } from '@/lib/auth/middleware';
import { success, notFound, serverError } from '@/lib/api/response';

// DELETE /api/admin/upload/[id] - 删除图片
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await authMiddleware(request);
    if ('status' in auth) return auth;

    const client = getSupabaseClient();

    const { id } = await params;

    // 先获取图片信息
    const { data: image, error: getErr } = await client
      .from('content_images')
      .select('*')
      .eq('id', parseInt(id))
      .single();

    if (getErr) {
      if (getErr.code === 'PGRST116') {
        return notFound('图片不存在');
      }
      throw getErr;
    }

    // 删除存储中的文件
    if (image.file_path) {
      const client = getSupabaseClient();
    const _r = await client.storage
        .from('images')
        .remove([image.file_path]);
    }

    // 删除数据库记录
    const { error: delErr } = await client
      .from('content_images')
      .delete()
      .eq('id', parseInt(id));

    if (delErr) throw delErr;

    return success(null, '图片删除成功');
  } catch (err: any) {
    console.error('Delete image error:', err);
    return serverError(err.message || '删除图片失败');
  }
}
