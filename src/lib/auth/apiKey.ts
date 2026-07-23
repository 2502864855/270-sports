import { randomBytes } from 'crypto';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// API Key 类型
export interface ApiKeyScope {
  resource: string;
  actions: string[]; // ['read', 'write', 'delete']
}

// 生成 API Key
export async function generateApiKey(name: string, scopes: ApiKeyScope[], createdBy: number, expiresAt?: Date): Promise<string> {
  const key = `sk_${randomBytes(32).toString('hex')}`;
  const client = getSupabaseClient();

  const { error } = await client.from('api_keys').insert({
    key,
    name,
    scopes: scopes.map(s => `${s.resource}:${s.actions.join(',')}`),
    expires_at: expiresAt?.toISOString() || null,
    status: 'ACTIVE',
    created_by: createdBy,
  });

  if (error) throw new Error(`创建 API Key 失败: ${error.message}`);

  return key;
}

// 验证 API Key
export async function verifyApiKey(key: string, requiredScope?: string): Promise<boolean> {
  const client = getSupabaseClient();
  const now = new Date().toISOString();

  const { data, error } = await client
    .from('api_keys')
    .select('id, scopes')
    .eq('key', key)
    .eq('status', 'ACTIVE')
    .or(`expires_at.is.null,expires_at.gt.${now}`)
    .maybeSingle();

  if (error) throw new Error(`验证 API Key 失败: ${error.message}`);
  if (!data) return false;

  // 更新最后使用时间
  await client
    .from('api_keys')
    .update({ last_used_at: now })
    .eq('id', data.id);

  // 验证权限范围
  if (requiredScope && data.scopes) {
    const scopes = data.scopes as string[];
    const hasScope = scopes.some((scope: string) => {
      const [resource, actions] = scope.split(':');
      return requiredScope.startsWith(resource) && actions.includes('read');
    });
    return hasScope;
  }

  return true;
}

// 从请求中获取 API Key
export function getApiKeyFromRequest(request: Request): string | null {
  const apiKeyHeader = request.headers.get('x-api-key');
  if (apiKeyHeader) return apiKeyHeader;

  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }

  return null;
}
