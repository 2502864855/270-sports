'use client';

import { useState } from 'react';
import { Plus, ChevronRight, Sparkles, Leaf, Apple, Droplets } from 'lucide-react';

const mealCategories = [
  { id: 'breakfast', label: '早餐', time: '08:00', icon: '🌅' },
  { id: 'lunch', label: '午餐', time: '12:00', icon: '☀️' },
  { id: 'dinner', label: '晚餐', time: '18:30', icon: '🌙' },
  { id: 'snack', label: '加餐', time: '15:00', icon: '🍎' },
];

const todayMeals: Record<string, Array<{ name: string; calories: number; amount: string; icon: string }>> = {
  breakfast: [
    { name: '牛油果吐司', calories: 180, amount: '1片', icon: '🥑' },
    { name: '无糖豆浆', calories: 80, amount: '300ml', icon: '🥛' },
    { name: '水煮蛋', calories: 75, amount: '1个', icon: '🥚' },
  ],
  lunch: [
    { name: '藜麦沙拉', calories: 220, amount: '1份', icon: '🥗' },
    { name: '香煎鸡胸肉', calories: 165, amount: '120g', icon: '🍗' },
    { name: '糙米饭', calories: 150, amount: '小半碗', icon: '🍚' },
  ],
  dinner: [
    { name: '清蒸鲈鱼', calories: 120, amount: '150g', icon: '🐟' },
    { name: '时蔬汤', calories: 60, amount: '1碗', icon: '🍲' },
  ],
  snack: [
    { name: '混合坚果', calories: 120, amount: '20g', icon: '🥜' },
    { name: '蓝莓酸奶', calories: 100, amount: '1杯', icon: '🫐' },
  ],
};

const nutritionTargets = {
  calories: { current: 1150, target: 1800, unit: 'kcal', color: '#D4859B' },
  protein: { current: 72, target: 90, unit: 'g', color: '#7EC8B7' },
  carbs: { current: 130, target: 200, unit: 'g', color: '#F08080' },
  fat: { current: 38, target: 55, unit: 'g', color: '#B8A9C9' },
  water: { current: 1200, target: 2000, unit: 'ml', color: '#89CFF0' },
};

const recipes = [
  { title: '减脂期 · 7天食谱', desc: '低卡高蛋白，科学减脂不挨饿', emoji: '🔥', tag: '热门', color: '#F08080' },
  { title: '备孕期 · 营养方案', desc: '叶酸、铁、优质蛋白全面补充', emoji: '🤱', tag: '推荐', color: '#D4859B' },
  { title: '产后恢复 · 调理餐', desc: '温和滋补，帮助身体恢复', emoji: '🌸', tag: '专属', color: '#B8A9C9' },
  { title: '增肌期 · 高蛋白餐', desc: '科学配比，增肌不增脂', emoji: '💪', tag: '进阶', color: '#7EC8B7' },
];

export default function DietPage() {
  const [activeCategory, setActiveCategory] = useState('breakfast');

  const caloriePercent = Math.round((nutritionTargets.calories.current / nutritionTargets.calories.target) * 100);

  return (
    <div className="px-4 pt-6 animate-float-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold text-[#3A2E2A]">营养管理</h1>
          <p className="text-xs text-[#8A7A74] mt-0.5">科学饮食，温柔呵护每一餐</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center">
          <Leaf size={15} className="text-[#7EC8B7]" />
        </div>
      </div>

      {/* Nutrition Overview */}
      <div className="bg-white rounded-3xl p-5 shadow-sm mb-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-[#3A2E2A] text-sm">今日营养摄入</h2>
          <span className="text-xs text-[#D4859B] font-medium">{caloriePercent}% 已完成</span>
        </div>

        <div className="flex items-center gap-5 mb-4">
          {/* Calorie Ring */}
          <div className="relative w-20 h-20 flex-shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none" stroke="#F0E6E0" strokeWidth="3"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none" stroke="#D4859B" strokeWidth="3"
                strokeDasharray={`${caloriePercent}, 100`} strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-lg font-bold text-[#D4859B]">{nutritionTargets.calories.current}</span>
              <span className="text-[9px] text-[#8A7A74]">/ {nutritionTargets.calories.target} kcal</span>
            </div>
          </div>

          <div className="flex-1 space-y-2">
            {[
              { label: '蛋白质', ...nutritionTargets.protein },
              { label: '碳水', ...nutritionTargets.carbs },
              { label: '脂肪', ...nutritionTargets.fat },
              { label: '饮水', ...nutritionTargets.water },
            ].map((item) => {
              const pct = Math.round((item.current / item.target) * 100);
              return (
                <div key={item.label} className="flex items-center gap-2">
                  <span className="text-[10px] text-[#8A7A74] w-7">{item.label}</span>
                  <div className="flex-1 h-1.5 bg-[#F0E6E0] rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: item.color }} />
                  </div>
                  <span className="text-[10px] text-[#4A4A4A] w-14 text-right">{item.current}/{item.target}{item.unit}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Meal Categories */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1 scrollbar-hide">
        {mealCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? 'brand-gradient text-white shadow-sm'
                : 'bg-white text-[#8A7A74] hover:bg-[#FDF0F0]'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
            <span className="text-[10px] opacity-70">{cat.time}</span>
          </button>
        ))}
      </div>

      {/* Meal Items */}
      <div className="bg-white rounded-2xl p-4 shadow-sm mb-5">
        <div className="space-y-2.5">
          {(todayMeals[activeCategory] || []).map((meal, i) => (
            <div key={i} className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#FDF8F5] transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#FDF0F0] flex items-center justify-center text-lg">
                {meal.icon}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[#3A2E2A]">{meal.name}</p>
                <p className="text-[11px] text-[#8A7A74]">{meal.amount}</p>
              </div>
              <div className="flex items-center gap-0.5 text-[#D4859B]">
                <span className="text-sm font-medium">{meal.calories}</span>
                <span className="text-[10px] text-[#8A7A74]">kcal</span>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-3 py-2.5 rounded-2xl border-2 border-dashed border-[#F0E6E0] text-[#B8A8A4] text-xs flex items-center justify-center gap-1 hover:border-[#D4859B] hover:text-[#D4859B] transition-colors">
          <Plus size={14} /> 添加食物
        </button>
      </div>

      {/* AI Suggestion */}
      <div className="bg-gradient-to-br from-[#7EC8B7]/10 to-[#A8DFD0]/10 rounded-2xl p-4 border border-[#7EC8B7]/20 mb-5">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={14} className="text-[#7EC8B7]" />
          <span className="text-sm font-semibold text-[#3A2E2A]">AI 营养建议</span>
        </div>
        <p className="text-xs text-[#4A4A4A] leading-relaxed">
          今日蛋白质摄入达标率80%，建议晚餐增加一份豆腐或鸡蛋。下午加餐可选择希腊酸奶。
          女性经期前建议多补充铁质和维生素B6。
        </p>
      </div>

      {/* Recommended Recipes */}
      <div>
        <h2 className="font-semibold text-[#3A2E2A] text-sm mb-3">推荐食谱</h2>
        <div className="space-y-3">
          {recipes.map((recipe) => (
            <div key={recipe.title} className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ backgroundColor: `${recipe.color}15` }}>
                {recipe.emoji}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-medium text-[#3A2E2A]">{recipe.title}</h3>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full text-white" style={{ backgroundColor: recipe.color }}>{recipe.tag}</span>
                </div>
                <p className="text-[11px] text-[#8A7A74] mt-0.5">{recipe.desc}</p>
              </div>
              <ChevronRight size={14} className="text-[#B8A8A4]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
