'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Crown, Calendar, ShoppingBag, Heart, Settings, LogOut, Award, TrendingUp } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

const tabs = ['概览', '我的课程', '订单', '收藏'];

const menuItems = [
  { icon: Calendar, label: '我的课程', href: '/courses' },
  { icon: ShoppingBag, label: '我的订单', href: '#' },
  { icon: Heart, label: '我的收藏', href: '#' },
  { icon: Crown, label: '会员中心', href: '/vip' },
  { icon: Award, label: '我的积分', href: '#' },
  { icon: Settings, label: '设置', href: '#' },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('概览');

  return (
    <div className="pt-24 pb-20 px-5 md:px-10">
      <div className="mx-auto max-w-[1240px]">
        {/* Profile Header */}
        <Reveal>
          <div className="flex items-center gap-5 mb-8">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-100">
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80" alt="avatar" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-[24px] font-bold text-gray-900">张小美</h1>
              <div className="flex items-center gap-2 mt-1">
                <Crown size={14} style={{ color: '#C45A2C' }} />
                <span className="text-[14px] font-medium" style={{ color: '#C45A2C' }}>金卡会员</span>
                <span className="text-[13px] text-gray-400">· 2025.03.15 到期</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Stats */}
        <Reveal delay={1}>
          <div className="grid grid-cols-3 gap-4 mb-10">
            {[
              { label: '累计运动', value: '128', unit: '次' },
              { label: '消耗卡路里', value: '32,450', unit: 'kcal' },
              { label: '连续打卡', value: '15', unit: '天' },
            ].map(stat => (
              <div key={stat.label} className="card p-5 text-center">
                <p className="text-[28px] font-bold text-gray-900" style={{ fontFamily: 'Inter' }}>
                  {stat.value}
                </p>
                <p className="text-[12px] text-gray-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Tabs */}
        <Reveal delay={2}>
          <div className="flex gap-6 border-b border-gray-200 mb-8">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`tab-underline text-[15px] pb-3 ${activeTab === tab ? 'active' : ''}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Menu */}
        <Reveal delay={3}>
          <div className="card overflow-hidden">
            {menuItems.map((item, i) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors ${
                  i < menuItems.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={18} className="text-gray-500" />
                  <span className="text-[15px] text-gray-800">{item.label}</span>
                </div>
                <ChevronRight size={16} className="text-gray-300" />
              </Link>
            ))}
          </div>
        </Reveal>

        {/* Logout */}
        <Reveal delay={4}>
          <button className="mt-6 w-full flex items-center justify-center gap-2 py-3 text-[14px] text-gray-400 hover:text-gray-600 transition-colors">
            <LogOut size={15} /> 退出登录
          </button>
        </Reveal>
      </div>
    </div>
  );
}
