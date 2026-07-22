'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Search,
  Bell,
  ChevronRight,
  Star,
  Users,
  Clock,
  Flame,
  Award,
  Heart,
  Sparkles,
  CalendarCheck,
  Dumbbell,
  ShoppingBag,
  Crown,
  Play,
} from 'lucide-react';

const banners = [
  { id: 1, title: 'BEAUTY CYCLE 270', subtitle: '她的运动美学', desc: '安全 · 私密 · 无评判 · 高适配', gradient: 'from-[#D4859B] to-[#E8A0B5]' },
  { id: 2, title: '春季焕新 私教8折', subtitle: '限时优惠', desc: '专业女性私教 · 一对一定制方案', gradient: 'from-[#F08080] to-[#E8A0B5]' },
  { id: 3, title: '普拉提新课上线', subtitle: '核心塑形', desc: '瑞士进口器械 · 小班精品教学', gradient: 'from-[#7EC8B7] to-[#A8DFD0]' },
];

const quickEntries = [
  { label: '预约课程', icon: CalendarCheck, href: '/courses', color: '#D4859B', bg: '#F5D5DE' },
  { label: '私教服务', icon: Sparkles, href: '/courses', color: '#F08080', bg: '#FDE8E8' },
  { label: '会员中心', icon: Crown, href: '/vip', color: '#B8A9C9', bg: '#EDE7F5' },
  { label: '商城', icon: ShoppingBag, href: '/mall', color: '#7EC8B7', bg: '#DFF3ED' },
];

const brandStats = [
  { value: '1000+', label: '核心会员' },
  { value: '68%', label: '月度续费率' },
  { value: '10W+', label: '累计服务女性' },
  { value: '3-5', label: '新增门店计划' },
];

const hotCourses = [
  { id: 1, title: '普拉提核心塑形', instructor: '陈教练', time: '周三 10:00', spots: 3, level: '全级别', emoji: '🌸' },
  { id: 2, title: '女性力量训练', instructor: '林教练', time: '周四 14:00', spots: 5, level: '初级', emoji: '💪' },
  { id: 3, title: '孕产修复瑜伽', instructor: '张教练', time: '周五 09:30', spots: 2, level: '专属', emoji: '🤰' },
];

const coaches = [
  { name: '陈雨萱', title: '普拉提导师', exp: '8年经验', specialty: '核心塑形/体态矫正', avatar: '👩‍🦰' },
  { name: '林小雅', title: '力量教练', exp: '6年经验', specialty: '女性力量/减脂塑形', avatar: '👩' },
  { name: '张诗涵', title: '瑜伽导师', exp: '10年经验', specialty: '孕产瑜伽/修复理疗', avatar: '🧘‍♀️' },
];

const memberStories = [
  { name: '小鹿', duration: '会员1年', change: '体态改善', quote: '在这里找到了属于自己的节奏，不再焦虑，享受每一次呼吸和伸展。', before: '含胸驼背', after: '体态挺拔' },
  { name: 'Amy', duration: '会员8个月', change: '产后修复', quote: '产后一直想恢复身材，张教练的孕产修复课程真的帮了我大忙！', before: '产后松弛', after: '核心恢复' },
];

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const nextBanner = useCallback(() => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const timer = setInterval(nextBanner, 4000);
    return () => clearInterval(timer);
  }, [mounted, nextBanner]);

  if (!mounted) return null;

  return (
    <div className="px-4 pt-4 animate-float-up">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-lg font-bold text-[#3A2E2A] tracking-wide">270<span className="text-[#D4859B]">运动馆</span></h1>
          <p className="text-[10px] text-[#8A7A74] tracking-widest">BEAUTY CYCLE 270</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center">
            <Search size={15} className="text-[#8A7A74]" />
          </button>
          <button className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center relative">
            <Bell size={15} className="text-[#8A7A74]" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#F08080]" />
          </button>
        </div>
      </div>

      {/* Banner Carousel */}
      <div className="relative rounded-3xl overflow-hidden mb-5 h-40">
        {banners.map((banner, i) => (
          <div
            key={banner.id}
            className={`absolute inset-0 bg-gradient-to-br ${banner.gradient} p-5 flex flex-col justify-center transition-opacity duration-700 ${
              i === currentBanner ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <p className="text-white/70 text-xs tracking-widest mb-1">{banner.subtitle}</p>
            <h2 className="text-white text-xl font-bold tracking-wider">{banner.title}</h2>
            <p className="text-white/80 text-xs mt-1.5">{banner.desc}</p>
            <button className="mt-3 bg-white/20 backdrop-blur-sm text-white text-xs px-4 py-1.5 rounded-full w-fit border border-white/30">
              了解更多
            </button>
          </div>
        ))}
        {/* Dots */}
        <div className="absolute bottom-3 right-3 flex gap-1.5">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentBanner(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === currentBanner ? 'w-4 bg-white' : 'w-1.5 bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Quick Entries */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {quickEntries.map((entry) => {
          const Icon = entry.icon;
          return (
            <a
              key={entry.label}
              href={entry.href}
              className="flex flex-col items-center gap-1.5 py-3 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: entry.bg }}>
                <Icon size={18} style={{ color: entry.color }} />
              </div>
              <span className="text-[11px] text-[#3A2E2A] font-medium">{entry.label}</span>
            </a>
          );
        })}
      </div>

      {/* Brand Story */}
      <div className="bg-white rounded-3xl p-5 shadow-sm mb-5">
        <div className="flex items-center gap-2 mb-3">
          <Heart size={16} className="text-[#D4859B]" />
          <h2 className="font-semibold text-[#3A2E2A]">关于 270运动馆</h2>
        </div>
        <p className="text-xs text-[#4A4A4A] leading-relaxed mb-4">
          270运动馆由徐宁于2022年在福州创立，专注为女性打造安全、私密、无评判的运动空间。
          2026年初完成种子轮融资，投后估值500万。我们相信每一位女性都值得被温柔以待。
        </p>
        <div className="grid grid-cols-4 gap-2">
          {brandStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-base font-bold brand-gradient-text">{stat.value}</p>
              <p className="text-[10px] text-[#8A7A74]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Hot Courses */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-[#3A2E2A]">热门课程</h2>
          <a href="/courses" className="text-xs text-[#D4859B] flex items-center gap-0.5">
            全部 <ChevronRight size={14} />
          </a>
        </div>
        <div className="space-y-3">
          {hotCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 flex items-center gap-3"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F5D5DE] to-[#FDF0F0] flex items-center justify-center text-2xl flex-shrink-0">
                {course.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-[#3A2E2A] truncate">{course.title}</h3>
                <p className="text-[11px] text-[#8A7A74] mt-0.5">{course.instructor} · {course.time}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#D4859B]/10 text-[#D4859B]">{course.level}</span>
                  <span className="text-[10px] text-[#F08080]">剩余 {course.spots} 位</span>
                </div>
              </div>
              <button className="w-9 h-9 rounded-full brand-gradient flex items-center justify-center text-white shadow-sm flex-shrink-0">
                <Play size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Coaches */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-[#3A2E2A]">明星教练</h2>
          <ChevronRight size={16} className="text-[#8A7A74]" />
        </div>
        <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
          {coaches.map((coach) => (
            <div key={coach.name} className="bg-white rounded-2xl p-4 shadow-sm min-w-[140px] flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F5D5DE] to-[#FDF0F0] flex items-center justify-center text-xl mx-auto mb-2">
                {coach.avatar}
              </div>
              <h3 className="text-sm font-semibold text-[#3A2E2A] text-center">{coach.name}</h3>
              <p className="text-[10px] text-[#D4859B] text-center mt-0.5">{coach.title}</p>
              <p className="text-[10px] text-[#8A7A74] text-center mt-1">{coach.specialty}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Member Stories */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-[#3A2E2A]">会员蜕变</h2>
          <ChevronRight size={16} className="text-[#8A7A74]" />
        </div>
        <div className="space-y-3">
          {memberStories.map((story) => (
            <div key={story.name} className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full brand-gradient flex items-center justify-center text-white text-xs font-bold">
                  {story.name[0]}
                </div>
                <div>
                  <p className="text-sm font-medium text-[#3A2E2A]">{story.name}</p>
                  <p className="text-[10px] text-[#8A7A74]">{story.duration} · {story.change}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F08080]/10 text-[#F08080]">{story.before}</span>
                <ChevronRight size={12} className="text-[#8A7A74]" />
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#7EC8B7]/10 text-[#7EC8B7]">{story.after}</span>
              </div>
              <p className="text-xs text-[#4A4A4A] leading-relaxed italic">&ldquo;{story.quote}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Brand */}
      <div className="text-center pb-4">
        <p className="text-[10px] text-[#B8A8A4] tracking-widest">BEAUTY CYCLE 270</p>
        <p className="text-[10px] text-[#B8A8A4] mt-0.5">福州坤成体育发展有限公司</p>
      </div>
    </div>
  );
}
