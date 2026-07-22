'use client';

import { useState } from 'react';
import { Flame, Droplets, Wheat, Plus, ChevronRight, Apple, Beef, Milk, Salad } from 'lucide-react';

const mealCategories = [
  { id: 'breakfast', label: '早餐', time: '07:30', icon: '🌅' },
  { id: 'lunch', label: '午餐', time: '12:00', icon: '☀️' },
  { id: 'dinner', label: '晚餐', time: '18:30', icon: '🌙' },
  { id: 'snack', label: '加餐', time: '15:00', icon: '🍎' },
];

const todayMeals = {
  breakfast: [
    { name: '全麦面包', calories: 120, amount: '2片', icon: '🍞' },
    { name: '牛奶', calories: 150, amount: '250ml', icon: '🥛' },
    { name: '水煮蛋', calories: 75, amount: '1个', icon: '🥚' },
  ],
  lunch: [
    { name: '鸡胸肉', calories: 165, amount: '150g', icon: '🍗' },
    { name: '糙米饭', calories: 200, amount: '1碗', icon: '🍚' },
    { name: '西兰花', calories: 55, amount: '100g', icon: '🥦' },
  ],
  dinner: [
    { name: '三文鱼', calories: 208, amount: '120g', icon: '🐟' },
    { name: '蔬菜沙拉', calories: 80, amount: '1份', icon: '🥗' },
  ],
  snack: [
    { name: '坚果混合', calories: 160, amount: '30g', icon: '🥜' },
  ],
};

const nutritionTargets = {
  calories: { current: 1213, target: 2000, unit: 'kcal' },
  protein: { current: 85, target: 120, unit: 'g' },
  carbs: { current: 145, target: 250, unit: 'g' },
  fat: { current: 42, target: 65, unit: 'g' },
  water: { current: 1500, target: 2500, unit: 'ml' },
};

export default function DietPage() {
  const [activeCategory, setActiveCategory] = useState('breakfast');

  return (
    <div className="px-4 pt-6 animate-float-up">
      {/* Header */}
      <h1 className="text-xl font-bold text-[#1A1A2E] mb-1">饮食管理</h1>
      <p className="text-sm text-gray-500 mb-5">记录每一餐，掌控每一卡</p>

      {/* Nutrition Overview */}
      <div className="bg-white rounded-2xl p-4 shadow-sm mb-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-[#1A1A2E]">今日营养摄入</h2>
          <span className="text-xs text-[#FF6B35]">61% 已完成</span>
        </div>

        {/* Calorie Ring */}
        <div className="flex items-center gap-6 mb-4">
          <div className="relative w-20 h-20">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#f0f0f5"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#FF6B35"
                strokeWidth="3"
                strokeDasharray="61, 100"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-lg font-bold text-[#FF6B35]">1213</span>
              <span className="text-[9px] text-gray-400">kcal</span>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-2">
            {[
              { label: '蛋白质', ...nutritionTargets.protein, color: '#4ECDC4' },
              { label: '碳水', ...nutritionTargets.carbs, color: '#FFD93D' },
              { label: '脂肪', ...nutritionTargets.fat, color: '#6C5CE7' },
              { label: '饮水', ...nutritionTargets.water, color: '#00B4D8' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <div>
                  <p className="text-[11px] text-gray-400">{item.label}</p>
                  <p className="text-xs font-medium text-[#1A1A2E]">
                    {item.current}<span className="text-gray-300">/{item.target}{item.unit}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Meal Categories */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {mealCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? 'brand-gradient text-white shadow-sm'
                : 'bg-white text-gray-600 hover:bg-gray-50'
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
        <div className="space-y-3">
          {(todayMeals[activeCategory as keyof typeof todayMeals] || []).map((meal, i) => (
            <div key={i} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-lg">
                {meal.icon}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[#1A1A2E]">{meal.name}</p>
                <p className="text-[11px] text-gray-400">{meal.amount}</p>
              </div>
              <div className="flex items-center gap-1 text-[#FF6B35]">
                <Flame size={12} />
                <span className="text-sm font-medium">{meal.calories}</span>
                <span className="text-[10px] text-gray-400">kcal</span>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-3 py-2.5 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 text-sm flex items-center justify-center gap-1 hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors">
          <Plus size={16} />
          添加食物
        </button>
      </div>

      {/* AI Suggestion */}
      <div className="bg-gradient-to-br from-[#4ECDC4]/10 to-[#00F5A0]/10 rounded-2xl p-4 border border-[#4ECDC4]/20">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-[#4ECDC4] flex items-center justify-center">
            <span className="text-white text-xs">AI</span>
          </div>
          <span className="text-sm font-semibold text-[#1A1A2E]">AI 营养建议</span>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">
          今日蛋白质摄入偏低，建议晚餐增加一份豆腐或鸡蛋。下午加餐可选择希腊酸奶补充蛋白质。
        </p>
      </div>
    </div>
  );
}
