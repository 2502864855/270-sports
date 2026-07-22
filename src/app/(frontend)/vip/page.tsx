'use client';

import { useState } from 'react';
import { Crown, Check, Star, Sparkles, ChevronRight, Gift, Zap } from 'lucide-react';

const memberLevels = [
  {
    level: '普通会员',
    icon: '🌱',
    color: '#7EC8B7',
    price: { month: 0, quarter: 0, year: 0 },
    benefits: ['预约公开课程', '商城购物', '积分累计', '基础营养建议'],
  },
  {
    level: '银卡会员',
    icon: '🥈',
    color: '#B8A9C9',
    price: { month: 299, quarter: 799, year: 2799 },
    benefits: ['银卡会员价', '优先预约', '每月1节体验课', '专属营养方案', '生日礼遇'],
  },
  {
    level: '金卡会员',
    icon: '🥇',
    color: '#D4859B',
    price: { month: 499, quarter: 1299, year: 4799 },
    benefits: ['金卡专享价', '优先预约+留位', '每月2节体验课', 'AI定制营养方案', '专属课程', '私教9折', '生日大礼包'],
    popular: true,
  },
  {
    level: '钻石会员',
    icon: '💎',
    color: '#F08080',
    price: { month: 899, quarter: 2399, year: 8999 },
    benefits: ['最低专享价', '无限预约+优先留位', '每月4节体验课', '1对1 AI顾问', '全部专属课程', '私教8折', '季度体测', '专属社群', '年度大礼包'],
  },
];

const pointsRules = [
  { action: '每日签到', points: '+5' },
  { action: '完成课程', points: '+20' },
  { action: '消费满100元', points: '+10' },
  { action: '邀请好友注册', points: '+50' },
  { action: '完善身体数据', points: '+30' },
];

export default function VIPPage() {
  const [selectedLevel, setSelectedLevel] = useState(2);
  const [pricePeriod, setPricePeriod] = useState<'month' | 'quarter' | 'year'>('year');

  return (
    <div className="px-4 pt-6 pb-8 animate-float-up">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#D4859B] to-[#E8A0B5] rounded-3xl p-5 text-white mb-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-10 translate-x-10" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Crown size={20} />
            <span className="text-sm">会员中心</span>
          </div>
          <h1 className="text-xl font-bold">金卡会员</h1>
          <p className="text-xs text-white/70 mt-1">到期时间：2026-08-15（剩余 117 天）</p>
          <div className="flex items-center gap-3 mt-3">
            <div className="bg-white/20 rounded-xl px-3 py-1.5">
              <p className="text-[10px] text-white/70">当前积分</p>
              <p className="text-lg font-bold">2,680</p>
            </div>
            <div className="bg-white/20 rounded-xl px-3 py-1.5">
              <p className="text-[10px] text-white/70">本月消费</p>
              <p className="text-lg font-bold">¥1,299</p>
            </div>
          </div>
        </div>
      </div>

      {/* Points Rules */}
      <div className="bg-white rounded-2xl p-4 shadow-sm mb-5">
        <div className="flex items-center gap-2 mb-3">
          <Zap size={14} className="text-[#D4859B]" />
          <h2 className="font-semibold text-[#3A2E2A] text-sm">积分规则</h2>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {pointsRules.map((rule) => (
            <div key={rule.action} className="flex items-center justify-between p-2 rounded-xl bg-[#FDF8F5]">
              <span className="text-xs text-[#4A4A4A]">{rule.action}</span>
              <span className="text-xs font-medium text-[#D4859B]">{rule.points}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Level Comparison */}
      <div className="mb-5">
        <h2 className="font-semibold text-[#3A2E2A] mb-3">会员等级对比</h2>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {memberLevels.map((level, i) => (
            <button
              key={level.level}
              onClick={() => setSelectedLevel(i)}
              className={`min-w-[100px] p-3 rounded-2xl text-center transition-all flex-shrink-0 ${
                selectedLevel === i
                  ? 'bg-white shadow-md ring-2'
                  : 'bg-white/60 shadow-sm'
              }`}
              style={selectedLevel === i ? { outlineColor: level.color } as React.CSSProperties : undefined}
            >
              <div className="text-xl mb-1">{level.icon}</div>
              <p className="text-[11px] font-medium text-[#3A2E2A]">{level.level}</p>
              <p className="text-[10px] mt-0.5" style={{ color: level.color }}>
                {level.price.year > 0 ? `¥${level.price.year}/年` : '免费'}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Level Benefits */}
      <div className="bg-white rounded-2xl p-4 shadow-sm mb-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">{memberLevels[selectedLevel].icon}</span>
          <h2 className="font-semibold text-[#3A2E2A] text-sm">{memberLevels[selectedLevel].level}权益</h2>
        </div>
        <div className="space-y-2">
          {memberLevels[selectedLevel].benefits.map((benefit) => (
            <div key={benefit} className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: `${memberLevels[selectedLevel].color}15` }}>
                <Check size={11} style={{ color: memberLevels[selectedLevel].color }} />
              </div>
              <span className="text-xs text-[#4A4A4A]">{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Purchase Options */}
      {selectedLevel > 0 && (
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-5">
          <h2 className="font-semibold text-[#3A2E2A] text-sm mb-3">开通 / 续费</h2>

          {/* Period Selector */}
          <div className="flex gap-2 mb-4">
            {([
              { key: 'month', label: '月卡' },
              { key: 'quarter', label: '季卡', tag: '省13%' },
              { key: 'year', label: '年卡', tag: '最划算' },
            ] as const).map((period) => (
              <button
                key={period.key}
                onClick={() => setPricePeriod(period.key)}
                className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all relative ${
                  pricePeriod === period.key
                    ? 'brand-gradient text-white shadow-sm'
                    : 'bg-[#FDF0F0] text-[#8A7A74]'
                }`}
              >
                {period.label}
                {'tag' in period && period.tag && (
                  <span className="absolute -top-1.5 -right-1 text-[8px] bg-[#F08080] text-white px-1 rounded-full">
                    {period.tag}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Price */}
          <div className="text-center mb-4">
            <p className="text-xs text-[#8A7A74]">
              {pricePeriod === 'month' ? '月卡' : pricePeriod === 'quarter' ? '季卡' : '年卡'}价格
            </p>
            <p className="text-3xl font-bold text-[#D4859B] mt-1">
              ¥{memberLevels[selectedLevel].price[pricePeriod]}
            </p>
            <p className="text-[10px] text-[#8A7A74]">
              约 ¥{Math.round(memberLevels[selectedLevel].price[pricePeriod] / (pricePeriod === 'month' ? 1 : pricePeriod === 'quarter' ? 3 : 12))}/月
            </p>
          </div>

          <button className="w-full py-3 rounded-2xl brand-gradient text-white text-sm font-medium shadow-lg shadow-[#D4859B]/30 active:scale-[0.98] transition-transform">
            {selectedLevel === 2 ? '立即续费' : '立即升级'}
          </button>
        </div>
      )}

      {/* Points Exchange */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-[#3A2E2A]">积分兑换</h2>
          <a href="/mall" className="text-xs text-[#D4859B] flex items-center gap-0.5">
            更多 <ChevronRight size={14} />
          </a>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: '体验课1节', points: 200, emoji: '🎫' },
            { name: '运动毛巾', points: 500, emoji: '🧣' },
            { name: '蛋白棒1支', points: 300, emoji: '🍫' },
            { name: '瑜伽辅具券', points: 1000, emoji: '🎁' },
          ].map((item) => (
            <div key={item.name} className="bg-white rounded-2xl p-3 shadow-sm text-center">
              <div className="text-2xl mb-1">{item.emoji}</div>
              <p className="text-xs font-medium text-[#3A2E2A]">{item.name}</p>
              <p className="text-[10px] text-[#D4859B] font-medium mt-0.5">{item.points} 积分</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
