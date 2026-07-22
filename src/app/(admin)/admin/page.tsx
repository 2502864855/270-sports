'use client';

import { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  ShoppingBag,
  Settings,
  BarChart3,
  Bell,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Filter,
  Download,
  Crown,
  Heart,
  Package,
  FileText,
  DollarSign,
  UserCheck,
  Image,
} from 'lucide-react';

const sidebarItems = [
  { icon: LayoutDashboard, label: '仪表盘', id: 'dashboard' },
  { icon: Users, label: '用户管理', id: 'users' },
  { icon: BookOpen, label: '课程管理', id: 'courses' },
  { icon: UserCheck, label: '教练管理', id: 'coaches' },
  { icon: ShoppingBag, label: '商城管理', id: 'mall' },
  { icon: Package, label: '商品管理', id: 'products' },
  { icon: DollarSign, label: '财务管理', id: 'finance' },
  { icon: FileText, label: '内容管理', id: 'content' },
  { icon: BarChart3, label: '数据统计', id: 'stats' },
  { icon: Bell, label: '系统通知', id: 'notifications' },
  { icon: Settings, label: '系统设置', id: 'settings' },
];

const recentUsers = [
  { id: 1, name: '小鹿', phone: '138****8888', level: '金卡', status: '活跃', joined: '2025-06-15', avatar: '🌸' },
  { id: 2, name: 'Amy', phone: '139****6666', level: '钻石', status: '活跃', joined: '2025-03-14', avatar: '💎' },
  { id: 3, name: '王小花', phone: '137****5555', level: '银卡', status: '7天未登录', joined: '2025-08-10', avatar: '🌺' },
  { id: 4, name: '陈女士', phone: '136****3333', level: '金卡', status: '活跃', joined: '2025-01-12', avatar: '🌷' },
  { id: 5, name: '林小姐', phone: '135****2222', level: '普通', status: '30天未登录', joined: '2024-12-20', avatar: '🌻' },
];

const courseList = [
  { id: 1, title: '普拉提核心塑形', instructor: '陈雨萱', students: 256, rating: 4.9, status: '已上线', price: '¥128' },
  { id: 2, title: '流瑜伽·晨光序列', instructor: '张诗涵', students: 312, rating: 4.9, status: '已上线', price: '¥98' },
  { id: 3, title: '女性力量·蜜桃臀', instructor: '林小雅', students: 189, rating: 4.8, status: '已上线', price: '¥138' },
  { id: 4, title: '孕产修复·温柔恢复', instructor: '张诗涵', students: 87, rating: 5.0, status: '已上线', price: '¥168' },
  { id: 5, title: '体态管理·天鹅颈', instructor: '陈雨萱', students: 145, rating: 4.8, status: '排期中', price: '¥118' },
];

const coachList = [
  { id: 1, name: '陈雨萱', title: '普拉提导师', exp: '8年', courses: 3, rating: 4.9, students: 401, avatar: '👩‍🦰' },
  { id: 2, name: '林小雅', title: '力量教练', exp: '6年', courses: 2, rating: 4.8, students: 189, avatar: '👩' },
  { id: 3, name: '张诗涵', title: '瑜伽导师', exp: '10年', courses: 4, rating: 5.0, students: 686, avatar: '🧘‍♀️' },
];

const orderList = [
  { id: 'ORD-20260101', user: '小鹿', type: '课程', item: '普拉提核心塑形', amount: '¥98', status: '已完成', time: '2026-01-15 10:30' },
  { id: 'ORD-20260102', user: 'Amy', type: '会员', item: '钻石年卡', amount: '¥8,999', status: '已完成', time: '2026-01-15 09:15' },
  { id: 'ORD-20260103', user: '王小花', type: '商城', item: '高腰瑜伽裤', amount: '¥198', status: '待发货', time: '2026-01-14 16:40' },
  { id: 'ORD-20260104', user: '陈女士', type: '课程', item: '女性力量·蜜桃臀', amount: '¥108', status: '已完成', time: '2026-01-14 14:20' },
  { id: 'ORD-20260105', user: '林小姐', type: '商城', item: '天然橡胶瑜伽垫', amount: '¥268', status: '退款中', time: '2026-01-13 11:00' },
];

export default function AdminDashboardPage() {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [activeTab, setActiveTab] = useState<'users' | 'courses' | 'coaches' | 'orders'>('users');

  const tabs = [
    { key: 'users', label: '用户管理' },
    { key: 'courses', label: '课程管理' },
    { key: 'coaches', label: '教练管理' },
    { key: 'orders', label: '订单管理' },
  ] as const;

  return (
    <div className="min-h-screen bg-[#2A2030] text-white flex">
      {/* Sidebar */}
      <aside className="w-56 border-r border-[#4A3E52] flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-[#4A3E52]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#D4859B] to-[#E8A0B5] flex items-center justify-center text-white font-bold text-xs">
              270
            </div>
            <div>
              <h1 className="text-sm font-bold">270运动馆</h1>
              <p className="text-[10px] text-[#B8A8A4]">管理后台</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs transition-all ${
                  activeMenu === item.id
                    ? 'bg-[#D4859B]/15 text-[#E8A0B5]'
                    : 'text-[#B8A8A4] hover:text-white hover:bg-[#362A3E]'
                }`}
              >
                <Icon size={14} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-[#4A3E52]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#362A3E] flex items-center justify-center text-xs">👤</div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-medium truncate">管理员</p>
              <p className="text-[9px] text-[#B8A8A4]">admin@270.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-12 border-b border-[#4A3E52] flex items-center justify-between px-5 flex-shrink-0">
          <h2 className="text-sm font-semibold">
            {sidebarItems.find(i => i.id === activeMenu)?.label || '仪表盘'}
          </h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={13} className="absolute left-2 top-1/2 -translate-y-1/2 text-[#B8A8A4]" />
              <input
                type="text"
                placeholder="搜索..."
                className="pl-7 pr-3 py-1.5 bg-[#362A3E] border border-[#4A3E52] rounded-lg text-xs text-white placeholder:text-[#B8A8A4] focus:outline-none focus:border-[#D4859B] w-40"
              />
            </div>
            <button className="relative">
              <Bell size={14} className="text-[#B8A8A4]" />
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#F08080] text-[7px] flex items-center justify-center">5</span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-5 overflow-auto">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-3 mb-5">
            {[
              { label: '总会员', value: '10,043', change: '+128', color: '#D4859B' },
              { label: '本月营收', value: '¥24.1万', change: '+15.3%', color: '#7EC8B7' },
              { label: '课程总数', value: '86', change: '+3', color: '#F08080' },
              { label: '续费率', value: '68%', change: '+3.2%', color: '#B8A9C9' },
            ].map((stat) => (
              <div key={stat.label} className="dark-card rounded-xl p-3">
                <p className="text-[11px] text-[#B8A8A4] mb-1">{stat.label}</p>
                <p className="text-lg font-bold">{stat.value}</p>
                <p className="text-[10px] mt-0.5" style={{ color: stat.color }}>{stat.change}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex gap-0.5 bg-[#362A3E] rounded-lg p-0.5">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-3 py-1.5 rounded-md text-[11px] font-medium transition-all ${
                    activeTab === tab.key
                      ? 'bg-[#4A3E52] text-white'
                      : 'text-[#B8A8A4] hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="flex-1" />
            <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#362A3E] border border-[#4A3E52] text-[11px] text-[#B8A8A4] hover:border-[#D4859B] transition-colors">
              <Filter size={11} /> 筛选
            </button>
            <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#362A3E] border border-[#4A3E52] text-[11px] text-[#B8A8A4] hover:border-[#D4859B] transition-colors">
              <Download size={11} /> 导出
            </button>
            <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-[#D4859B] to-[#E8A0B5] text-white text-[11px]">
              <Plus size={11} /> 新增
            </button>
          </div>

          {/* Tables */}
          <div className="dark-card rounded-xl overflow-hidden">
            {activeTab === 'users' && (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#4A3E52]">
                    {['用户', '手机号', '会员等级', '状态', '注册时间', '操作'].map(h => (
                      <th key={h} className="text-left px-3 py-2.5 text-[11px] font-medium text-[#B8A8A4]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map((user) => (
                    <tr key={user.id} className="border-b border-[#4A3E52]/50 hover:bg-[#362A3E]/50 transition-colors">
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{user.avatar}</span>
                          <span className="text-xs">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-3 py-2.5 text-xs text-[#B8A8A4]">{user.phone}</td>
                      <td className="px-3 py-2.5">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                          user.level === '钻石' ? 'bg-[#F08080]/15 text-[#F08080]' :
                          user.level === '金卡' ? 'bg-[#D4859B]/15 text-[#D4859B]' :
                          user.level === '银卡' ? 'bg-[#B8A9C9]/15 text-[#B8A9C9]' :
                          'bg-[#7EC8B7]/15 text-[#7EC8B7]'
                        }`}>{user.level}</span>
                      </td>
                      <td className="px-3 py-2.5">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                          user.status === '活跃' ? 'bg-[#7EC8B7]/15 text-[#7EC8B7]' : 'bg-[#F08080]/15 text-[#F08080]'
                        }`}>{user.status}</span>
                      </td>
                      <td className="px-3 py-2.5 text-xs text-[#B8A8A4]">{user.joined}</td>
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-1.5">
                          <button className="w-6 h-6 rounded-lg bg-[#362A3E] flex items-center justify-center hover:bg-[#4A3E52]"><Eye size={11} className="text-[#B8A8A4]" /></button>
                          <button className="w-6 h-6 rounded-lg bg-[#362A3E] flex items-center justify-center hover:bg-[#4A3E52]"><Edit size={11} className="text-[#B8A8A4]" /></button>
                          <button className="w-6 h-6 rounded-lg bg-[#362A3E] flex items-center justify-center hover:bg-red-500/20"><Trash2 size={11} className="text-red-400" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'courses' && (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#4A3E52]">
                    {['课程名称', '教练', '学员数', '评分', '价格', '状态', '操作'].map(h => (
                      <th key={h} className="text-left px-3 py-2.5 text-[11px] font-medium text-[#B8A8A4]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {courseList.map((course) => (
                    <tr key={course.id} className="border-b border-[#4A3E52]/50 hover:bg-[#362A3E]/50 transition-colors">
                      <td className="px-3 py-2.5 text-xs font-medium">{course.title}</td>
                      <td className="px-3 py-2.5 text-xs text-[#B8A8A4]">{course.instructor}</td>
                      <td className="px-3 py-2.5 text-xs text-[#B8A8A4]">{course.students}</td>
                      <td className="px-3 py-2.5 text-xs text-[#FFB800]">★ {course.rating}</td>
                      <td className="px-3 py-2.5 text-xs text-[#E8A0B5]">{course.price}</td>
                      <td className="px-3 py-2.5">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                          course.status === '已上线' ? 'bg-[#7EC8B7]/15 text-[#7EC8B7]' : 'bg-[#F08080]/15 text-[#F08080]'
                        }`}>{course.status}</span>
                      </td>
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-1.5">
                          <button className="w-6 h-6 rounded-lg bg-[#362A3E] flex items-center justify-center hover:bg-[#4A3E52]"><Eye size={11} className="text-[#B8A8A4]" /></button>
                          <button className="w-6 h-6 rounded-lg bg-[#362A3E] flex items-center justify-center hover:bg-[#4A3E52]"><Edit size={11} className="text-[#B8A8A4]" /></button>
                          <button className="w-6 h-6 rounded-lg bg-[#362A3E] flex items-center justify-center hover:bg-red-500/20"><Trash2 size={11} className="text-red-400" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'coaches' && (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#4A3E52]">
                    {['教练', '职称', '经验', '负责课程', '评分', '学员数', '操作'].map(h => (
                      <th key={h} className="text-left px-3 py-2.5 text-[11px] font-medium text-[#B8A8A4]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {coachList.map((coach) => (
                    <tr key={coach.id} className="border-b border-[#4A3E52]/50 hover:bg-[#362A3E]/50 transition-colors">
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{coach.avatar}</span>
                          <span className="text-xs">{coach.name}</span>
                        </div>
                      </td>
                      <td className="px-3 py-2.5 text-xs text-[#B8A8A4]">{coach.title}</td>
                      <td className="px-3 py-2.5 text-xs text-[#B8A8A4]">{coach.exp}</td>
                      <td className="px-3 py-2.5 text-xs text-[#B8A8A4]">{coach.courses}门</td>
                      <td className="px-3 py-2.5 text-xs text-[#FFB800]">★ {coach.rating}</td>
                      <td className="px-3 py-2.5 text-xs text-[#B8A8A4]">{coach.students}</td>
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-1.5">
                          <button className="w-6 h-6 rounded-lg bg-[#362A3E] flex items-center justify-center hover:bg-[#4A3E52]"><Eye size={11} className="text-[#B8A8A4]" /></button>
                          <button className="w-6 h-6 rounded-lg bg-[#362A3E] flex items-center justify-center hover:bg-[#4A3E52]"><Edit size={11} className="text-[#B8A8A4]" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'orders' && (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#4A3E52]">
                    {['订单号', '用户', '类型', '商品/课程', '金额', '状态', '时间'].map(h => (
                      <th key={h} className="text-left px-3 py-2.5 text-[11px] font-medium text-[#B8A8A4]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orderList.map((order) => (
                    <tr key={order.id} className="border-b border-[#4A3E52]/50 hover:bg-[#362A3E]/50 transition-colors">
                      <td className="px-3 py-2.5 text-[11px] font-mono text-[#E8A0B5]">{order.id}</td>
                      <td className="px-3 py-2.5 text-xs">{order.user}</td>
                      <td className="px-3 py-2.5">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                          order.type === '会员' ? 'bg-[#D4859B]/15 text-[#D4859B]' :
                          order.type === '课程' ? 'bg-[#7EC8B7]/15 text-[#7EC8B7]' :
                          'bg-[#B8A9C9]/15 text-[#B8A9C9]'
                        }`}>{order.type}</span>
                      </td>
                      <td className="px-3 py-2.5 text-xs text-[#B8A8A4]">{order.item}</td>
                      <td className="px-3 py-2.5 text-xs font-medium text-[#E8A0B5]">{order.amount}</td>
                      <td className="px-3 py-2.5">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                          order.status === '已完成' ? 'bg-[#7EC8B7]/15 text-[#7EC8B7]' :
                          order.status === '退款中' ? 'bg-[#F08080]/15 text-[#F08080]' :
                          'bg-[#FFB800]/15 text-[#FFB800]'
                        }`}>{order.status}</span>
                      </td>
                      <td className="px-3 py-2.5 text-[11px] text-[#B8A8A4]">{order.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-between px-3 py-2.5 border-t border-[#4A3E52]">
              <span className="text-[11px] text-[#B8A8A4]">显示 1-5 / 共 10,043 条</span>
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, '...', 2009].map((page, i) => (
                  <button
                    key={i}
                    className={`w-6 h-6 rounded-md text-[11px] transition-colors ${
                      page === 1 ? 'bg-gradient-to-r from-[#D4859B] to-[#E8A0B5] text-white' : 'text-[#B8A8A4] hover:bg-[#362A3E]'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
