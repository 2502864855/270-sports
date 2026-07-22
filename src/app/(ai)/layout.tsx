import Link from 'next/link';
import { Brain, LayoutDashboard, Users, TrendingUp, Settings, ArrowLeft } from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: '数据总览', href: '/ai' },
  { icon: Users, label: '用户分析', href: '/ai/users' },
  { icon: TrendingUp, label: '收入趋势', href: '/ai/revenue' },
  { icon: Settings, label: '系统设置', href: '/ai/settings' },
];

export default function AiLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#181817' }}>
      {/* Sidebar */}
      <aside className="w-60 border-r border-white/[0.06] flex flex-col">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2 text-white/40 hover:text-white/60 text-[13px] mb-6 transition-colors">
            <ArrowLeft size={14} /> 返回前台
          </Link>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(196,90,44,0.15)' }}>
              <Brain size={16} style={{ color: '#C45A2C' }} />
            </div>
            <div>
              <h1 className="text-[14px] font-semibold text-white">AI 中台</h1>
              <p className="text-[11px] text-white/30">270 运动馆</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-3">
          {navItems.map(item => (
            <Link key={item.href} href={item.href}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] text-white/50 hover:text-white/80 hover:bg-white/[0.04] transition-colors mb-0.5"
            >
              <item.icon size={16} /> {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      {/* Main */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
