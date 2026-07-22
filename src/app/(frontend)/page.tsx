"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Search, Bell, ChevronDown, Star, Heart, Clock, MapPin,
  Users, Award, Sparkles, ArrowRight, Play, ChevronLeft,
  ChevronRight, Instagram, MessageCircle, Phone, Mail,
  Dumbbell, Flower2, Baby, Activity, Crown, Check
} from "lucide-react";

// ==================== Data ====================
const banners = [
  {
    title: "BEAUTY CYCLE 270",
    subtitle: "她的运动美学",
    tagline: "安全 · 私密 · 无评判 · 高适配",
    cta: "预约体验课",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
  },
  {
    title: "春季焕新计划",
    subtitle: "会员专享 8 折优惠",
    tagline: "开启你的美丽蜕变之旅",
    cta: "立即加入",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
  },
  {
    title: "普拉提核心床",
    subtitle: "全新课程上线",
    tagline: "重塑体态 从核心开始",
    cta: "了解详情",
    image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800&q=80",
  },
];

const quickEntries = [
  { icon: Dumbbell, label: "预约课程", color: "#D4859B", href: "/courses" },
  { icon: Star, label: "私教服务", color: "#F5A89A", href: "/courses" },
  { icon: Crown, label: "会员中心", color: "#C9A96E", href: "/vip" },
  { icon: Sparkles, label: "精选商城", color: "#A8D5BA", href: "/mall" },
];

const courses = [
  { icon: "🩰", name: "普拉提核心床", desc: "精准激活深层肌肉，重塑身体线条", count: "12节课/周" },
  { icon: "🧘‍♀️", name: "瑜伽系列", desc: "流瑜伽、阴瑜伽、修复瑜伽全覆盖", count: "8节课/周" },
  { icon: "💪", name: "女性力量训练", desc: "专为女性设计的力量塑造课程", count: "6节课/周" },
  { icon: "🤰", name: "孕产修复", desc: "孕期安全运动与产后恢复训练", count: "4节课/周" },
  { icon: "✨", name: "体态管理", desc: "改善圆肩驼背，提升气质体态", count: "5节课/周" },
];

const coaches = [
  { name: "林悦", title: "高级普拉提导师", exp: "8年教学经验", specialty: "普拉提/体态矫正", avatar: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=200&q=80" },
  { name: "苏晴", title: "瑜伽主教练", exp: "6年教学经验", specialty: "流瑜伽/阴瑜伽", avatar: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&q=80" },
  { name: "陈雨桐", title: "孕产修复专家", exp: "10年教学经验", specialty: "孕产修复/康复训练", avatar: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=200&q=80" },
  { name: "张诗涵", title: "力量训练教练", exp: "5年教学经验", specialty: "女性力量/塑形", avatar: "https://images.unsplash.com/photo-1567013127542-490d483f9e30?w=200&q=80" },
];

const stories = [
  { name: "小雨", age: 28, result: "减重12kg，体态明显改善", quote: "在270，我找到了适合自己的运动方式。教练很专业，环境也很舒服，每次来都觉得很放松。", avatar: "https://images.unsplash.com/photo-1438761681033-64697f97b067?w=150&q=80" },
  { name: "Linda", age: 35, result: "产后修复，重拾自信", quote: "生完宝宝后一直对自己没信心，在270的孕产修复课程帮我找回了状态，教练特别温柔耐心。", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80" },
  { name: "陈女士", age: 42, result: "改善圆肩驼背，气质提升", quote: "体态管理课程让我整个人都挺拔了很多，朋友都说我变年轻了。270的氛围真的很好。", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&q=80" },
];

const vipPlans = [
  { name: "月卡", price: "599", unit: "元/月", features: ["全课程预约", "基础体测", "更衣室使用"], popular: false },
  { name: "季卡", price: "1,499", unit: "元/季", features: ["全课程预约", "月度体测", "9折商城优惠", "1次私教体验"], popular: true },
  { name: "年卡", price: "4,999", unit: "元/年", features: ["全课程预约", "周度体测", "8折商城优惠", "4次私教课", "专属储物柜", "会员专属活动"], popular: false },
];

// ==================== Component ====================
export default function HomePage() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [coachScroll, setCoachScroll] = useState(0);

  const nextBanner = useCallback(() => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextBanner, 4000);
    return () => clearInterval(timer);
  }, [nextBanner]);

  return (
    <div className="min-h-screen bg-[#FDF5F0] pb-20">
      {/* ===== Hero Banner ===== */}
      <section className="relative h-[520px] overflow-hidden">
        {banners.map((banner, index) => (
          <div
            key={index}
            className="absolute inset-0 transition-opacity duration-700 ease-in-out"
            style={{ opacity: currentBanner === index ? 1 : 0 }}
          >
            <div className="absolute inset-0">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#3A2E2A]/60 via-[#3A2E2A]/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3A2E2A]/40 to-transparent" />
            </div>
            <div className="relative h-full flex flex-col justify-center px-8 max-w-[480px] mx-auto">
              <div className="animate-float-up" style={{ animationDelay: `${currentBanner === index ? 0.2 : 0}s` }}>
                <p className="text-white/80 text-xs tracking-[0.3em] uppercase mb-3 font-light">
                  {banner.tagline}
                </p>
                <h1 className="text-white text-[32px] font-serif leading-tight mb-2 tracking-wide">
                  {banner.title}
                </h1>
                <p className="text-white/90 text-lg font-light mb-6">
                  {banner.subtitle}
                </p>
                <div className="flex gap-3">
                  <button className="px-6 py-3 bg-[#F5A89A] text-white rounded-full text-sm font-medium hover:bg-[#e8977f] transition-all duration-300 shadow-lg shadow-[#F5A89A]/30">
                    {banner.cta}
                  </button>
                  <button className="px-6 py-3 bg-white/15 text-white rounded-full text-sm font-light backdrop-blur-sm border border-white/20 hover:bg-white/25 transition-all duration-300">
                    了解更多
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Banner indicators */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={`h-1 rounded-full transition-all duration-300 ${
                currentBanner === index
                  ? "w-6 bg-white"
                  : "w-2 bg-white/40"
              }`}
            />
          ))}
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-pulse-soft">
          <span className="text-white/50 text-[10px]">向下滑动</span>
          <ChevronDown className="w-4 h-4 text-white/50" />
        </div>
      </section>

      {/* ===== Quick Entries ===== */}
      <section className="px-6 -mt-6 relative z-10 max-w-[480px] mx-auto">
        <div className="glass rounded-[20px] p-4 shadow-lg shadow-[#D4859B]/5">
          <div className="grid grid-cols-4 gap-2">
            {quickEntries.map((entry, index) => (
              <Link
                key={index}
                href={entry.href}
                className="flex flex-col items-center gap-2 py-3 rounded-[16px] hover:bg-white/60 transition-all duration-300"
              >
                <div
                  className="w-11 h-11 rounded-[14px] flex items-center justify-center"
                  style={{ backgroundColor: `${entry.color}15` }}
                >
                  <entry.icon className="w-5 h-5" style={{ color: entry.color }} />
                </div>
                <span className="text-xs text-[#3A2E2A] font-medium">{entry.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== About / Brand Story ===== */}
      <section className="px-6 pt-16 pb-12 max-w-[480px] mx-auto">
        <div className="text-center mb-8">
          <p className="text-[#D4859B] text-xs tracking-[0.2em] uppercase mb-2">About Us</p>
          <h2 className="text-[#3A2E2A] text-2xl font-serif mb-3">关于 270 运动馆</h2>
          <div className="w-12 h-[2px] bg-gradient-to-r from-[#D4859B] to-[#E8A0B5] mx-auto rounded-full" />
        </div>

        <div className="mb-8">
          <p className="text-[#7A6B66] text-sm leading-relaxed text-center">
            270运动馆由徐宁于2022年在福州创立，是一家专注于女性运动的精品工作室。
            我们相信，每一位女性都值得拥有一个安全、私密、无评判的运动空间。
            在这里，运动不是任务，而是一种生活方式。
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { value: "1000+", label: "核心会员" },
            { value: "68%", label: "月度续费率" },
            { value: "10W+", label: "服务人次" },
            { value: "2022", label: "创立至今" },
          ].map((stat, index) => (
            <div key={index} className="text-center py-4 rounded-[16px] bg-white shadow-sm shadow-[#D4859B]/5">
              <div className="text-xl font-serif text-[#D4859B] mb-1">{stat.value}</div>
              <div className="text-[10px] text-[#7A6B66]">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Courses ===== */}
      <section className="px-6 py-12 bg-white/50 max-w-[480px] mx-auto">
        <div className="text-center mb-8">
          <p className="text-[#D4859B] text-xs tracking-[0.2em] uppercase mb-2">Our Courses</p>
          <h2 className="text-[#3A2E2A] text-2xl font-serif mb-3">我们的课程</h2>
          <div className="w-12 h-[2px] bg-gradient-to-r from-[#D4859B] to-[#E8A0B5] mx-auto rounded-full" />
        </div>

        <div className="space-y-3">
          {courses.map((course, index) => (
            <Link
              key={index}
              href="/courses"
              className="flex items-center gap-4 p-4 bg-white rounded-[20px] shadow-sm shadow-[#D4859B]/5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-[16px] bg-[#FDF0F0] flex items-center justify-center text-2xl flex-shrink-0">
                {course.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[#3A2E2A] text-base font-medium mb-1">{course.name}</h3>
                <p className="text-[#7A6B66] text-xs truncate">{course.desc}</p>
                <p className="text-[#D4859B] text-[10px] mt-1">{course.count}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-[#D4859B]/40 group-hover:text-[#D4859B] group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
            </Link>
          ))}
        </div>

        <Link
          href="/courses"
          className="block text-center mt-6 text-sm text-[#D4859B] font-medium hover:text-[#c4748a] transition-colors"
        >
          查看全部课程 →
        </Link>
      </section>

      {/* ===== Coaches ===== */}
      <section className="px-6 py-12 max-w-[480px] mx-auto">
        <div className="text-center mb-8">
          <p className="text-[#D4859B] text-xs tracking-[0.2em] uppercase mb-2">Our Team</p>
          <h2 className="text-[#3A2E2A] text-2xl font-serif mb-3">专业教练团队</h2>
          <div className="w-12 h-[2px] bg-gradient-to-r from-[#D4859B] to-[#E8A0B5] mx-auto rounded-full" />
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-6 px-6 snap-x snap-mandatory">
          {coaches.map((coach, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[200px] snap-center bg-white rounded-[20px] p-4 shadow-sm shadow-[#D4859B]/5 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-20 h-20 rounded-full mx-auto mb-3 overflow-hidden ring-2 ring-[#F5D5DE] ring-offset-2">
                <img
                  src={coach.avatar}
                  alt={coach.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-[#3A2E2A] text-base font-medium text-center mb-1">{coach.name}</h3>
              <p className="text-[#D4859B] text-xs text-center mb-2">{coach.title}</p>
              <div className="space-y-1">
                <p className="text-[#7A6B66] text-[10px] text-center">{coach.specialty}</p>
                <p className="text-[#7A6B66] text-[10px] text-center">{coach.exp}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Member Stories ===== */}
      <section className="px-6 py-12 bg-white/50 max-w-[480px] mx-auto">
        <div className="text-center mb-8">
          <p className="text-[#D4859B] text-xs tracking-[0.2em] uppercase mb-2">Their Stories</p>
          <h2 className="text-[#3A2E2A] text-2xl font-serif mb-3">她们的改变</h2>
          <div className="w-12 h-[2px] bg-gradient-to-r from-[#D4859B] to-[#E8A0B5] mx-auto rounded-full" />
        </div>

        <div className="space-y-4">
          {stories.map((story, index) => (
            <div
              key={index}
              className="bg-white rounded-[20px] p-5 shadow-sm shadow-[#D4859B]/5"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <img src={story.avatar} alt={story.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-[#3A2E2A] text-sm font-medium">{story.name}，{story.age}岁</h4>
                  <p className="text-[#D4859B] text-xs">{story.result}</p>
                </div>
              </div>
              <p className="text-[#7A6B66] text-sm leading-relaxed italic">
                &ldquo;{story.quote}&rdquo;
              </p>
              <div className="flex gap-0.5 mt-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3 h-3 fill-[#C9A96E] text-[#C9A96E]" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== VIP Section ===== */}
      <section className="px-6 py-12 max-w-[480px] mx-auto">
        <div className="text-center mb-8">
          <p className="text-[#C9A96E] text-xs tracking-[0.2em] uppercase mb-2">Membership</p>
          <h2 className="text-[#3A2E2A] text-2xl font-serif mb-3">加入 270 会员</h2>
          <div className="w-12 h-[2px] bg-gradient-to-r from-[#C9A96E] to-[#E0C992] mx-auto rounded-full" />
        </div>

        <div className="space-y-3">
          {vipPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-[20px] p-5 transition-all duration-300 ${
                plan.popular
                  ? "bg-gradient-to-br from-[#3A2E2A] to-[#4A3E52] text-white shadow-lg shadow-[#C9A96E]/20"
                  : "bg-white shadow-sm shadow-[#D4859B]/5"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-3 right-3 px-2 py-0.5 bg-[#C9A96E] text-white text-[10px] rounded-full">
                  推荐
                </div>
              )}
              <div className="flex items-center justify-between mb-3">
                <h3 className={`text-lg font-medium ${plan.popular ? "text-white" : "text-[#3A2E2A]"}`}>
                  {plan.name}
                </h3>
                <div className="text-right">
                  <span className={`text-2xl font-serif ${plan.popular ? "text-[#E0C992]" : "text-[#D4859B]"}`}>
                    ¥{plan.price}
                  </span>
                  <span className={`text-xs ml-1 ${plan.popular ? "text-white/60" : "text-[#7A6B66]"}`}>
                    /{plan.unit.replace("元/", "")}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {plan.features.map((feature, fi) => (
                  <span
                    key={fi}
                    className={`flex items-center gap-1 text-xs ${
                      plan.popular ? "text-white/80" : "text-[#7A6B66]"
                    }`}
                  >
                    <Check className="w-3 h-3" style={{ color: plan.popular ? "#E0C992" : "#A8D5BA" }} />
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Link href="/vip">
          <button className="w-full mt-6 py-3.5 bg-gradient-to-r from-[#C9A96E] to-[#E0C992] text-white rounded-full text-sm font-medium shadow-lg shadow-[#C9A96E]/20 hover:shadow-xl hover:shadow-[#C9A96E]/30 transition-all duration-300">
            立即开通会员
          </button>
        </Link>
      </section>

      {/* ===== Contact / Location ===== */}
      <section className="px-6 py-12 bg-white/50 max-w-[480px] mx-auto">
        <div className="text-center mb-8">
          <p className="text-[#D4859B] text-xs tracking-[0.2em] uppercase mb-2">Find Us</p>
          <h2 className="text-[#3A2E2A] text-2xl font-serif mb-3">找到我们</h2>
          <div className="w-12 h-[2px] bg-gradient-to-r from-[#D4859B] to-[#E8A0B5] mx-auto rounded-full" />
        </div>

        <div className="bg-white rounded-[20px] p-5 shadow-sm shadow-[#D4859B]/5">
          <div className="w-full h-32 rounded-[16px] bg-gradient-to-br from-[#FDF0F0] to-[#F5D5DE] flex items-center justify-center mb-4">
            <MapPin className="w-8 h-8 text-[#D4859B]" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#FDF0F0] flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-[#D4859B]" />
              </div>
              <div>
                <p className="text-[#3A2E2A] text-sm font-medium">门店地址</p>
                <p className="text-[#7A6B66] text-xs">福州市鼓楼区五四路162号新华福广场2层</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#FDF0F0] flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 text-[#D4859B]" />
              </div>
              <div>
                <p className="text-[#3A2E2A] text-sm font-medium">营业时间</p>
                <p className="text-[#7A6B66] text-xs">周一至周日 9:00 - 21:00</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#FDF0F0] flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4 text-[#D4859B]" />
              </div>
              <div>
                <p className="text-[#3A2E2A] text-sm font-medium">联系电话</p>
                <p className="text-[#7A6B66] text-xs">0591-8888-6270</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="px-6 pt-12 pb-8 max-w-[480px] mx-auto">
        <div className="text-center mb-6">
          <div className="mb-3">
            <span className="text-2xl font-serif text-[#D4859B]">270</span>
            <p className="text-[10px] text-[#7A6B66] tracking-[0.2em] mt-0.5">BEAUTY CYCLE 270</p>
          </div>
          <p className="text-[#7A6B66] text-xs mb-4">她的运动美学</p>
          <div className="flex justify-center gap-4 mb-6">
            <a href="#" className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center hover:shadow-md transition-all">
              <Instagram className="w-4 h-4 text-[#7A6B66]" />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center hover:shadow-md transition-all">
              <MessageCircle className="w-4 h-4 text-[#7A6B66]" />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center hover:shadow-md transition-all">
              <Phone className="w-4 h-4 text-[#7A6B66]" />
            </a>
          </div>
        </div>

        <div className="border-t border-[#F0E6E0] pt-4">
          <div className="flex justify-center gap-6 mb-4">
            <Link href="/" className="text-xs text-[#7A6B66] hover:text-[#D4859B] transition-colors">首页</Link>
            <Link href="/courses" className="text-xs text-[#7A6B66] hover:text-[#D4859B] transition-colors">课程</Link>
            <Link href="/mall" className="text-xs text-[#7A6B66] hover:text-[#D4859B] transition-colors">商城</Link>
            <Link href="/vip" className="text-xs text-[#7A6B66] hover:text-[#D4859B] transition-colors">会员</Link>
            <Link href="/profile" className="text-xs text-[#7A6B66] hover:text-[#D4859B] transition-colors">我的</Link>
          </div>
          <p className="text-center text-[10px] text-[#B8A8A4]">
            © 2024 270运动馆 BEAUTY CYCLE 270
          </p>
          <p className="text-center text-[10px] text-[#B8A8A4] mt-1">
            福州坤成体育发展有限公司
          </p>
        </div>
      </footer>
    </div>
  );
}
