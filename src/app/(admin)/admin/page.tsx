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
  ChevronDown,
  Plus,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  Filter,
  Download,
} from 'lucide-react';

const sidebarItems = [
  { icon: LayoutDashboard, label: '仪表盘', id: 'dashboard' },
  { icon: Users, label: '用户管理', id: 'users' },
  { icon: BookOpen, label: '课程管理', id: 'courses' },
  { icon: ShoppingBag, label: '商城管理', id: 'mall' },
  { icon: BarChart3, label: '数据统计', id: 'stats' },
  { icon: Bell, label: '系统通知', id: 'notifications' },
  { icon: Settings, label: '系统设置', id: 'settings' },
];

const recentUsers = [
  { id: 1, name: '张三', email: 'zhang***@163.com', level: 'VIP', status: '活跃', joined: '2024-01-15', avatar: '👨' },
  { id: 2, name: '李四', email: 'li***@qq.com', level: '普通', status: '活跃', joined: '2024-01-14', avatar: '👩' },
  { id: 3, name: '王五', email: 'wang***@gmail.com', level: 'VIP', status: '7天未登录', joined: '2024-01-10', avatar: '🧑' },
  { id: 4, name: '赵六', email: 'zhao***@126.com', level: '普通', status: '活跃', joined: '2024-01-12', avatar: '👨' },
  { id: 5, name: '孙七', email: 'sun***@outlook.com', level: '普通', status: '30天未登录', joined: '2023-12-20', avatar: '👩' },
];

const courseList = [
  { id: 1, title: 'HIIT 全身燃脂', instructor: '李教练', students: 2341, rating: 4.9, status: '已上线' },
  { id: 2, title: '核心力量 28 天', instructor: '王教练', students: 1856, rating: 4.8, status: '已上线' },
  { id: 3, title: '晨间瑜伽唤醒', instructor: '张教练', students: 3102, rating: 4.9, status: '已上线' },
  { id: 4, title: '跑步耐力提升', instructor: '赵教练', students: 987, rating: 4.7, status: '审核中' },
  { id: 5, title: '普拉提基础入门', instructor: '刘教练', students: 1543, rating: 4.8, status: '已上线' },
];

export default function AdminDashboardPage() {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [activeTab, setActiveTab] = useState<'users' | 'courses'>('users');

  return (
    <div className="min-h-screen bg-[#0F0F23] text-white flex">
      {/* Sidebar */}
      <aside className="w-60 border-r border-[#2D2D4A] flex flex-col">
        <div className="p-5 border-b border-[#2D2D4A]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg brand-gradient flex items-center justify-center text-white font-bold text-sm">
              270
            </div>
            <div>
              <h1 className="text-sm font-bold">270运动</h1>
              <p className="text-[10px] text-gray-400">系统管理后台</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all ${
                  activeMenu === item.id
                    ? 'bg-[#FF6B35]/10 text-[#FF6B35]'
                    : 'text-gray-400 hover:text-white hover:bg-[#1E1E3A]'
                }`}
              >
                <Icon size={16} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#2D2D4A]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#1E1E3A] flex items-center justify-center text-sm">
              👤
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate">管理员</p>
              <p className="text-[10px] text-gray-400">admin@270.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="h-14 border-b border-[#2D2D4A] flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-semibold">
              {sidebarItems.find(i => i.id === activeMenu)?.label || '仪表盘'}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="搜索..."
                className="pl-8 pr-3 py-1.5 bg-[#1E1E3A] border border-[#2D2D4A] rounded-lg text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-[#FF6B35] w-48"
              />
            </div>
            <button className="relative">
              <Bell size={16} className="text-gray-400" />
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#FF6B35] text-[8px] flex items-center justify-center">5</span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          {/* Stats Overview */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { label: '总用户', value: '9,843', change: '+128', color: '#4ECDC4' },
              { label: '今日营收', value: '¥12,567', change: '+15.3%', color: '#00F5A0' },
              { label: '课程总数', value: '86', change: '+3', color: '#FF6B35' },
              { label: '商城订单', value: '1,234', change: '+8.7%', color: '#FFD93D' },
            ].map((stat) => (
              <div key={stat.label} className="dark-card rounded-xl p-4">
                <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
                <p className="text-xl font-bold">{stat.value}</p>
                <p className="text-[11px] mt-1" style={{ color: stat.color }}>{stat.change}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex gap-1 bg-[#1E1E3A] rounded-lg p-1">
              {(['users', 'courses'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all ${
                    activeTab === tab
                      ? 'bg-[#2D2D4A] text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab === 'users' ? '用户管理' : '课程管理'}
                </button>
              ))}
            </div>
            <div className="flex-1" />
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1E1E3A] border border-[#2D2D4A] text-xs text-gray-300 hover:border-[#FF6B35] transition-colors">
              <Filter size={12} /> 筛选
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1E1E3A] border border-[#2D2D4A] text-xs text-gray-300 hover:border-[#FF6B35] transition-colors">
              <Download size={12} /> 导出
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg brand-gradient text-white text-xs">
              <Plus size={12} /> 新增
            </button>
          </div>

          {/* Table */}
          <div className="dark-card rounded-xl overflow-hidden">
            {activeTab === 'users' ? (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#2D2D4A]">
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-400">用户</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-400">邮箱</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-400">等级</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-400">状态</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-400">注册时间</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-400">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map((user) => (
                    <tr key={user.id} className="border-b border-[#2D2D4A]/50 hover:bg-[#1E1E3A]/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <span className="text-lg">{user.avatar}</span>
                          <span className="text-sm">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-400">{user.email}</td>
                      <td className="px-4 py-3">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                          user.level === 'VIP'
                            ? 'bg-[#FF6B35]/15 text-[#FF6B35]'
                            : 'bg-[#4ECDC4]/15 text-[#4ECDC4]'
                        }`}>
                          {user.level}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                          user.status === '活跃'
                            ? 'bg-[#00F5A0]/15 text-[#00F5A0]'
                            : 'bg-[#FFD93D]/15 text-[#FFD93D]'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-400">{user.joined}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button className="w-7 h-7 rounded-lg bg-[#1E1E3A] flex items-center justify-center hover:bg-[#2D2D4A] transition-colors">
                            <Eye size={12} className="text-gray-400" />
                          </button>
                          <button className="w-7 h-7 rounded-lg bg-[#1E1E3A] flex items-center justify-center hover:bg-[#2D2D4A] transition-colors">
                            <Edit size={12} className="text-gray-400" />
                          </button>
                          <button className="w-7 h-7 rounded-lg bg-[#1E1E3A] flex items-center justify-center hover:bg-red-500/20 transition-colors">
                            <Trash2 size={12} className="text-red-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#2D2D4A]">
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-400">课程名称</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-400">教练</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-400">学员数</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-400">评分</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-400">状态</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-400">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {courseList.map((course) => (
                    <tr key={course.id} className="border-b border-[#2D2D4A]/50 hover:bg-[#1E1E3A]/50 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium">{course.title}</td>
                      <td className="px-4 py-3 text-sm text-gray-400">{course.instructor}</td>
                      <td className="px-4 py-3 text-sm text-gray-300">{course.students.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-[#FFD93D]">★ {course.rating}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                          course.status === '已上线'
                            ? 'bg-[#00F5A0]/15 text-[#00F5A0]'
                            : 'bg-[#FFD93D]/15 text-[#FFD93D]'
                        }`}>
                          {course.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button className="w-7 h-7 rounded-lg bg-[#1E1E3A] flex items-center justify-center hover:bg-[#2D2D4A] transition-colors">
                            <Eye size={12} className="text-gray-400" />
                          </button>
                          <button className="w-7 h-7 rounded-lg bg-[#1E1E3A] flex items-center justify-center hover:bg-[#2D2D4A] transition-colors">
                            <Edit size={12} className="text-gray-400" />
                          </button>
                          <button className="w-7 h-7 rounded-lg bg-[#1E1E3A] flex items-center justify-center hover:bg-red-500/20 transition-colors">
                            <Trash2 size={12} className="text-red-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-[#2D2D4A]">
              <span className="text-xs text-gray-400">显示 1-5 / 共 9,843 条</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, '...', 197].map((page, i) => (
                  <button
                    key={i}
                    className={`w-7 h-7 rounded-md text-xs transition-colors ${
                      page === 1
                        ? 'brand-gradient text-white'
                        : 'text-gray-400 hover:bg-[#1E1E3A]'
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
