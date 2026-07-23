import { NextRequest } from 'next/server';
import { success, serverError } from '@/lib/api/response';
import { apiKeyMiddleware } from '@/lib/auth/middleware';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// GET /api/v1/stores - 门店信息（仅营业中）
export async function GET(request: NextRequest) {
  try {
    const auth = await apiKeyMiddleware(request, 'stores:read');
    if ('status' in auth) return auth;

    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');

    const client = getSupabaseClient();
    let query = client
      .from('stores')
      .select('*')
      .eq('status', 'OPEN')
      .order('sort_order', { ascending: true });

    if (city) query = query.eq('city', city);

    const { data, error } = await query;
    if (error) throw error;

    // 转换为驼峰命名
    const list = (data || []).map((item) => ({
      id: item.id,
      name: item.name,
      address: item.address,
      city: item.city,
      district: item.district,
      phone: item.phone,
      businessHours: item.business_hours,
      latitude: item.latitude,
      longitude: item.longitude,
      coverImage: item.cover_image,
      description: item.description,
      facilities: item.facilities || [],
    }));

    return success(list);
  } catch (err: unknown) {
    return serverError((err as Error).message);
  }
}
