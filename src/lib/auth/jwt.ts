import { SignJWT, jwtVerify } from 'jose';
import { NextRequest } from 'next/server';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || '270-sports-jwt-secret-key-2024'
);

const JWT_EXPIRES_IN = '7d'; // 7 天过期

// JWT Payload 类型
export interface JwtPayload {
  sub: number; // 管理员 ID
  username: string;
  role: string;
  iat?: number;
  exp?: number;
}

// 签发 JWT
export async function signToken(payload: Omit<JwtPayload, 'iat' | 'exp'>) {
  const token = await new SignJWT({ ...payload } as Record<string, unknown>)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRES_IN)
    .sign(JWT_SECRET);

  return token;
}

// 验证 JWT
export async function verifyToken(token: string): Promise<JwtPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as JwtPayload;
  } catch (error) {
    return null;
  }
}

// 从请求中获取 Token
export function getTokenFromRequest(request: NextRequest): string | null {
  // 从 Authorization header 获取
  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }

  // 从 Cookie 获取
  const cookieToken = request.cookies.get('admin_token')?.value;
  if (cookieToken) {
    return cookieToken;
  }

  return null;
}
