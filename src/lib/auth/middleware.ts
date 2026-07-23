import { NextRequest } from 'next/server';
import { getTokenFromRequest, verifyToken } from './jwt';
import { getApiKeyFromRequest, verifyApiKey } from './apiKey';
import { unauthorized, forbidden } from '@/lib/api/response';

// 鉴权中间件 - JWT 方式（管理员登录）
export async function authMiddleware(request: NextRequest, requiredRole?: string) {
  const token = getTokenFromRequest(request);

  if (!token) {
    return unauthorized();
  }

  const payload = await verifyToken(token);

  if (!payload) {
    return unauthorized('Token 无效或已过期');
  }

  // 验证角色权限
  if (requiredRole) {
    const roleHierarchy = {
      EDITOR: 1,
      ADMIN: 2,
      SUPER_ADMIN: 3,
    };

    const userRoleLevel = roleHierarchy[payload.role as keyof typeof roleHierarchy] || 0;
    const requiredRoleLevel = roleHierarchy[requiredRole as keyof typeof roleHierarchy] || 0;

    if (userRoleLevel < requiredRoleLevel) {
      return forbidden('权限不足');
    }
  }

  return { payload };
}

// 鉴权中间件 - API Key 方式（第三方调用）
export async function apiKeyMiddleware(request: NextRequest, requiredScope?: string) {
  const apiKey = getApiKeyFromRequest(request);

  if (!apiKey) {
    return unauthorized('请提供 API Key');
  }

  const isValid = await verifyApiKey(apiKey, requiredScope);

  if (!isValid) {
    return forbidden('API Key 无效或权限不足');
  }

  return { apiKey };
}

// 混合鉴权（JWT 或 API Key 任选其一）
export async function hybridAuthMiddleware(request: NextRequest, requiredScope?: string) {
  // 优先尝试 JWT
  const token = getTokenFromRequest(request);
  if (token) {
    const result = await authMiddleware(request);
    if ('payload' in result) return result;
  }

  // 尝试 API Key
  const apiKey = getApiKeyFromRequest(request);
  if (apiKey) {
    const result = await apiKeyMiddleware(request, requiredScope);
    if ('apiKey' in result) return result;
  }

  return unauthorized('请提供有效的认证信息');
}
