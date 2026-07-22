'use client';

import { useState } from 'react';
import {
  User,
  Settings,
  ChevronRight,
  Award,
  Target,
  Flame,
  Calendar,
  Heart,
  Bell,
  HelpCircle,
  LogOut,
  TrendingUp,
  Trophy,
} from 'lucide-react';

const menuItems = [
  { icon: Target, label: '我的目标', desc: '设置运动与饮食目标', badge: '' },
  { icon: Calendar, label: '训练日历', desc: '查看训练记录', badge: '7天连续' },
  { icon: Heart, label: '健康数据', desc: '心率、睡眠、体重', badge: '' },
  { icon: Bell, label: '消息通知', desc: '课程提醒、系统消息', badge: '3' },
  { icon: Award, label: '我的成就', desc: '12 个成就已解锁', badge: '' },
  { icon: HelpCircle, label: '帮助中心', desc: '常见问题与反馈', badge: '' },
  { icon: Settings, label: '设置', desc: '账号、隐私、通知', badge: '' },
];

const achievements = [
  { icon: '🏃', title: '初次奔跑', desc: '完成第一次跑步', unlocked: true },
  { icon: '🔥', title: '燃脂达人', desc: '累计消耗 10000 kcal', unlocked: true },
  { icon: '💪', title: '力量之星', desc: '完成 50 次力量训练', unlocked: true },
  { icon: '🧘', title: '身心平衡', desc: '连续 7 天瑜伽', unlocked: false },
  { icon: '🏆', title: '冠军之路', desc: '完成 270 挑战赛', unlocked: false },
  { icon: '⭐', title: '全能运动家', desc: '尝试所有课程类型', unlocked: false },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'stats' | 'achievements'>('stats');

  return (
    <div className="px-4 pt-6 animate-float-up">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-[#FF6B35] to-[#FF8F65] rounded-2xl p-5 text-white mb-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-10 translate-x-10" />
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl border-2 border-white/30">
            🏋️
          </div>
          <div>
            <h1 className="text-lg font-bold">运动达人</h1>
            <p className="text-sm text-white/80">ID: 270_88888</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">VIP 会员</span>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">Lv.12</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: '累计运动', value: '128', unit: 'h', icon: Flame, color: '#FF6B35' },
          { label: '消耗热量', value: '45.6k', unit: 'kcal', icon: TrendingUp, color: '#4ECDC4' },
          { label: '连续天数', value: '27', unit: '天', icon: Trophy, color: '#00F5A0' },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-2xl p-3 shadow-sm text-center">
              <Icon size={18} style={{ color: stat.color }} className="mx-auto" />
              <div className="mt-1">
                <span className="text-lg font-bold" style={{ color: stat.color }}>{stat.value}</span>
                <span className="text-[10px] text-gray-400 ml-0.5">{stat.unit}</span>
              </div>
              <p className="text-[10px] text-gray-400">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-5">
        {(['stats', 'achievements'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab
                ? 'bg-white text-[#1A1A2E] shadow-sm'
                : 'text-gray-500'
            }`}
          >
            {tab === 'stats' ? '运动数据' : '我的成就'}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'stats' ? (
        <div className="space-y-3 mb-5">
          {/* Recent Activity */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="font-semibold text-[#1A1A2E] mb-3">最近活动</h3>
            <div className="space-y-3">
              {[
                { date: '今天', activity: 'HIIT 训练', duration: '30 min', calories: '350 kcal' },
                { date: '昨天', activity: '晨跑 5km', duration: '28 min', calories: '320 kcal' },
                { date: '2天前', activity: '瑜伽课', duration: '45 min', calories: '180 kcal' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50">
                  <div className="w-8 h-8 rounded-full bg-[#FF6B35]/10 flex items-center justify-center">
                    <Flame size={14} className="text-[#FF6B35]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#1A1A2E]">{item.activity}</p>
                    <p className="text-[11px] text-gray-400">{item.date} · {item.duration}</p>
                  </div>
                  <span className="text-xs text-[#FF6B35] font-medium">{item.calories}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Body Data */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="font-semibold text-[#1A1A2E] mb-3">身体数据</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: '身高', value: '175 cm' },
                { label: '体重', value: '70 kg' },
                { label: 'BMI', value: '22.9', highlight: true },
                { label: '体脂率', value: '18.5%' },
              ].map((item) => (
                <div key={item.label} className="bg-gray-50 rounded-xl p-3">
                  <p className="text-[11px] text-gray-400">{item.label}</p>
                  <p className={`text-lg font-bold ${item.highlight ? 'text-[#00F5A0]' : 'text-[#1A1A2E]'}`}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3 mb-5">
          {achievements.map((ach, i) => (
            <div
              key={i}
              className={`bg-white rounded-2xl p-3 shadow-sm text-center transition-all ${
                ach.unlocked ? '' : 'opacity-40 grayscale'
              }`}
            >
              <div className="text-2xl mb-1">{ach.icon}</div>
              <p className="text-[11px] font-medium text-[#1A1A2E]">{ach.title}</p>
              <p className="text-[9px] text-gray-400 mt-0.5">{ach.desc}</p>
            </div>
          ))}
        </div>
      )}

      {/* Menu Items */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
        {menuItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-50 last:border-b-0"
            >
              <Icon size={18} className="text-gray-500" />
              <div className="flex-1">
                <p className="text-sm font-medium text-[#1A1A2E]">{item.label}</p>
                <p className="text-[11px] text-gray-400">{item.desc}</p>
              </div>
              {item.badge && (
                <span className="text-[10px] bg-[#FF6B35]/10 text-[#FF6B35] px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
              <ChevronRight size={16} className="text-gray-300" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
