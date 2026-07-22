'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronRight } from 'lucide-react';

const navItems = [
  { href: '/', label: '首页' },
  { href: '/courses', label: '课程' },
  { href: '/mall', label: '商城' },
  { href: '/lifestyle', label: '健康生活' },
  { href: '/vip', label: '会员中心' },
  { href: '/profile', label: '我的' },
  { href: '/about', label: '关于我们' },
];

const adminLinks = [
  { href: '/ai', label: 'AI 中台' },
  { href: '/admin', label: '管理后台' },
];

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isLogin = pathname === '/login';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  if (isLogin) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Top Navigation Bar - Glass Morphism */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass-nav shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-[1240px] px-5 md:px-10">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span
                className="text-xl font-black tracking-tight"
                style={{ fontFamily: 'Inter, sans-serif', color: '#C45A2C' }}
              >
                270
              </span>
              <span className="hidden sm:block text-[11px] font-medium tracking-widest text-gray-500 uppercase">
                Beauty Cycle
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.slice(0, 5).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[15px] font-medium transition-colors ${
                    pathname === item.href
                      ? 'text-gray-900'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="hidden md:inline-flex btn-primary px-5 h-10 text-[14px] font-medium items-center"
              >
                登录
              </Link>

              {/* Hamburger Menu Button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                aria-label="菜单"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-[300px] bg-white shadow-2xl transform transition-transform duration-300 ease-out lg:hidden ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <span className="text-lg font-bold text-gray-900">菜单</span>
          <button
            onClick={() => setMenuOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-5 py-3.5 text-[16px] transition-colors ${
                pathname === item.href
                  ? 'text-gray-900 font-medium bg-gray-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
              <ChevronRight size={16} className="text-gray-400" />
            </Link>
          ))}

          <div className="mx-5 my-4 border-t border-gray-100" />

          {adminLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center justify-between px-5 py-3.5 text-[14px] text-gray-500 hover:text-gray-800 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
              <ChevronRight size={14} className="text-gray-300" />
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-gray-100">
          <Link
            href="/login"
            className="btn-primary flex items-center justify-center w-full h-12 text-[15px] font-medium"
            onClick={() => setMenuOpen(false)}
          >
            登录 / 注册
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  );
}
