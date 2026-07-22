'use client';

import { Reveal } from '@/components/Reveal';
import { Leaf, Apple, Droplets, Flame } from 'lucide-react';

const recipes = [
  { name: '减脂期推荐', desc: '高蛋白低碳水，科学减脂不挨饿', icon: Flame, color: '#C45A2C' },
  { name: '备孕期营养', desc: '叶酸、铁质、优质蛋白全面补充', icon: Apple, color: '#10B981' },
  { name: '产后恢复', desc: '温和滋补，促进身体恢复', icon: Leaf, color: '#3B82F6' },
  { name: '日常保养', desc: '均衡营养，保持好状态', icon: Droplets, color: '#73716D' },
];

const nutritionData = [
  { label: '热量', value: 1450, max: 1800, unit: 'kcal', color: '#C45A2C' },
  { label: '蛋白质', value: 85, max: 100, unit: 'g', color: '#403E3B' },
  { label: '碳水', value: 160, max: 220, unit: 'g', color: '#73716D' },
  { label: '脂肪', value: 45, max: 60, unit: 'g', color: '#A19E98' },
];

export default function LifestylePage() {
  return (
    <div className="pt-24 pb-20 px-5 md:px-10">
      <div className="mx-auto max-w-[1240px]">
        <Reveal>
          <p className="text-[12px] font-semibold tracking-[0.2em] uppercase text-gray-400 mb-4">Healthy Living</p>
          <h1 className="text-[36px] md:text-[56px] font-bold text-gray-900 leading-[1.05] tracking-[-0.02em] mb-4">健康生活</h1>
          <p className="text-[17px] text-gray-500 max-w-lg mb-12">科学营养管理，为运动赋能。</p>
        </Reveal>

        {/* Nutrition Overview */}
        <Reveal delay={1}>
          <div className="card p-8 mb-10">
            <h2 className="text-[20px] font-semibold text-gray-900 mb-6">今日营养摄入</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {nutritionData.map(item => (
                <div key={item.label}>
                  <p className="text-[13px] text-gray-500 mb-2">{item.label}</p>
                  <p className="text-[28px] font-bold text-gray-900 mb-1" style={{ fontFamily: 'Inter' }}>
                    {item.value}<span className="text-[14px] font-normal text-gray-400 ml-1">{item.unit}</span>
                  </p>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${(item.value / item.max) * 100}%`, backgroundColor: item.color }} />
                  </div>
                  <p className="text-[12px] text-gray-400 mt-1">{item.value}/{item.max}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Recipe Categories */}
        <Reveal delay={2}>
          <h2 className="text-[24px] font-semibold text-gray-900 mb-6">推荐食谱</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {recipes.map((recipe, i) => (
              <div key={recipe.name} className="card p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${recipe.color}10` }}>
                  <recipe.icon size={22} style={{ color: recipe.color }} />
                </div>
                <div>
                  <h3 className="text-[17px] font-semibold text-gray-900 mb-1">{recipe.name}</h3>
                  <p className="text-[14px] text-gray-500 leading-relaxed">{recipe.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* AI Suggestion */}
        <Reveal delay={3}>
          <div className="mt-10 p-8 rounded-2xl" style={{ background: 'linear-gradient(135deg, #FAF8F5, #F5F4F2)' }}>
            <p className="text-[12px] font-semibold tracking-[0.15em] uppercase text-gray-400 mb-3">AI 营养建议</p>
            <p className="text-[17px] text-gray-700 leading-[1.7]">
              根据您的运动记录和身体数据，建议今日增加优质蛋白摄入。训练后可补充20-30g乳清蛋白，
              搭配适量碳水促进恢复。晚餐建议以鱼类或豆制品为主，减少红肉摄入。
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
