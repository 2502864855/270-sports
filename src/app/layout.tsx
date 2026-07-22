import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '270运动馆 | BEAUTY CYCLE 270 · 她的运动美学',
  description: '270运动馆是女性专属健身服务品牌，提供普拉提、瑜伽、女性力量训练等专业课程，安全、私密、无评判。超1000名核心会员的选择。',
  keywords: ['270运动馆', '女性健身', '普拉提', '瑜伽', '私教', '福州健身'],
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
