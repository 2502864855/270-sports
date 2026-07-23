'use client';

import Link from 'next/link';
import { ArrowDown, ArrowRight, Crown, Star, Award, MapPin, Phone, Quote } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { useEffect, useState } from 'react';

// 发展历程
const timeline = [
  { year: '2022', title: '品牌创立', desc: '270 运动馆于福州成立，创始人徐宁，立志打造女性专属健身空间' },
  { year: '2023', title: '首家门店落地', desc: '鼓楼区晓康苑店开业，积累首批 500 名会员' },
  { year: '2024', title: '课程体系迭代', desc: '完善女性专属训练体系，会员突破 1000 人' },
  { year: '2025', title: '品牌荣誉', desc: '创始人徐宁获「年度女性影响力人物」，品牌获「最具投资价值项目奖」' },
  { year: '2026', title: '种子轮融资', desc: '完成种子轮融资，投后估值 500 万，开启规模化发展' },
];

// 核心价值
const values = [
  { icon: '🔒', title: '安全私密', desc: '纯女性空间，无评判环境，让每位女性安心运动' },
  { icon: '💪', title: '专业适配', desc: '女性专属训练体系，科学适配不同阶段需求' },
  { icon: '👥', title: '高粘性社群', desc: '1000+ 核心会员，68% 续费率，温暖互助' },
];

// 核心数据
const stats = [
  { value: '10W+', label: '累计服务女性' },
  { value: '1000+', label: '核心会员' },
  { value: '68%', label: '月度续费率' },
  { value: '2022', label: '品牌创立' },
];

// 媒体报道
const news = [
  { source: '凤凰网', title: '深耕"她力量"健身赛道', desc: '270 运动馆以女性专属定位，开创健身行业新蓝海' },
  { source: '华商创新论坛', title: '2025 最具投资价值项目', desc: '第 36 届华商创新论坛官方评选，270 运动馆脱颖而出' },
  { source: 'ABEC', title: '亚洲影响力创新奖', desc: '表彰在亚洲健身行业具有创新影响力的品牌' },
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
      {/* ===== Section 1: Hero 主视觉 ===== */}
      <section className="relative h-screen min-h-[600px] overflow-hidden bg-white">
        {/* 极简背景 */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #C45A2C 0%, transparent 70%)' }} />
          <div className="absolute bottom-40 left-20 w-64 h-64 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #C45A2C 0%, transparent 70%)' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center h-full px-5 md:px-10">
          <div className="mx-auto max-w-[1240px] w-full">
            <div className="max-w-3xl">
              <p className="text-[12px] font-semibold tracking-[0.3em] uppercase mb-6" style={{ color: '#C45A2C' }}>
                Beauty Cycle 270
              </p>
              <h1
                className="text-[44px] md:text-[80px] font-black leading-[0.95] tracking-[-0.025em] mb-6"
                style={{ fontFamily: 'Inter, sans-serif', color: '#181817' }}
              >
                270 运动馆
              </h1>
              <p className="text-[20px] md:text-[28px] font-medium leading-tight mb-3" style={{ color: '#403E3B' }}>
                让每位女性，平等享有运动健身的权利
              </p>
              <p className="text-[15px] md:text-[17px] mb-8 max-w-md" style={{ color: '#73716D' }}>
                安全 · 私密 · 无评判 · 高适配
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/about" className="inline-flex items-center justify-center h-[52px] px-7 text-[16px] font-medium text-white rounded-lg transition-all" style={{ background: 'linear-gradient(180deg, #D97A4A, #C45A2C, #A84A22)' }}>
                  了解品牌
                </Link>
                <Link href="/login" className="inline-flex items-center justify-center h-[52px] px-7 text-[16px] font-medium rounded-lg transition-colors" style={{ color: '#1D1D1F', border: '1px solid #E5E5E7' }}>
                  预约体验
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
          <ArrowDown size={20} style={{ color: '#73716D' }} />
        </div>
      </section>

      {/* ===== Section 2: 品牌使命与价值观 ===== */}
      <section className="py-32 md:py-40 px-5 md:px-10" style={{ backgroundColor: '#FAF8F5' }}>
        <div className="mx-auto max-w-[1240px]">
          <div className="grid md:grid-cols-2 gap-16 items-start">
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
                  <div className="p-6 rounded-xl transition-all" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E7E5E1' }}>
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
      <section className="py-32 px-5 md:px-10 bg-white">
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
              <Reveal key={i} delay={i * 0.1}>
                <div className="text-center p-8 rounded-xl" style={{ backgroundColor: '#FAF8F5', border: '1px solid #E7E5E1' }}>
                  <div className="text-[48px] md:text-[64px] font-black mb-2" style={{ color: '#C45A2C', fontFamily: 'Inter, sans-serif' }}>
                    {stat.value}
                  </div>
                  <div className="text-sm" style={{ color: '#73716D' }}>{stat.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Section 4: 发展历程 ===== */}
      <section className="py-32 md:py-40 px-5 md:px-10" style={{ backgroundColor: '#FAF8F5' }}>
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
            {/* 时间线 */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px" style={{ backgroundColor: '#E7E5E1' }} />

            <div className="space-y-12">
              {timeline.map((item, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className={`flex items-center gap-8 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className="flex-1 text-right">
                      {i % 2 === 0 && (
                        <>
                          <div className="text-[32px] font-black mb-2" style={{ color: '#C45A2C', fontFamily: 'Inter, sans-serif' }}>{item.year}</div>
                          <h3 className="text-xl font-bold mb-2" style={{ color: '#181817' }}>{item.title}</h3>
                          <p className="text-sm" style={{ color: '#73716D' }}>{item.desc}</p>
                        </>
                      )}
                    </div>
                    <div className="w-4 h-4 rounded-full border-4 z-10" style={{ borderColor: '#C45A2C', backgroundColor: '#FAF8F5' }} />
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
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Section 5: 创始人介绍 ===== */}
      <section className="py-32 md:py-40 px-5 md:px-10 bg-white">
        <div className="mx-auto max-w-[1240px]">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* 照片位 */}
            <Reveal>
              <div className="aspect-[3/4] rounded-2xl overflow-hidden" style={{ backgroundColor: '#FAF8F5', border: '1px solid #E7E5E1' }}>
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
              <Reveal key={i} delay={i * 0.1}>
                <div className="p-6 rounded-xl transition-all" style={{ backgroundColor: '#FAF8F5', border: '1px solid #E7E5E1' }}>
                  <div className="text-xs font-semibold mb-3" style={{ color: '#C45A2C' }}>{item.source}</div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: '#181817' }}>{item.title}</h3>
                  <p className="text-sm" style={{ color: '#73716D' }}>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Section 8: CTA 行动召唤 ===== */}
      <section className="py-32 px-5 md:px-10" style={{ backgroundColor: '#181817' }}>
        <div className="mx-auto max-w-[1240px] text-center">
          <Reveal>
            <h2 className="text-[36px] md:text-[56px] font-bold mb-6 text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
              开启你的女性专属<br />健身之旅
            </h2>
            <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.6)' }}>
              首次体验免费咨询 + 身体评估
            </p>
            <Link href="/login" className="inline-flex items-center gap-2 h-[52px] px-8 text-[16px] font-medium text-white rounded-lg transition-all" style={{ background: 'linear-gradient(180deg, #D97A4A, #C45A2C, #A84A22)' }}>
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
