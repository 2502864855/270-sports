import Link from 'next/link';
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  Users,
  BarChart3,
  Receipt,
  Code2,
  Settings,
  ArrowLeft,
  Crown,
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: '数据看板', href: '/admin' },
  { icon: FileText, label: '内容管理', href: '/admin/content' },
  { icon: BookOpen, label: '课程管理', href: '/admin/courses' },
  { icon: Users, label: '会员管理', href: '/admin/members' },
  { icon: Receipt, label: '订单管理', href: '/admin/orders' },
  { icon: BarChart3, label: '数据统计', href: '/admin/stats' },
  { icon: Code2, label: 'API 接口', href: '/admin/api' },
  { icon: Settings, label: '系统设置', href: '/admin/settings' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#181817' }}>
      {/* Sidebar */}
      <aside className="w-60 border-r border-white/[0.06] flex flex-col flex-shrink-0">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2 text-white/40 hover:text-white/60 text-[13px] mb-6 transition-colors">
            <ArrowLeft size={14} /> 返回前台
          </Link>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(196,90,44,0.15)' }}>
              <Crown size={16} style={{ color: '#C45A2C' }} />
            </div>
            <div>
              <h1 className="text-[14px] font-semibold text-white">管理后台</h1>
              <p className="text-[11px] text-white/30">270 运动馆 v3.0</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 overflow-y-auto">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] text-white/50 hover:text-white/80 hover:bg-white/[0.04] transition-colors mb-0.5"
            >
              <item.icon size={16} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium" style={{ backgroundColor: 'rgba(196,90,44,0.2)', color: '#C45A2C' }}>
              A
            </div>
            <div>
              <p className="text-[13px] text-white/80">管理员</p>
              <p className="text-[11px] text-white/30">admin@270.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
