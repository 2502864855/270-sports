'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Shield, Heart, Users, Award, Quote, MapPin, Phone } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { useParallax } from '@/hooks/useParallax';

// 核心数据
const stats = [
  { value: '10W+', label: '累计服务女性' },
  { value: '1000+', label: '核心会员' },
  { value: '68%', label: '月度续费率' },
  { value: '2022', label: '品牌创立年份' },
];

// 核心价值
const values = [
  { icon: <Shield size={32} />, title: '安全私密', desc: '纯女性空间，无评判环境，让每位女性安心运动' },
  { icon: <Heart size={32} />, title: '专业适配', desc: '女性专属训练体系，科学定制个人计划' },
  { icon: <Users size={32} />, title: '高粘性社群', desc: '1000+ 核心会员，68% 续费率，温暖陪伴' },
];

// 发展历程
const timeline = [
  { year: '2022', title: '品牌创立', desc: '270 运动馆于福州成立，创始人徐宁发起女性专属健身品牌' },
  { year: '2023', title: '首家门店落地', desc: '积累首批 500 名会员，建立品牌口碑' },
  { year: '2024', title: '课程体系迭代', desc: '会员突破 1000 人，形成完整训练体系' },
  { year: '2025', title: '荣誉加冕', desc: '创始人徐宁获「年度女性影响力人物」，品牌获「最具投资价值项目奖」' },
  { year: '2026', title: '规模化发展', desc: '完成种子轮融资，投后估值 500 万，开启新征程' },
];

// 媒体报道
const news = [
  { source: '凤凰网', title: '深耕"她力量"健身赛道', desc: '270 运动馆以女性专属定位，打造差异化健身服务' },
  { source: '华商创新论坛', title: '2025 最具投资价值项目', desc: '第 36 届华商创新论坛官方评选获奖' },
  { source: 'ABEC', title: '亚洲影响力创新奖', desc: '表彰品牌在女性健身领域的创新贡献' },
];

export default function HomePage() {
  // DOM refs for GSAP animations
  const heroRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLElement>(null);
  const founderRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  // Hero 三层视差
  const heroBgRef = useParallax({ speed: 0.4, direction: 'down', yPercent: 30, scrub: 1 });
  const heroMidRef = useParallax({ speed: 0.7, direction: 'up', yPercent: -15, scrub: 0.8 });
  const heroTextRef = useParallax({ speed: 1.0, direction: 'up', yPercent: -20, scrub: 0.5 });

  // 数据区视差
  const statsBgRef = useParallax({ speed: 0.1, direction: 'up', yPercent: -10, scrub: 1 });

  // CTA 光晕视差
  const ctaOrbRef = useParallax({ speed: 0.3, direction: 'up', yPercent: -20, scale: 1.1, scrub: 1 });

  useEffect(() => {
    // 动态导入 GSAP
    let gsap: any;
    let ScrollTrigger: any;

    const initGSAP = async () => {
      try {
        const gsapModule = await import('gsap');
        const scrollTriggerModule = await import('gsap/ScrollTrigger');
        
        gsap = gsapModule.default;
        ScrollTrigger = scrollTriggerModule.default;
        
        gsap.registerPlugin(ScrollTrigger);

        // 数据卡片依次入场
        if (statsRef.current) {
          const cards = statsRef.current.querySelectorAll('[data-stat-card]');
          cards.forEach((card: Element, i: number) => {
            gsap.from(card, {
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
              y: 40,
              opacity: 0,
              duration: 0.6,
              delay: i * 0.1,
              ease: 'power2.out',
            });
          });
        }

        // 时间线节点左右滑入
        if (timelineRef.current) {
          const items = timelineRef.current.querySelectorAll('[data-timeline-item]');
          items.forEach((item: Element, i: number) => {
            const isLeft = i % 2 === 0;
            gsap.from(item, {
              scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
              x: isLeft ? -60 : 60,
              opacity: 0,
              duration: 0.8,
              ease: 'power2.out',
            });
          });
        }

        // 媒体报道卡片交错入场
        const newsCards = document.querySelectorAll('[data-news-card]');
        newsCards.forEach((card, i) => {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'power2.out',
          });
        });

        // CTA 按钮弹性弹入
        if (ctaRef.current) {
          const btn = ctaRef.current.querySelector('[data-cta-btn]');
          if (btn) {
            gsap.from(btn, {
              scrollTrigger: {
                trigger: btn,
                start: 'top 90%',
                toggleActions: 'play none none none',
              },
              scale: 0.8,
              opacity: 0,
              duration: 0.8,
              ease: 'back.out(1.7)',
            });
          }
        }

      } catch (e) {
        console.log('GSAP 加载失败，使用基础动画');
      }
    };

    initGSAP();

    return () => {
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach((t: { kill: () => void }) => t.kill());
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* ===== Section 1: Hero 主视觉 ===== */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden px-5 md:px-10">
        {/* 背景层 - 慢速视差 */}
        <div 
          ref={heroBgRef}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0" style={{ backgroundColor: '#FAF8F5' }} />
          {/* 装饰几何图形 */}
          <div className="absolute top-20 right-10 w-64 h-64 rounded-full opacity-20" style={{ backgroundColor: '#C45A2C', filter: 'blur(60px)' }} />
          <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full opacity-15" style={{ backgroundColor: '#D97A4A', filter: 'blur(50px)' }} />
        </div>

        {/* 文字层 - 正常速度视差 */}
        <div 
          ref={heroTextRef}
          className="relative z-10 text-center max-w-4xl mx-auto"
        >
          <Reveal>
            <p className="text-[12px] font-semibold tracking-[0.3em] uppercase mb-6" style={{ color: '#C45A2C' }}>
              BEAUTY CYCLE 270
            </p>
          </Reveal>
          
          <Reveal delay={0.1}>
            <h1 className="text-[48px] md:text-[80px] font-black leading-[1.1] mb-6" style={{ color: '#181817', fontFamily: 'Inter, sans-serif', letterSpacing: '-0.025em' }}>
              270 运动馆
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-[20px] md:text-[24px] mb-4" style={{ color: '#403E3B' }}>
              让每位女性，平等享有运动健身的权利
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="text-[16px] mb-12" style={{ color: '#73716D' }}>
              女性专属健身服务品牌 · 福州 · 2022 年创立
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="#brand-story" 
                className="h-[52px] px-8 text-[16px] font-medium text-white rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.97]"
                style={{ 
                  background: 'linear-gradient(90deg, #C45A2C, #B54A1C)',
                  boxShadow: '0 1px 6px rgba(196, 90, 44, 0.15), inset 0 1px 0 rgba(255,255,255,0.2)',
                  letterSpacing: '0.3px'
                }}
              >
                了解品牌
              </Link>
              <Link 
                href="/login" 
                className="h-[52px] px-8 text-[16px] font-medium rounded-lg transition-all duration-200 hover:border-[#D1D1D6] hover:bg-[#FAFAFA]"
                style={{ 
                  border: '1px solid #E5E5E7',
                  backgroundColor: '#FFFFFF',
                  color: '#1D1D1F',
                  fontWeight: 400
                }}
              >
                预约体验
              </Link>
            </div>
          </Reveal>
        </div>

        {/* 滚动提示 */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 flex items-start justify-center p-2" style={{ borderColor: '#C45A2C' }}>
            <div className="w-1 h-2 rounded-full" style={{ backgroundColor: '#C45A2C' }} />
          </div>
        </div>
      </section>

      {/* ===== Section 2: 品牌使命与价值观 ===== */}
      <section id="brand-story" className="py-32 md:py-40 px-5 md:px-10 bg-white">
        <div className="mx-auto max-w-[1240px]">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* 左：使命宣言 */}
            <Reveal>
              <div>
                <p className="text-[12px] font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: '#C45A2C' }}>
                  Our Mission
                </p>
                <h2 className="text-[36px] md:text-[56px] font-bold leading-tight mb-6" style={{ color: '#181817', fontFamily: 'Inter, sans-serif' }}>
                  让每位女性<br />
                  平等享有运动<br />
                  健身的权利
                </h2>
                <p className="text-[17px] leading-relaxed" style={{ color: '#73716D' }}>
                  270 运动馆创立于 2022 年，由创始人徐宁在福州发起。我们相信，运动不应有性别偏见，
                  每位女性都值得拥有一个安全、私密、无评判的运动空间。
                </p>
              </div>
            </Reveal>

            {/* 右：核心价值 */}
            <div className="space-y-4">
              {values.map((value, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="p-6 rounded-xl transition-all duration-200 hover:scale-[1.01]" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E7E5E1' }}>
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">{value.icon}</span>
                      <div>
                        <h3 className="text-lg font-semibold mb-1" style={{ color: '#181817' }}>{value.title}</h3>
                        <p className="text-sm" style={{ color: '#73716D' }}>{value.desc}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Section 3: 核心数据 ===== */}
      <section ref={statsRef} className="py-32 px-5 md:px-10 bg-white">
        <div className="mx-auto max-w-[1240px]">
          <Reveal>
            <div className="text-center mb-16">
              <p className="text-[12px] font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: '#C45A2C' }}>
                Brand Strength
              </p>
              <h2 className="text-[36px] md:text-[48px] font-bold" style={{ color: '#181817', fontFamily: 'Inter, sans-serif' }}>
                品牌实力证明
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} data-stat-card>
                <Reveal delay={i * 0.1}>
                  <div className="text-center p-8 rounded-xl" style={{ backgroundColor: '#FAF8F5', border: '1px solid #E7E5E1' }}>
                    <div className="text-[48px] md:text-[64px] font-black mb-2" style={{ color: '#C45A2C', fontFamily: 'Inter, sans-serif' }}>
                      {stat.value}
                    </div>
                    <div className="text-sm" style={{ color: '#73716D' }}>{stat.label}</div>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Section 4: 发展历程 ===== */}
      <section ref={timelineRef} className="py-32 md:py-40 px-5 md:px-10" style={{ backgroundColor: '#FAF8F5' }}>
        <div className="mx-auto max-w-[1240px]">
          <Reveal>
            <div className="text-center mb-16">
              <p className="text-[12px] font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: '#C45A2C' }}>
                Our Journey
              </p>
              <h2 className="text-[36px] md:text-[48px] font-bold" style={{ color: '#181817', fontFamily: 'Inter, sans-serif' }}>
                发展历程
              </h2>
            </div>
          </Reveal>

          {/* 时间线 */}
          <div className="relative">
            {/* 时间线中轴线 */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px" style={{ backgroundColor: '#E7E5E1' }} />

            <div className="space-y-12">
              {timeline.map((item, i) => (
                <div key={i} data-timeline-item className={`flex items-center gap-8 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="flex-1 text-right">
                    {i % 2 === 0 && (
                      <>
                        <div className="text-[32px] font-black mb-2" style={{ color: '#C45A2C', fontFamily: 'Inter, sans-serif' }}>{item.year}</div>
                        <h3 className="text-xl font-bold mb-2" style={{ color: '#181817' }}>{item.title}</h3>
                        <p className="text-sm" style={{ color: '#73716D' }}>{item.desc}</p>
                      </>
                    )}
                  </div>
                  <div className="w-4 h-4 rounded-full border-4 z-10 transition-all duration-300" style={{ borderColor: '#C45A2C', backgroundColor: '#FAF8F5' }} />
                  <div className="flex-1 text-left">
                    {i % 2 !== 0 && (
                      <>
                        <div className="text-[32px] font-black mb-2" style={{ color: '#C45A2C', fontFamily: 'Inter, sans-serif' }}>{item.year}</div>
                        <h3 className="text-xl font-bold mb-2" style={{ color: '#181817' }}>{item.title}</h3>
                        <p className="text-sm" style={{ color: '#73716D' }}>{item.desc}</p>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Section 5: 创始人介绍 ===== */}
      <section ref={founderRef} className="py-32 md:py-40 px-5 md:px-10 bg-white">
        <div className="mx-auto max-w-[1240px]">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* 照片位 - 反向视差 */}
            <Reveal>
              <div 
                className="aspect-[3/4] rounded-2xl overflow-hidden" 
                style={{ 
                  backgroundColor: '#FAF8F5', 
                  border: '1px solid #E7E5E1',
                }}
              >
                <div className="w-full h-full flex items-center justify-center text-[120px]" style={{ color: '#C45A2C' }}>
                  徐
                </div>
              </div>
            </Reveal>

            {/* 简介 */}
            <Reveal>
              <div>
                <p className="text-[12px] font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: '#C45A2C' }}>
                  Founder
                </p>
                <h2 className="text-[36px] md:text-[48px] font-bold mb-6" style={{ color: '#181817', fontFamily: 'Inter, sans-serif' }}>
                  徐宁
                </h2>
                <p className="text-[17px] leading-relaxed mb-6" style={{ color: '#73716D' }}>
                  270 运动馆创始人，2022 年于福州创立品牌。致力于打造一个让每位女性都能安心运动的空间，
                  让运动成为女性生活方式的一部分。
                </p>
                <div className="flex items-center gap-3 mb-8">
                  <Award size={20} style={{ color: '#C45A2C' }} />
                  <span className="text-sm font-medium" style={{ color: '#181817' }}>2025 年度女性影响力人物</span>
                </div>
                <blockquote className="pl-6 border-l-2" style={{ borderColor: '#C45A2C' }}>
                  <Quote size={24} className="mb-2" style={{ color: '#C45A2C' }} />
                  <p className="text-lg italic" style={{ color: '#403E3B' }}>
                    让每位女性，平等享有运动健身的权利
                  </p>
                </blockquote>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== Section 6: 门店信息 ===== */}
      <section className="py-32 px-5 md:px-10" style={{ backgroundColor: '#FAF8F5' }}>
        <div className="mx-auto max-w-[1240px]">
          <Reveal>
            <div className="text-center mb-16">
              <p className="text-[12px] font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: '#C45A2C' }}>
                Our Store
              </p>
              <h2 className="text-[36px] md:text-[48px] font-bold" style={{ color: '#181817', fontFamily: 'Inter, sans-serif' }}>
                门店信息
              </h2>
            </div>
          </Reveal>

          <div className="max-w-2xl mx-auto">
            <Reveal>
              <div className="p-8 rounded-xl bg-white" style={{ border: '1px solid #E7E5E1' }}>
                <h3 className="text-xl font-bold mb-6" style={{ color: '#181817' }}>
                  Beauty Cycle 女子运动美学馆（晓康苑店）
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <MapPin size={20} className="mt-1 flex-shrink-0" style={{ color: '#C45A2C' }} />
                    <div>
                      <div className="text-sm font-medium mb-1" style={{ color: '#181817' }}>地址</div>
                      <div className="text-sm" style={{ color: '#73716D' }}>福建福州鼓楼区湖东路 208 号晓康苑南楼 1303</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone size={20} className="mt-1 flex-shrink-0" style={{ color: '#C45A2C' }} />
                    <div>
                      <div className="text-sm font-medium mb-1" style={{ color: '#181817' }}>联系电话</div>
                      <div className="text-sm" style={{ color: '#73716D' }}>13950306600</div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-6" style={{ borderTop: '1px solid #E7E5E1' }}>
                  <p className="text-sm" style={{ color: '#73716D' }}>
                    女性专属空间，安全私密舒适。欢迎预约参观体验。
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== Section 7: 媒体报道 ===== */}
      <section className="py-32 md:py-40 px-5 md:px-10 bg-white">
        <div className="mx-auto max-w-[1240px]">
          <Reveal>
            <div className="text-center mb-16">
              <p className="text-[12px] font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: '#C45A2C' }}>
                Media Coverage
              </p>
              <h2 className="text-[36px] md:text-[48px] font-bold" style={{ color: '#181817', fontFamily: 'Inter, sans-serif' }}>
                媒体报道与荣誉
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {news.map((item, i) => (
              <div key={i} data-news-card>
                <Reveal delay={i * 0.1}>
                  <div className="p-6 rounded-xl transition-all duration-200 hover:-translate-y-1" style={{ backgroundColor: '#FAF8F5', border: '1px solid #E7E5E1' }}>
                    <div className="text-xs font-semibold mb-3" style={{ color: '#C45A2C' }}>{item.source}</div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: '#181817' }}>{item.title}</h3>
                    <p className="text-sm" style={{ color: '#73716D' }}>{item.desc}</p>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Section 8: CTA 行动召唤 ===== */}
      <section ref={ctaRef} className="py-32 px-5 md:px-10" style={{ backgroundColor: '#181817' }}>
        <div className="mx-auto max-w-[1240px] text-center">
          <Reveal>
            <h2 className="text-[36px] md:text-[56px] font-bold mb-6 text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
              开启你的女性专属<br />健身之旅
            </h2>
            <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.6)' }}>
              首次体验免费咨询 + 身体评估
            </p>
            <Link 
              href="/login" 
              data-cta-btn
              className="inline-flex items-center gap-2 h-[52px] px-8 text-[16px] font-medium text-white rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.97]"
              style={{ 
                background: 'linear-gradient(90deg, #C45A2C, #B54A1C)',
                boxShadow: '0 1px 6px rgba(196, 90, 44, 0.15), inset 0 1px 0 rgba(255,255,255,0.2)',
                letterSpacing: '0.3px'
              }}
            >
              立即预约体验
              <ArrowRight size={18} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ===== Section 9: Footer ===== */}
      <footer className="py-16 px-5 md:px-10 bg-white" style={{ borderTop: '1px solid #E7E5E1' }}>
        <div className="mx-auto max-w-[1240px]">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* 品牌信息 */}
            <div className="md:col-span-2">
              <h3 className="text-2xl font-black mb-4" style={{ color: '#181817', fontFamily: 'Inter, sans-serif' }}>
                270 运动馆
              </h3>
              <p className="text-sm mb-4" style={{ color: '#73716D' }}>
                BEAUTY CYCLE 270 - 让每位女性，平等享有运动健身的权利
              </p>
              <p className="text-xs" style={{ color: '#A1A1A6' }}>
                福州坤成体育发展有限公司
              </p>
            </div>

            {/* 导航链接 */}
            <div>
              <h4 className="text-sm font-semibold mb-4" style={{ color: '#181817' }}>导航</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-sm hover:underline" style={{ color: '#73716D' }}>首页</Link></li>
                <li><Link href="/about" className="text-sm hover:underline" style={{ color: '#73716D' }}>关于我们</Link></li>
                <li><Link href="/courses" className="text-sm hover:underline" style={{ color: '#73716D' }}>课程介绍</Link></li>
                <li><Link href="/contact" className="text-sm hover:underline" style={{ color: '#73716D' }}>联系我们</Link></li>
              </ul>
            </div>

            {/* 联系方式 */}
            <div>
              <h4 className="text-sm font-semibold mb-4" style={{ color: '#181817' }}>联系</h4>
              <ul className="space-y-2 text-sm" style={{ color: '#73716D' }}>
                <li>13950306600</li>
                <li>福州鼓楼区湖东路 208 号</li>
                <li>晓康苑南楼 1303</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid #E7E5E1' }}>
            <p className="text-xs" style={{ color: '#A1A1A6' }}>
              © 2025 270 运动馆。保留所有权利。
            </p>
            <Link href="/admin" className="text-xs" style={{ color: '#A1A1A6' }}>
              管理后台
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
