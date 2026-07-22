'use client';

import { useState, useEffect } from 'react';
import {
  Flame,
  TrendingUp,
  Clock,
  ChevronRight,
  Zap,
  Target,
  Award,
  Play,
} from 'lucide-react';

const quickStats = [
  { label: '今日消耗', value: '486', unit: 'kcal', icon: Flame, color: '#FF6B35' },
  { label: '运动时长', value: '45', unit: 'min', icon: Clock, color: '#4ECDC4' },
  { label: '完成目标', value: '72', unit: '%', icon: Target, color: '#00F5A0' },
];

const todayPlan = [
  { time: '07:00', title: '晨跑 30 分钟', type: '有氧', done: true },
  { time: '12:30', title: '力量训练 - 上肢', type: '力量', done: false },
  { time: '18:00', title: '瑜伽放松 20 分钟', type: '柔韧', done: false },
];

const hotCourses = [
  { id: 1, title: 'HIIT 燃脂训练', instructor: '李教练', duration: '30 min', level: '中级', image: '🔥' },
  { id: 2, title: '核心力量强化', instructor: '王教练', duration: '25 min', level: '初级', image: '💪' },
  { id: 3, title: '拉伸放松指南', instructor: '张教练', duration: '20 min', level: '全级别', image: '🧘' },
];

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="px-4 pt-6 animate-float-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A2E]">
            Hi，运动达人
          </h1>
          <p className="text-sm text-gray-500 mt-1">今天也要元气满满哦</p>
        </div>
        <div className="w-10 h-10 rounded-full brand-gradient flex items-center justify-center text-white font-bold text-sm">
          270
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {quickStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-2xl p-3 shadow-sm hover:shadow-md transition-shadow"
            >
              <Icon size={18} style={{ color: stat.color }} />
              <div className="mt-2">
                <span className="text-xl font-bold" style={{ color: stat.color }}>
                  {stat.value}
                </span>
                <span className="text-xs text-gray-400 ml-0.5">{stat.unit}</span>
              </div>
              <p className="text-[11px] text-gray-400 mt-0.5">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Weekly Progress */}
      <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-[#1A1A2E]">本周进度</h2>
          <span className="text-xs text-[#FF6B35] flex items-center gap-0.5">
            <TrendingUp size={14} /> 较上周 +15%
          </span>
        </div>
        <div className="flex items-end gap-2 h-20">
          {['一', '二', '三', '四', '五', '六', '日'].map((day, i) => {
            const heights = [60, 80, 45, 90, 70, 30, 0];
            const isToday = i === 4;
            return (
              <div key={day} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className={`w-full rounded-t-md transition-all ${
                    isToday ? 'brand-gradient' : 'bg-gray-100'
                  }`}
                  style={{ height: `${heights[i]}%` }}
                />
                <span className={`text-[10px] ${isToday ? 'text-[#FF6B35] font-semibold' : 'text-gray-400'}`}>
                  {day}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Today Plan */}
      <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-[#1A1A2E]">今日计划</h2>
          <ChevronRight size={16} className="text-gray-400" />
        </div>
        <div className="space-y-3">
          {todayPlan.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                item.done
                  ? 'bg-[#00F5A0]/20 text-[#00F5A0]'
                  : 'bg-[#FF6B35]/10 text-[#FF6B35]'
              }`}>
                {item.done ? '✓' : <Zap size={14} />}
              </div>
              <div className="flex-1">
                <p className={`text-sm font-medium ${item.done ? 'text-gray-400 line-through' : 'text-[#1A1A2E]'}`}>
                  {item.title}
                </p>
                <p className="text-[11px] text-gray-400">{item.time} · {item.type}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hot Courses */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-[#1A1A2E]">热门课程</h2>
          <Link href="/courses" className="text-xs text-[#FF6B35] flex items-center gap-0.5">
            查看全部 <ChevronRight size={14} />
          </Link>
        </div>
        <div className="space-y-3">
          {hotCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 flex items-center gap-4"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center text-2xl">
                {course.image}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-[#1A1A2E] truncate">{course.title}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{course.instructor} · {course.duration}</p>
                <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full bg-[#FF6B35]/10 text-[#FF6B35]">
                  {course.level}
                </span>
              </div>
              <button className="w-8 h-8 rounded-full brand-gradient flex items-center justify-center text-white shadow-sm">
                <Play size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Achievement Badge */}
      <div className="bg-gradient-to-r from-[#FF6B35] to-[#FF8F65] rounded-2xl p-4 text-white mb-6 animate-pulse-glow">
        <div className="flex items-center gap-3">
          <Award size={32} />
          <div>
            <p className="font-bold">连续运动 7 天!</p>
            <p className="text-sm text-white/80">再坚持 3 天解锁新成就</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Link({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  return <a href={href} className={className}>{children}</a>;
}
