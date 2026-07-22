'use client';

import { useState } from 'react';
import {
  ChevronRight,
  Crown,
  Flame,
  Calendar,
  Heart,
  Bell,
  HelpCircle,
  Settings,
  TrendingUp,
  Trophy,
  Star,
  Target,
  Activity,
  ShoppingBag,
  Bookmark,
  LogOut,
  Scale,
} from 'lucide-react';

const menuItems = [
  { icon: Calendar, label: '我的课程', desc: '已预约 / 历史记录', badge: '2节待上', href: '#' },
  { icon: ShoppingBag, label: '我的订单', desc: '商城 / 课程 / 会员订单', badge: '', href: '#' },
  { icon: Bookmark, label: '我的收藏', desc: '收藏的课程和商品', badge: '12', href: '#' },
  { icon: Crown, label: '会员中心', desc: '金卡会员 · 2026-08-15到期', badge: '', href: '/vip' },
  { icon: Star, label: '我的积分', desc: '当前积分 2,680', badge: '2680', href: '#' },
  { icon: Scale, label: '身体数据', desc: '身高、体重、体脂记录', badge: '', href: '#' },
  { icon: Heart, label: '健康数据', desc: '心率、睡眠、经期', badge: '', href: '#' },
  { icon: Bell, label: '消息通知', desc: '课程提醒、系统消息', badge: '3', href: '#' },
  { icon: HelpCircle, label: '帮助中心', desc: '常见问题与反馈', badge: '', href: '#' },
  { icon: Settings, label: '设置', desc: '个人信息、账号安全', badge: '', href: '#' },
];

const achievements = [
  { icon: '🌸', title: '初次绽放', desc: '完成第一节课', unlocked: true },
  { icon: '🔥', title: '燃脂女神', desc: '累计消耗 10000 kcal', unlocked: true },
  { icon: '💪', title: '力量女王', desc: '完成 50 次训练', unlocked: true },
  { icon: '🧘', title: '身心平衡', desc: '连续 30 天瑜伽', unlocked: true },
  { icon: '👑', title: '钻石会员', desc: '升级钻石会员', unlocked: false },
  { icon: '🏆', title: '270冠军', desc: '完成270挑战赛', unlocked: false },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'stats' | 'achievements'>('stats');

  return (
    <div className="px-4 pt-6 animate-float-up">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-[#D4859B] to-[#E8A0B5] rounded-3xl p-5 text-white mb-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-36 h-36 bg-white/10 rounded-full -translate-y-12 translate-x-12" />
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full translate-y-8 -translate-x-8" />
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl border-2 border-white/30">
            🌸
          </div>
          <div>
            <h1 className="text-lg font-bold">小美</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                <Crown size={10} /> 金卡会员
              </span>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">Lv.12</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: '累计运动', value: '128', unit: '次', icon: Activity, color: '#D4859B' },
          { label: '消耗热量', value: '32.8k', unit: 'kcal', icon: Flame, color: '#F08080' },
          { label: '连续打卡', value: '27', unit: '天', icon: Trophy, color: '#7EC8B7' },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-2xl p-3 shadow-sm text-center">
              <Icon size={16} style={{ color: stat.color }} className="mx-auto" />
              <div className="mt-1">
                <span className="text-lg font-bold" style={{ color: stat.color }}>{stat.value}</span>
                <span className="text-[10px] text-[#8A7A74] ml-0.5">{stat.unit}</span>
              </div>
              <p className="text-[10px] text-[#8A7A74]">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[#FDF0F0] rounded-2xl p-1 mb-5">
        {(['stats', 'achievements'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all ${
              activeTab === tab
                ? 'bg-white text-[#3A2E2A] shadow-sm'
                : 'text-[#8A7A74]'
            }`}
          >
            {tab === 'stats' ? '运动数据' : '我的成就'}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'stats' ? (
        <div className="space-y-3 mb-5">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="font-semibold text-[#3A2E2A] text-sm mb-3">最近活动</h3>
            <div className="space-y-3">
              {[
                { date: '今天', activity: '普拉提核心塑形', duration: '60 min', calories: '280 kcal' },
                { date: '昨天', activity: '流瑜伽 · 晨光序列', duration: '60 min', calories: '180 kcal' },
                { date: '2天前', activity: '女性力量 · 蜜桃臀', duration: '60 min', calories: '320 kcal' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#FDF8F5]">
                  <div className="w-8 h-8 rounded-full bg-[#D4859B]/10 flex items-center justify-center">
                    <Flame size={14} className="text-[#D4859B]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#3A2E2A]">{item.activity}</p>
                    <p className="text-[11px] text-[#8A7A74]">{item.date} · {item.duration}</p>
                  </div>
                  <span className="text-xs text-[#D4859B] font-medium">{item.calories}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="font-semibold text-[#3A2E2A] text-sm mb-3">身体数据</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: '身高', value: '163 cm' },
                { label: '体重', value: '52 kg' },
                { label: 'BMI', value: '19.6', highlight: true },
                { label: '体脂率', value: '22.5%' },
              ].map((item) => (
                <div key={item.label} className="bg-[#FDF8F5] rounded-xl p-3">
                  <p className="text-[11px] text-[#8A7A74]">{item.label}</p>
                  <p className={`text-lg font-bold ${item.highlight ? 'text-[#7EC8B7]' : 'text-[#3A2E2A]'}`}>
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
              <p className="text-[11px] font-medium text-[#3A2E2A]">{ach.title}</p>
              <p className="text-[9px] text-[#8A7A74] mt-0.5">{ach.desc}</p>
            </div>
          ))}
        </div>
      )}

      {/* Menu Items */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
        {menuItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <a
              key={i}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3.5 hover:bg-[#FDF8F5] transition-colors border-b border-[#F0E6E0] last:border-b-0"
            >
              <Icon size={17} className="text-[#D4859B]" />
              <div className="flex-1">
                <p className="text-sm font-medium text-[#3A2E2A]">{item.label}</p>
                <p className="text-[11px] text-[#8A7A74]">{item.desc}</p>
              </div>
              {item.badge && (
                <span className="text-[10px] bg-[#D4859B]/10 text-[#D4859B] px-2 py-0.5 rounded-full font-medium">
                  {item.badge}
                </span>
              )}
              <ChevronRight size={14} className="text-[#D4859B]/40" />
            </a>
          );
        })}
      </div>
    </div>
  );
}
