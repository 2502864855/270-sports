import Link from 'next/link';
import { LayoutGrid, Users, BookOpen, ShoppingBag, Receipt, ArrowLeft } from 'lucide-react';

const navItems = [
  { icon: LayoutGrid, label: '仪表盘', href: '/admin' },
  { icon: Users, label: '用户管理', href: '/admin/users' },
  { icon: BookOpen, label: '课程管理', href: '/admin/courses' },
  { icon: ShoppingBag, label: '商品管理', href: '/admin/products' },
  { icon: Receipt, label: '订单管理', href: '/admin/orders' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
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
              <LayoutGrid size={16} style={{ color: '#C45A2C' }} />
            </div>
            <div>
              <h1 className="text-[14px] font-semibold text-white">管理后台</h1>
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
