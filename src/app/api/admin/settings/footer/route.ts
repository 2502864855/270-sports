import { NextRequest } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';
import { authMiddleware } from '@/lib/auth/middleware';
import { success, serverError } from '@/lib/api/response';

// GET /api/admin/settings/footer - 获取页脚设置
export async function GET(request: NextRequest) {
  try {
    const auth = await authMiddleware(request);
    if ('status' in auth) return auth;

    const client = getSupabaseClient();
    const { data, error: err } = await client
      .from('footer_settings')
      .select('*')
      .order('id', { ascending: true })
      .limit(1)
      .single();
    if (err && err.code !== 'PGRST116') throw err;
    return success(data || {});
  } catch (err: any) {
    return serverError(err.message || '获取页脚设置失败');
  }
}

// PUT /api/admin/settings/footer - 更新页脚设置
export async function PUT(request: NextRequest) {
  try {
    const auth = await authMiddleware(request);
    if ('status' in auth) return auth;

    const body = await request.json();
    const client = getSupabaseClient();
    const { data: existing } = await client
      .from('footer_settings')
      .select('id')
      .limit(1)
      .single();

    const payload = {
      company_name: body.companyName,
      company_desc: body.companyDesc,
      icp: body.icp,
      contact_phone: body.contactPhone,
      contact_email: body.contactEmail,
      contact_address: body.contactAddress,
      nav_links: body.navLinks || [],
      social_links: body.socialLinks || [],
      updated_at: new Date().toISOString(),
    };

    let data;
    let err;
    if (existing) {
      const result = await client
        .from('footer_settings')
        .update(payload)
        .eq('id', existing.id)
        .select()
        .single();
      data = result.data;
      err = result.error;
    } else {
      const result = await client
        .from('footer_settings')
        .insert(payload)
        .select()
        .single();
      data = result.data;
      err = result.error;
    }
    if (err) throw err;
    return success(data);
  } catch (err: any) {
    return serverError(err.message || '更新页脚设置失败');
  }
}
