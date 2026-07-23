import { NextRequest } from 'next/server';
import { success, serverError } from '@/lib/api/response';
import { apiKeyMiddleware } from '@/lib/auth/middleware';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// GET /api/v1/brand - 品牌基本信息
export async function GET(request: NextRequest) {
  try {
    const auth = await apiKeyMiddleware(request, 'brand:read');
    if ('status' in auth) return auth;

    const client = getSupabaseClient();
    const { data, error } = await client
      .from('brand_info')
      .select('*')
      .single();

    if (error) throw error;

    // 转换为驼峰命名
    const result = data ? {
      id: data.id,
      brandName: data.brand_name,
      brandNameEn: data.brand_name_en,
      slogan: data.slogan,
      mission: data.mission,
      description: data.description,
      coreValues: data.core_values || [],
      foundedYear: data.founded_year,
      founder: data.founder,
      founderBio: data.founder_bio,
      founderAvatar: data.founder_avatar,
      totalMembers: data.total_members,
      coreMembers: data.core_members,
      renewalRate: data.renewal_rate,
      valuation: data.valuation,
    } : null;

    return success(result);
  } catch (err: unknown) {
    return serverError((err as Error).message);
  }
}
