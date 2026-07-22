'use client';

import Link from 'next/link';
import { ArrowDown, ArrowRight, Star } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { useEffect, useState } from 'react';

const courses = [
  { name: '普拉提核心床', desc: '精准控制，深层塑形', img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80' },
  { name: '瑜伽系列', desc: '身心合一，柔韧力量', img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80' },
  { name: '女性力量训练', desc: '科学增肌，自信绽放', img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80' },
];

const coaches = [
  { name: '林悦', title: '普拉提导师', exp: '8年教学经验', img: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&q=80' },
  { name: '陈雨桐', title: '瑜伽导师', exp: '6年教学经验', img: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=400&q=80' },
  { name: '王思琪', title: '力量训练专家', exp: '5年教学经验', img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80' },
];

const testimonials = [
  { name: '张女士', age: 32, text: '在270的半年，不仅瘦了15斤，更重要的是找到了自信。这里的教练真的懂女性身体。', rating: 5 },
  { name: '李女士', age: 28, text: '产后修复选了270，专业度和私密性让我很安心。现在体态比怀孕前还好。', rating: 5 },
  { name: '陈女士', age: 35, text: '从零基础到现在能完成高难度动作，270让我相信年龄只是数字。', rating: 5 },
];

const stats = [
  { value: '1000+', label: '核心会员' },
  { value: '68%', label: '月度续费率' },
  { value: '10W+', label: '服务人次' },
  { value: '2022', label: '创立至今' },
];

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      {/* ===== Section 1: Hero ===== */}
      <section className="relative h-screen min-h-[600px] overflow-hidden">
        {/* Background Image with Parallax */}
        <div
          className="absolute inset-0 parallax-hero"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <img
            src="https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1920&q=80"
            alt="270运动馆"
            className="w-full h-[120%] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-end h-full pb-24 md:pb-32 px-5 md:px-10">
          <div className="mx-auto max-w-[1240px] w-full">
            <div className="max-w-2xl">
              <p className="text-white/70 text-[13px] font-medium tracking-[0.2em] uppercase mb-4">
                Beauty Cycle 270
              </p>
              <h1
                className="text-white text-[44px] md:text-[80px] font-black leading-[0.95] tracking-[-0.025em] mb-6"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                270
              </h1>
              <p className="text-white/90 text-[20px] md:text-[28px] font-medium leading-tight mb-3">
                她的运动美学
              </p>
              <p className="text-white/60 text-[15px] md:text-[17px] mb-8 max-w-md">
                安全 · 私密 · 无评判 · 高适配
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/courses" className="btn-primary inline-flex items-center justify-center h-[52px] px-7 text-[16px] font-medium">
                  预约体验课
                </Link>
                <Link href="/about" className="inline-flex items-center justify-center h-[52px] px-7 text-[16px] font-medium text-white border border-white/30 rounded-lg hover:bg-white/10 transition-colors">
                  了解更多
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
          <ArrowDown size={20} className="text-white/50" />
        </div>
      </section>

      {/* ===== Section 2: Brand Story ===== */}
      <section className="py-32 md:py-40 px-5 md:px-10 bg-cream">
        <div className="mx-auto max-w-[1240px]">
          <Reveal>
            <p className="text-[12px] font-semibold tracking-[0.2em] uppercase text-gray-400 mb-4">
              Our Story
            </p>
            <h2 className="text-[30px] md:text-[56px] font-bold text-gray-900 leading-[1.05] tracking-[-0.02em] mb-8 max-w-3xl">
              关于270运动馆
            </h2>
          </Reveal>

          <Reveal delay={1}>
            <p className="text-[17px] md:text-[19px] text-gray-600 leading-[1.7] max-w-2xl mb-16">
              270运动馆由徐宁于2022年在福州创立，专注于为女性提供安全、私密、无评判的运动空间。
              我们相信，每一位女性都值得拥有属于自己的运动美学——不是追求极致的肌肉线条，
              而是找到身体与心灵的平衡。2026年初完成种子轮融资，投后估值500万。
            </p>
          </Reveal>

          {/* Stats */}
          <Reveal delay={2}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center md:text-left">
                  <p
                    className="text-[36px] md:text-[48px] font-bold text-gray-900 leading-none mb-2"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-[14px] text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== Section 3: Courses ===== */}
      <section className="py-32 md:py-40 px-5 md:px-10 bg-white">
        <div className="mx-auto max-w-[1240px]">
          <Reveal>
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-[12px] font-semibold tracking-[0.2em] uppercase text-gray-400 mb-4">
                  Courses
                </p>
                <h2 className="text-[30px] md:text-[40px] font-bold text-gray-900 leading-[1.1] tracking-[-0.02em]">
                  我们的课程
                </h2>
              </div>
              <Link href="/courses" className="hidden md:inline-flex items-center gap-1 text-[15px] text-gray-600 hover:text-gray-900 transition-colors">
                查看全部 <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {courses.map((course, i) => (
              <Reveal key={course.name} delay={i + 1}>
                <Link href="/courses" className="card group block overflow-hidden">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={course.img}
                      alt={course.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-[20px] font-semibold text-gray-900 mb-2">{course.name}</h3>
                    <p className="text-[15px] text-gray-500">{course.desc}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="mt-8 md:hidden">
            <Link href="/courses" className="btn-secondary flex items-center justify-center h-12 text-[15px] font-medium">
              查看全部课程
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Section 4: Coaches ===== */}
      <section className="py-32 md:py-40 px-5 md:px-10 bg-cream">
        <div className="mx-auto max-w-[1240px]">
          <Reveal>
            <p className="text-[12px] font-semibold tracking-[0.2em] uppercase text-gray-400 mb-4">
              Our Coaches
            </p>
            <h2 className="text-[30px] md:text-[40px] font-bold text-gray-900 leading-[1.1] tracking-[-0.02em] mb-12">
              专业教练团队
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {coaches.map((coach, i) => (
              <Reveal key={coach.name} delay={i + 1}>
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-5 rounded-full overflow-hidden border-2 border-gray-100">
                    <img src={coach.img} alt={coach.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-[18px] font-semibold text-gray-900 mb-1">{coach.name}</h3>
                  <p className="text-[14px] text-gray-500 mb-1">{coach.title}</p>
                  <p className="text-[13px] text-gray-400">{coach.exp}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Section 5: Testimonials ===== */}
      <section className="py-32 md:py-40 px-5 md:px-10 bg-white">
        <div className="mx-auto max-w-[1240px]">
          <Reveal>
            <p className="text-[12px] font-semibold tracking-[0.2em] uppercase text-gray-400 mb-4">
              Testimonials
            </p>
            <h2 className="text-[30px] md:text-[40px] font-bold text-gray-900 leading-[1.1] tracking-[-0.02em] mb-12">
              她们的改变
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i + 1}>
                <div className="card p-8">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={14} className="fill-gray-800 text-gray-800" />
                    ))}
                  </div>
                  <p className="text-[16px] text-gray-700 leading-[1.7] mb-6">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div>
                    <p className="text-[15px] font-medium text-gray-900">{t.name}</p>
                    <p className="text-[13px] text-gray-400">{t.age}岁</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Section 6: CTA ===== */}
      <section className="relative py-32 md:py-40 px-5 md:px-10 noise-overlay overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #1F1E1C 0%, #181817 100%)' }}
      >
        {/* Orange glow */}
        <div
          className="absolute top-0 left-[20%] w-[600px] h-[400px] opacity-30 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(196,90,44,0.2), transparent 60%)' }}
        />

        <div className="relative z-10 mx-auto max-w-[1240px] text-center">
          <Reveal>
            <p className="text-[12px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-4">
              Join Us
            </p>
            <h2 className="text-[30px] md:text-[56px] font-bold text-white leading-[1.05] tracking-[-0.02em] mb-6">
              开启你的运动美学之旅
            </h2>
            <p className="text-[17px] text-gray-400 mb-10 max-w-lg mx-auto">
              加入270运动馆，与1000+女性一起，找到属于自己的运动节奏
            </p>
            <Link href="/vip" className="btn-primary inline-flex items-center justify-center h-[52px] px-8 text-[16px] font-medium">
              立即加入会员
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="bg-gray-900 border-t border-gray-800 px-5 md:px-10 py-16">
        <div className="mx-auto max-w-[1240px]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <p className="text-xl font-black text-white mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                270
              </p>
              <p className="text-[13px] text-gray-500 mb-4">BEAUTY CYCLE 270</p>
              <p className="text-[13px] text-gray-500">福州坤成体育发展有限公司</p>
            </div>
            <div>
              <p className="text-[13px] font-semibold text-gray-400 uppercase tracking-wider mb-4">导航</p>
              <div className="space-y-2.5">
                {['首页', '课程', '商城', '关于我们'].map((item) => (
                  <Link key={item} href={item === '首页' ? '/' : `/${item === '关于我们' ? 'about' : item.toLowerCase()}`} className="block text-[14px] text-gray-500 hover:text-white transition-colors">
                    {item}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[13px] font-semibold text-gray-400 uppercase tracking-wider mb-4">服务</p>
              <div className="space-y-2.5">
                {['会员中心', '健康生活', '登录注册'].map((item) => (
                  <Link key={item} href={item === '会员中心' ? '/vip' : item === '健康生活' ? '/lifestyle' : '/login'} className="block text-[14px] text-gray-500 hover:text-white transition-colors">
                    {item}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[13px] font-semibold text-gray-400 uppercase tracking-wider mb-4">联系</p>
              <div className="space-y-2.5 text-[14px] text-gray-500">
                <p>福州市鼓楼区</p>
                <p>contact@270fitness.com</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[12px] text-gray-600">
              &copy; 2024 270运动馆 BEAUTY CYCLE 270. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/ai" className="text-[12px] text-gray-600 hover:text-gray-400 transition-colors">AI 中台</Link>
              <Link href="/admin" className="text-[12px] text-gray-600 hover:text-gray-400 transition-colors">管理后台</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
