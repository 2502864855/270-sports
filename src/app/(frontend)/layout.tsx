'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, ShoppingBag, User, Brain, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const tabs = [
  { href: '/', label: '首页', icon: Home },
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

  const isLoginPage = pathname === '/login';

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Portal Switcher */}
      {!isLoginPage && (
        <>
          <button
            onClick={() => setShowPortal(!showPortal)}
            className="fixed top-4 right-4 z-[100] w-9 h-9 rounded-full bg-[#1D1D1F] text-white flex items-center justify-center shadow-lg hover:bg-[#C45A2C] transition-colors"
            title="切换界面"
          >
            <Brain size={16} />
          </button>

          {showPortal && (
            <div className="fixed top-14 right-4 z-[100] bg-white rounded-xl shadow-2xl border border-[#D2D2D7] p-2 w-44 animate-float-up">
              <p className="text-[10px] text-[#86868B] px-2 py-1">切换界面</p>
              <Link
                href="/"
                onClick={() => setShowPortal(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#C45A2C] bg-[#C45A2C]/5 font-medium"
              >
                <Brain size={14} /> 客户端
              </Link>
              <Link
                href="/ai"
                onClick={() => setShowPortal(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#1D1D1F] hover:bg-[#F5F5F7]"
              >
                <Brain size={14} /> AI 中台
              </Link>
              <Link
                href="/admin"
                onClick={() => setShowPortal(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#1D1D1F] hover:bg-[#F5F5F7]"
              >
                <Shield size={14} /> 管理后台
              </Link>
            </div>
          )}
        </>
      )}

      {/* Main content */}
      <main className={`flex-1 ${isLoginPage ? '' : 'pb-20'} max-w-[480px] mx-auto w-full`}>
        {children}
      </main>

      {/* Bottom Tab Bar */}
      {!isLoginPage && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-[#D2D2D7] z-50">
          <div className="max-w-[480px] mx-auto flex items-center justify-around h-16 px-2">
            {tabs.map((tab) => {
              const isActive = pathname === tab.href;
              const Icon = tab.icon;
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={cn(
                    'flex flex-col items-center justify-center gap-0.5 px-4 py-1.5 rounded-xl transition-colors',
                    isActive
                      ? 'text-[#C45A2C]'
                      : 'text-[#86868B] hover:text-[#1D1D1F]'
                  )}
                >
                  <Icon
                    size={22}
                    strokeWidth={isActive ? 2.2 : 1.6}
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
      )}
    </div>
  );
}
