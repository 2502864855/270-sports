'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, ArrowRight } from 'lucide-react';
import Reveal from '@/components/Reveal';

const banners = [
  { title: 'BEAUTY CYCLE', subtitle: '270', tagline: '她的运动美学', cta: '预约体验课' },
  { title: '安全 · 私密', subtitle: '无评判 · 高适配', tagline: '专为女性打造的运动空间', cta: '了解更多' },
];

const courses = [
  { name: '普拉提核心床', desc: '精准控制，重塑核心力量', img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80' },
  { name: '瑜伽系列', desc: '身心合一，找回内在平衡', img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80' },
  { name: '女性力量训练', desc: '科学塑形，释放内在力量', img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80' },
];

const stats = [
  { num: '1000+', label: '核心会员' },
  { num: '68%', label: '月度续费率' },
  { num: '10W+', label: '服务人次' },
  { num: '2022', label: '创立至今' },
];

const coaches = [
  { name: '林悦', title: '普拉提导师', exp: '8年经验', img: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&q=80' },
  { name: '苏晴', title: '瑜伽导师', exp: '6年经验', img: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=400&q=80' },
  { name: '陈雨桐', title: '力量训练教练', exp: '5年经验', img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80' },
];

export default function HomePage() {
  const [bannerIdx, setBannerIdx] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const t = setInterval(() => setBannerIdx((i) => (i + 1) % banners.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-screen w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[1500ms] ease-out"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1920&q=80)`,
            transform: visible ? 'scale(1)' : 'scale(1.05)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/60" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <p
            className="mb-4 text-sm tracking-[0.3em] uppercase opacity-80 transition-all duration-700"
            style={{ opacity: visible ? 0.8 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)' }}
          >
            BEAUTY CYCLE 270
          </p>
          <h1
            className="mb-2 text-[80px] font-bold leading-none tracking-tight transition-all duration-700 delay-100 sm:text-[120px]"
            style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)' }}
          >
            270
          </h1>
          <p
            className="mb-6 text-lg font-light tracking-wide opacity-90 transition-all duration-700 delay-200 sm:text-xl"
            style={{ opacity: visible ? 0.9 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)' }}
          >
            她的运动美学
          </p>
          <p
            className="mb-10 text-sm opacity-60 transition-all duration-700 delay-300"
            style={{ opacity: visible ? 0.6 : 0 }}
          >
            安全 · 私密 · 无评判 · 高适配
          </p>
          <Link
            href="/courses"
            className="rounded-full border border-white/80 bg-white/10 px-8 py-3 text-sm font-medium tracking-wide text-white backdrop-blur-sm transition-all hover:bg-white hover:text-[#1D1D1F]"
          >
            预约体验课
          </Link>
        </div>
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-6 w-6 text-white/60" />
        </div>
      </section>

      {/* Brand Statement */}
      <Reveal>
        <section className="px-6 py-32 sm:py-40">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-8 text-3xl font-bold tracking-tight text-[#1D1D1F] sm:text-5xl">
              关于270运动馆
            </h2>
            <p className="text-lg leading-relaxed text-[#86868B] sm:text-xl">
              270运动馆由徐宁于2022年在福州创立，是一个专为女性打造的运动空间。
              我们相信，每一位女性都值得拥有一个安全、私密、无评判的运动环境。
              在这里，运动不是惩罚身体，而是与自己对话的方式。
            </p>
          </div>
        </section>
      </Reveal>

      {/* Courses */}
      <Reveal>
        <section className="bg-[#F5F5F7] px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-4 text-center text-3xl font-bold tracking-tight text-[#1D1D1F] sm:text-5xl">
              我们的课程
            </h2>
            <p className="mb-16 text-center text-[#86868B]">
              专为女性设计的课程体系，科学、安全、高效
            </p>
            <div className="grid gap-6 sm:grid-cols-3">
              {courses.map((c) => (
                <Link
                  key={c.name}
                  href="/courses"
                  className="card-hover group cursor-pointer overflow-hidden rounded-2xl bg-white"
                >
                  <div className="img-zoom aspect-[4/3] overflow-hidden">
                    <img
                      src={c.img}
                      alt={c.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 text-xl font-semibold text-[#1D1D1F]">{c.name}</h3>
                    <p className="mb-4 text-sm text-[#86868B]">{c.desc}</p>
                    <span className="inline-flex items-center text-sm font-medium text-[#C45A2C]">
                      查看详情 <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Stats */}
      <Reveal>
        <section className="px-6 py-24 sm:py-32">
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="mb-2 text-4xl font-bold tracking-tight text-[#1D1D1F] sm:text-5xl">
                  {s.num}
                </div>
                <div className="text-sm text-[#86868B]">{s.label}</div>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Coaches */}
      <Reveal>
        <section className="bg-[#F5F5F7] px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-4 text-center text-3xl font-bold tracking-tight text-[#1D1D1F] sm:text-5xl">
              专业教练团队
            </h2>
            <p className="mb-16 text-center text-[#86868B]">
              每一位教练都经过严格筛选与专业培训
            </p>
            <div className="grid gap-8 sm:grid-cols-3">
              {coaches.map((c) => (
                <div key={c.name} className="card-hover text-center">
                  <div className="mx-auto mb-6 h-48 w-48 overflow-hidden rounded-full">
                    <img src={c.img} alt={c.name} className="h-full w-full object-cover" />
                  </div>
                  <h3 className="mb-1 text-lg font-semibold text-[#1D1D1F]">{c.name}</h3>
                  <p className="mb-1 text-sm text-[#C45A2C]">{c.title}</p>
                  <p className="text-sm text-[#86868B]">{c.exp}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* VIP Section */}
      <Reveal>
        <section className="bg-[#1D1D1F] px-6 py-24 text-white sm:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-5xl">
              加入270会员
            </h2>
            <p className="mb-12 text-lg text-white/60">
              专属课程、优先预约、会员折扣、积分兑换——更多权益，为你而来
            </p>
            <div className="mb-12 grid gap-4 sm:grid-cols-3">
              {[
                { plan: '月卡', price: '¥699', unit: '/月' },
                { plan: '季卡', price: '¥1,799', unit: '/季', badge: true },
                { plan: '年卡', price: '¥5,999', unit: '/年' },
              ].map((m) => (
                <div
                  key={m.plan}
                  className={`card-hover rounded-2xl border p-6 transition-colors ${
                    m.badge
                      ? 'border-[#C45A2C] bg-[#C45A2C]/10'
                      : 'border-white/10 bg-white/5'
                  }`}
                >
                  {m.badge && (
                    <span className="mb-2 inline-block rounded-full bg-[#C45A2C] px-3 py-0.5 text-xs text-white">
                      推荐
                    </span>
                  )}
                  <div className="mb-1 text-sm text-white/60">{m.plan}</div>
                  <div className="text-3xl font-bold">
                    {m.price}
                    <span className="text-sm font-normal text-white/40">{m.unit}</span>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/vip"
              className="btn-scale inline-block rounded-full bg-[#C45A2C] px-10 py-4 text-sm font-medium text-white transition-colors hover:bg-[#D4612F]"
            >
              立即开通会员
            </Link>
          </div>
        </section>
      </Reveal>

      {/* CTA */}
      <Reveal>
        <section className="px-6 py-32 sm:py-40">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-[#1D1D1F] sm:text-5xl">
              开始你的运动旅程
            </h2>
            <p className="mb-10 text-[#86868B]">
              预约一节免费体验课，感受270的不同
            </p>
            <Link
              href="/courses"
              className="btn-scale inline-block rounded-full bg-[#C45A2C] px-10 py-4 text-sm font-medium text-white transition-colors hover:bg-[#D4612F]"
            >
              预约体验课
            </Link>
          </div>
        </section>
      </Reveal>

      {/* Footer */}
      <footer className="border-t border-[#D2D2D7] bg-[#F5F5F7] px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 grid gap-8 sm:grid-cols-4">
            <div>
              <div className="mb-4 text-xl font-bold text-[#1D1D1F]">270</div>
              <p className="text-sm leading-relaxed text-[#86868B]">
                BEAUTY CYCLE 270
                <br />
                她的运动美学
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold text-[#1D1D1F]">课程</h4>
              <ul className="space-y-2 text-sm text-[#86868B]">
                <li><Link href="/courses">普拉提</Link></li>
                <li><Link href="/courses">瑜伽</Link></li>
                <li><Link href="/courses">女性力量</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold text-[#1D1D1F]">关于</h4>
              <ul className="space-y-2 text-sm text-[#86868B]">
                <li>品牌故事</li>
                <li>教练团队</li>
                <li>联系我们</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold text-[#1D1D1F]">联系</h4>
              <ul className="space-y-2 text-sm text-[#86868B]">
                <li>福州市鼓楼区</li>
                <li>189-0501-8888</li>
                <li>10:00 - 21:00</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#D2D2D7] pt-8 text-center text-xs text-[#86868B]">
            © 2024 270运动馆 BEAUTY CYCLE 270. 福州坤成体育发展有限公司
          </div>
        </div>
      </footer>
    </div>
  );
}
