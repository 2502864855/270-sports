'use client';

import Link from 'next/link';
import { User, Crown, ShoppingBag, Heart, Activity, Calendar, Settings, ChevronRight, Trophy, Flame, Target } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { useState } from 'react';

// 功能入口
const menuItems = [
  { icon: Calendar, label: '我的课程', desc: '已购课程、预约记录', color: '#C45A2C', href: '/courses' },
  { icon: Crown, label: '我的会员', desc: 'VIP 状态、会员权益', color: '#C45A2C', href: '/vip' },
  { icon: ShoppingBag, label: '我的订单', desc: '全部订单记录', color: '#403E3B', href: '#' },
  { icon: Heart, label: '我的收藏', desc: '收藏的课程/文章', color: '#403E3B', href: '#' },
  { icon: Activity, label: '身体数据', desc: '体测记录、数据趋势', color: '#403E3B', href: '#' },
  { icon: Calendar, label: '预约管理', desc: '私教、团课预约', color: '#403E3B', href: '#' },
  { icon: Settings, label: '设置', desc: '个人信息、密码', color: '#73716D', href: '#' },
];

// 数据概览
const stats = [
  { icon: Target, value: '128', label: '累计训练', unit: '次' },
  { icon: Flame, value: '4.5', label: '本周时长', unit: '小时' },
  { icon: Trophy, value: '21', label: '连续打卡', unit: '天' },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF8F5' }}>
      {/* 顶部个人信息区 */}
      <div className="pt-16 pb-8 px-5" style={{ background: 'linear-gradient(180deg, #1F1E1C, #181817)' }}>
        <div className="mx-auto max-w-[1240px]">
          <div className="flex items-center gap-4 mb-6">
            {/* 头像 */}
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white" style={{ background: 'linear-gradient(135deg, #C45A2C, #A84A22)' }}>
              周
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-white mb-1">周女士</h1>
              <div className="flex items-center gap-2">
                <Crown size={14} style={{ color: '#C45A2C' }} />
                <span className="text-sm" style={{ color: '#C45A2C' }}>金卡会员</span>
              </div>
            </div>
            <Link href="/vip" className="inline-flex items-center justify-center text-sm px-4 py-2 rounded-lg text-white whitespace-nowrap flex-shrink-0" style={{ background: 'linear-gradient(180deg, #D97A4A, #C45A2C, #A84A22)' }}>
              续费会员
            </Link>
          </div>

          {/* 数据概览 */}
          <div className="grid grid-cols-3 gap-3">
            {stats.map((stat, i) => (
              <div key={i} className="p-3 md:p-4 rounded-xl" style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <stat.icon size={18} className="mb-2" style={{ color: '#C45A2C' }} />
                <div className="text-xl md:text-2xl font-bold text-white mb-1 truncate">
                  {stat.value}<span className="text-xs font-normal ml-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>{stat.unit}</span>
                </div>
                <div className="text-xs truncate" style={{ color: 'rgba(255,255,255,0.5)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 功能入口 */}
      <div className="px-5 py-8">
        <div className="mx-auto max-w-[1240px]">
          <Reveal>
            <h2 className="text-lg font-bold mb-4" style={{ color: '#181817' }}>我的服务</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {menuItems.map((item, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <Link
                  href={item.href || '#'}
                  className="flex items-center gap-4 p-4 rounded-xl transition-all"
                  style={{ backgroundColor: '#FFFFFF', border: '1px solid #E7E5E1' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#C45A2C';
                    e.currentTarget.style.transform = 'scale(1.01)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#E7E5E1';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${item.color}10` }}>
                    <item.icon size={20} style={{ color: item.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold" style={{ color: '#181817' }}>{item.label}</div>
                    <div className="text-xs" style={{ color: '#73716D' }}>{item.desc}</div>
                  </div>
                  <ChevronRight size={16} style={{ color: '#A1A1A6' }} />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* 最近课程 */}
      <div className="px-5 py-8">
        <div className="mx-auto max-w-[1240px]">
          <Reveal>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold" style={{ color: '#181817' }}>最近课程</h2>
              <Link href="#" className="text-sm" style={{ color: '#C45A2C' }}>查看全部</Link>
            </div>
          </Reveal>

          <div className="space-y-3">
            {[
              { name: '普拉提核心床', coach: '林悦导师', time: '明天 10:00', status: '已预约' },
              { name: '瑜伽流', coach: '陈雨桐导师', time: '后天 14:00', status: '已预约' },
            ].map((course, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="p-4 rounded-xl" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E7E5E1' }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold mb-1" style={{ color: '#181817' }}>{course.name}</div>
                      <div className="text-xs" style={{ color: '#73716D' }}>{course.coach} · {course.time}</div>
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full" style={{ backgroundColor: '#C45A2C20', color: '#C45A2C' }}>
                      {course.status}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
