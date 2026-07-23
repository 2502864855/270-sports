import { NextRequest } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';
import { authMiddleware } from '@/lib/auth/middleware';
import { success, paginated, badRequest, serverError } from '@/lib/api/response';

// POST /api/admin/upload/image - 上传图片
export async function POST(request: NextRequest) {
  try {
    const auth = await authMiddleware(request);
    if ('status' in auth) return auth;

    const client = getSupabaseClient();
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return badRequest('请选择要上传的文件');
    }

    // 验证文件类型
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return badRequest('仅支持 JPG、PNG、WebP、GIF 格式');
    }

    // 验证文件大小（5MB）
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return badRequest('文件大小不能超过 5MB');
    }

    // 生成文件名
    const ext = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${ext}`;
    const filePath = `uploads/${fileName}`;

    // 上传到 Supabase Storage
    const { data: uploadData, error: uploadErr } = await client.storage
      .from('images')
      .upload(filePath, file, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadErr) {
      // 如果 bucket 不存在，尝试创建
      if (uploadErr.message.includes('Bucket not found')) {
        await client.storage.createBucket('images', {
          public: true,
          fileSizeLimit: 5 * 1024 * 1024,
          allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
        });

        const { data: retryData, error: retryErr } = await client.storage
          .from('images')
          .upload(filePath, file, {
            contentType: file.type,
            upsert: false,
          });

        if (retryErr) throw retryErr;
      } else {
        throw uploadErr;
      }
    }

    // 获取公开 URL
    const { data: urlData } = client.storage
      .from('images')
      .getPublicUrl(filePath);

    const publicUrl = urlData.publicUrl;

    // 保存图片记录到数据库
    const { data: imageData, error: dbErr } = await client
      .from('content_images')
      .insert({
        file_name: file.name,
        file_path: filePath,
        file_size: file.size,
        mime_type: file.type,
        alt: file.name.replace(`.${ext}`, ''),
        category: 'general',
      })
      .select()
      .single();

    if (dbErr) {
      console.error('Save image record error:', dbErr);
      // 即使数据库保存失败，也返回图片 URL
    }

    return success({
      url: publicUrl,
      path: filePath,
      name: file.name,
      size: file.size,
      type: file.type,
    }, '图片上传成功');
  } catch (err: any) {
    console.error('Upload image error:', err);
    return serverError(err.message || '图片上传失败');
  }
}

// GET /api/admin/upload/list - 图片库列表（分页 + 分类筛选）
export async function GET(request: NextRequest) {
  try {
    const auth = await authMiddleware(request);
    if ('status' in auth) return auth;

    const client = getSupabaseClient();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '20');
    const category = searchParams.get('category');
    const offset = (page - 1) * pageSize;

    let query = client
      .from('content_images')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + pageSize - 1);

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error: err, count } = await query;

    if (err) throw err;

    // 为每张图片添加公开 URL
    const imagesWithUrls = (data || []).map((img: any) => {
      const { data: urlData } = client.storage
        .from('images')
        .getPublicUrl(img.file_path);
      return {
        ...img,
        url: urlData.publicUrl,
      };
    });

    return paginated(imagesWithUrls, count || 0, page, pageSize);
  } catch (err: any) {
    console.error('Get images error:', err);
    return serverError(err.message || '获取图片列表失败');
  }
}
