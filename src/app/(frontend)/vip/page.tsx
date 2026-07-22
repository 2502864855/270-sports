'use client';

import { useState } from 'react';
import { Check, Crown, Star, Gem } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

const plans = [
  { name: '月卡', price: 399, original: 499, period: '月', features: ['全课程预约', '基础会员权益', '商城95折'] },
  { name: '季卡', price: 999, original: 1497, period: '季', popular: true, features: ['全课程预约', '银卡会员权益', '商城9折', '私教体验课1次'] },
  { name: '年卡', price: 3299, original: 5988, period: '年', features: ['全课程预约', '金卡会员权益', '商城85折', '私教课4次', '专属储物柜'] },
];

const levels = [
  { name: '普通会员', icon: Star, color: '#73716D', benefits: ['课程预约', '基础积分'] },
  { name: '银卡会员', icon: Crown, color: '#A19E98', benefits: ['课程预约', '1.5倍积分', '商城9折', '生日礼遇'] },
  { name: '金卡会员', icon: Gem, color: '#C45A2C', benefits: ['课程预约', '2倍积分', '商城85折', '专属课程', '私教优惠'] },
  { name: '钻石会员', icon: Crown, color: '#272624', benefits: ['课程优先预约', '3倍积分', '商城8折', '全部专属课程', '私教8折', '年度体检'] },
];

export default function VipPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <section className="relative noise-overlay overflow-hidden px-5 md:px-10 py-20 md:py-28"
        style={{ background: 'linear-gradient(180deg, #1F1E1C 0%, #181817 100%)' }}
      >
        <div className="absolute top-0 right-[10%] w-[400px] h-[300px] opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(196,90,44,0.3), transparent 60%)' }}
        />
        <div className="relative z-10 mx-auto max-w-[1240px]">
          <Reveal>
            <p className="text-[12px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-4">Membership</p>
            <h1 className="text-[36px] md:text-[56px] font-bold text-white leading-[1.05] tracking-[-0.02em] mb-4">会员中心</h1>
            <p className="text-[17px] text-gray-400 max-w-lg">加入270会员，解锁专属权益与尊享服务。</p>
          </Reveal>
        </div>
      </section>

      {/* Plans */}
      <section className="px-5 md:px-10 py-20 md:py-28 bg-cream">
        <div className="mx-auto max-w-[1240px]">
          <Reveal>
            <h2 className="text-[24px] md:text-[32px] font-bold text-gray-900 text-center mb-12">选择适合你的会员方案</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <Reveal key={plan.name} delay={i + 1}>
                <div className={`card p-8 relative ${plan.popular ? 'border-gray-900 border-2' : ''}`}>
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[11px] font-semibold text-white px-3 py-1 rounded" style={{ backgroundColor: '#C45A2C' }}>
                      推荐
                    </span>
                  )}
                  <h3 className="text-[18px] font-semibold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-[36px] font-bold text-gray-900" style={{ fontFamily: 'Inter' }}>¥{plan.price}</span>
                    <span className="text-[14px] text-gray-400">/{plan.period}</span>
                  </div>
                  <p className="text-[13px] text-gray-400 line-through mb-6">原价 ¥{plan.original}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-[14px] text-gray-700">
                        <Check size={15} className="text-gray-400 flex-shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full h-12 text-[15px] font-medium rounded-lg ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}>
                    立即开通
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Levels */}
      <section className="px-5 md:px-10 py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-[1240px]">
          <Reveal>
            <h2 className="text-[24px] md:text-[32px] font-bold text-gray-900 text-center mb-12">会员等级体系</h2>
          </Reveal>
          <div className="grid md:grid-cols-4 gap-6">
            {levels.map((level, i) => (
              <Reveal key={level.name} delay={i + 1}>
                <div className="card p-6 text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: `${level.color}10` }}>
                    <level.icon size={24} style={{ color: level.color }} />
                  </div>
                  <h3 className="text-[16px] font-semibold text-gray-900 mb-3">{level.name}</h3>
                  <ul className="space-y-2">
                    {level.benefits.map(b => (
                      <li key={b} className="text-[13px] text-gray-500">{b}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
