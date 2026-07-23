import { NextResponse } from 'next/server';

// 统一响应格式
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T | null;
}

// 成功响应
export function success<T>(data: T, message: string = 'success') {
  return NextResponse.json({
    code: 200,
    message,
    data,
  });
}

// 错误响应
export function error(code: number, message: string) {
  return NextResponse.json(
    {
      code,
      message,
      data: null,
    },
    { status: code === 401 ? 401 : code === 403 ? 403 : code === 404 ? 404 : code === 429 ? 429 : 500 }
  );
}

// 分页响应
export interface PaginatedResponse<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export function paginated<T>(list: T[], total: number, page: number, pageSize: number) {
  return NextResponse.json({
    code: 200,
    message: 'success',
    data: {
      list,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    },
  });
}

// 常用错误函数
export const badRequest = (message: string = '请求参数错误') => error(400, message);
export const unauthorized = (message: string = '未授权，请先登录') => error(401, message);
export const forbidden = (message: string = '权限不足') => error(403, message);
export const notFound = (message: string = '资源不存在') => error(404, message);
export const tooManyRequests = (message: string = '请求过于频繁') => error(429, message);
export const serverError = (message: string = '服务器内部错误') => error(500, message);
