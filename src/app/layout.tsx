import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '270运动 - 科学健身，健康生活',
  description: '270运动为您提供专业的健身课程、科学的饮食计划和智能AI助手，帮助您实现健康目标。',
  keywords: ['270运动', '健身', '运动', '饮食', '课程', '健康管理'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  );
}
