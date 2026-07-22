'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, UtensilsCrossed, BookOpen, ShoppingBag, User, Monitor, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const tabs = [
  { href: '/', label: '首页', icon: Home },
  { href: '/diet', label: '饮食', icon: UtensilsCrossed },
  { href: '/courses', label: '课程', icon: BookOpen },
  { href: '/mall', label: '商城', icon: ShoppingBag },
  { href: '/profile', label: '我的', icon: User },
];

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [showPortal, setShowPortal] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      {/* Portal Switcher */}
      <button
        onClick={() => setShowPortal(!showPortal)}
        className="fixed top-4 right-4 z-[100] w-9 h-9 rounded-full bg-[#1A1A2E] text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
        title="切换界面"
      >
        <Monitor size={16} />
      </button>

      {showPortal && (
        <div className="fixed top-14 right-4 z-[100] bg-white rounded-xl shadow-2xl border border-gray-100 p-2 w-40 animate-float-up">
          <p className="text-[10px] text-gray-400 px-2 py-1">切换界面</p>
          <Link
            href="/"
            onClick={() => setShowPortal(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#FF6B35] bg-[#FF6B35]/5 font-medium"
          >
            <Monitor size={14} /> 客户端
          </Link>
          <Link
            href="/ai"
            onClick={() => setShowPortal(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
          >
            <Monitor size={14} /> AI 中台
          </Link>
          <Link
            href="/admin"
            onClick={() => setShowPortal(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
          >
            <Shield size={14} /> 管理后台
          </Link>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 pb-20 max-w-[480px] mx-auto w-full">
        {children}
      </main>

      {/* Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50">
        <div className="max-w-[480px] mx-auto flex items-center justify-around h-16 px-2">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;
            const Icon = tab.icon;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  'flex flex-col items-center justify-center gap-0.5 px-3 py-1 rounded-xl transition-all duration-200',
                  isActive
                    ? 'text-[#FF6B35]'
                    : 'text-gray-400 hover:text-gray-600'
                )}
              >
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.5 : 1.8}
                />
                <span className={cn(
                  'text-[10px]',
                  isActive ? 'font-semibold' : 'font-normal'
                )}>
                  {tab.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
