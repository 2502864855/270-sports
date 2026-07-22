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
    <div className="min-h-screen bg-[#FDF8F5] flex flex-col">
      {/* Portal Switcher - hidden on login page */}
      {!isLoginPage && (
        <>
          <button
            onClick={() => setShowPortal(!showPortal)}
            className="fixed top-4 right-4 z-[100] w-9 h-9 rounded-full bg-[#D4859B] text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
            title="切换界面"
          >
            <Brain size={16} />
          </button>

          {showPortal && (
            <div className="fixed top-14 right-4 z-[100] bg-white rounded-2xl shadow-2xl border border-[#F0E6E0] p-2 w-44 animate-float-up">
              <p className="text-[10px] text-[#8A7A74] px-2 py-1">切换界面</p>
              <Link
                href="/"
                onClick={() => setShowPortal(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-[#D4859B] bg-[#D4859B]/5 font-medium"
              >
                <Brain size={14} /> 客户端
              </Link>
              <Link
                href="/ai"
                onClick={() => setShowPortal(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-[#4A4A4A] hover:bg-[#FDF0F0]"
              >
                <Brain size={14} /> AI 中台
              </Link>
              <Link
                href="/admin"
                onClick={() => setShowPortal(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-[#4A4A4A] hover:bg-[#FDF0F0]"
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

      {/* Bottom Tab Bar - hidden on login page */}
      {!isLoginPage && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-[#F0E6E0] z-50">
          <div className="max-w-[480px] mx-auto flex items-center justify-around h-16 px-2">
            {tabs.map((tab) => {
              const isActive = pathname === tab.href;
              const Icon = tab.icon;
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={cn(
                    'flex flex-col items-center justify-center gap-0.5 px-4 py-1.5 rounded-2xl transition-all duration-200',
                    isActive
                      ? 'text-[#D4859B]'
                      : 'text-[#B8A8A4] hover:text-[#8A7A74]'
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
