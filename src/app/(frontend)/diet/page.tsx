"use client";

import { useState } from "react";
import { Plus, Sparkles, Droplets } from "lucide-react";

const mealCategories = [
  { id: "breakfast", label: "早餐", time: "08:00", icon: "🌅" },
  { id: "lunch", label: "午餐", time: "12:00", icon: "☀️" },
  { id: "dinner", label: "晚餐", time: "18:30", icon: "🌙" },
  { id: "snack", label: "加餐", time: "15:00", icon: "🍎" },
];

const nutritionData = [
  { label: "热量", current: 1280, target: 1600, unit: "kcal", color: "#C45A2C", percent: 80 },
  { label: "蛋白质", current: 68, target: 80, unit: "g", color: "#FF9500", percent: 85 },
  { label: "碳水", current: 145, target: 200, unit: "g", color: "#34C759", percent: 72 },
  { label: "脂肪", current: 42, target: 55, unit: "g", color: "#5856D6", percent: 76 },
];

const waterIntake = { current: 5, target: 8, unit: "杯" };

const mealRecords = [
  { category: "breakfast", foods: [{ name: "全麦吐司 + 牛油果", cal: 320 }, { name: "希腊酸奶", cal: 120 }] },
  { category: "lunch", foods: [{ name: "藜麦沙拉", cal: 380 }, { name: "鸡胸肉", cal: 180 }] },
  { category: "snack", foods: [{ name: "坚果混合包", cal: 150 }] },
  { category: "dinner", foods: [] },
];

const aiTips = [
  { icon: "💡", text: "今日蛋白质摄入偏低，建议晚餐增加一份鱼肉或豆腐", tag: "营养建议" },
  { icon: "🥗", text: "连续3天蔬菜摄入不足，建议增加绿叶蔬菜", tag: "膳食均衡" },
  { icon: "💧", text: "饮水量达标率62%，建议下午再补充2杯水", tag: "饮水提醒" },
];

const recipes = [
  { name: "低卡鸡胸肉沙拉", cal: "320kcal", time: "15min", tag: "减脂期", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&q=80" },
  { name: "暖宫红糖姜茶", cal: "85kcal", time: "10min", tag: "备孕期", image: "https://images.unsplash.com/photo-1556881286-fc6915169721?w=200&q=80" },
  { name: "产后恢复粥", cal: "280kcal", time: "30min", tag: "产后修复", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&q=80" },
  { name: "高蛋白增肌碗", cal: "450kcal", time: "20min", tag: "增肌期", image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=200&q=80" },
];

export default function DietPage() {
  const [activeRecipeTag, setActiveRecipeTag] = useState("全部");
  const recipeTags = ["全部", "减脂期", "备孕期", "产后修复", "增肌期"];

  const filteredRecipes = activeRecipeTag === "全部"
    ? recipes
    : recipes.filter((r) => r.tag === activeRecipeTag);

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-[#F5F5F7]">
        <h1 className="text-2xl font-bold tracking-tight text-[#1D1D1F]">营养</h1>
        <p className="text-sm text-[#86868B] mt-1">今日饮食记录</p>
      </div>

      {/* Nutrition overview */}
      <div className="px-6 pt-6 mb-6">
        <div className="rounded-xl border border-[#D2D2D7] p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-[#1D1D1F]">今日营养摄入</h2>
            <span className="text-[10px] text-[#C45A2C] bg-[#C45A2C]/10 px-2 py-0.5 rounded-full">80%</span>
          </div>

          {/* Calorie ring */}
          <div className="flex items-center justify-center mb-5">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#F5F5F7" strokeWidth="8" />
                <circle
                  cx="50" cy="50" r="42" fill="none" stroke="#C45A2C" strokeWidth="8"
                  strokeDasharray={`${80 * 2.64} ${100 * 2.64}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-[#1D1D1F]">1280</span>
                <span className="text-[10px] text-[#86868B]">/ 1600 kcal</span>
              </div>
            </div>
          </div>

          {/* Macro bars */}
          <div className="grid grid-cols-3 gap-3">
            {nutritionData.slice(1).map((item) => (
              <div key={item.label} className="text-center">
                <div className="h-1.5 bg-[#F5F5F7] rounded-full mb-1.5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${item.percent}%`, backgroundColor: item.color }}
                  />
                </div>
                <p className="text-xs text-[#1D1D1F] font-medium">{item.current}{item.unit}</p>
                <p className="text-[10px] text-[#86868B]">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Water intake */}
      <div className="px-6 mb-6">
        <div className="rounded-xl border border-[#D2D2D7] p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-[#007AFF]" />
              <span className="text-sm text-[#1D1D1F]">今日饮水</span>
            </div>
            <span className="text-sm text-[#1D1D1F]">
              <span className="font-bold text-[#007AFF]">{waterIntake.current}</span>
              <span className="text-[#86868B] text-xs"> / {waterIntake.target} 杯</span>
            </span>
          </div>
          <div className="flex gap-1.5 mt-3">
            {Array.from({ length: waterIntake.target }).map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                  i < waterIntake.current ? "bg-[#007AFF]" : "bg-[#F5F5F7]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Meal records */}
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-[#1D1D1F]">饮食记录</h2>
          <button className="flex items-center gap-1 text-[10px] text-[#C45A2C]">
            <Plus className="w-3 h-3" /> 添加记录
          </button>
        </div>
        <div className="space-y-2">
          {mealCategories.map((cat) => {
            const record = mealRecords.find((r) => r.category === cat.id);
            const foods = record?.foods || [];
            const totalCal = foods.reduce((sum, f) => sum + f.cal, 0);

            return (
              <div key={cat.id} className="rounded-xl border border-[#D2D2D7] p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{cat.icon}</span>
                    <span className="text-sm text-[#1D1D1F] font-medium">{cat.label}</span>
                    <span className="text-[10px] text-[#86868B]">{cat.time}</span>
                  </div>
                  {totalCal > 0 && (
                    <span className="text-xs text-[#C45A2C]">{totalCal} kcal</span>
                  )}
                </div>
                {foods.length > 0 ? (
                  <div className="space-y-1">
                    {foods.map((food, fi) => (
                      <div key={fi} className="flex items-center justify-between pl-7">
                        <span className="text-xs text-[#86868B]">{food.name}</span>
                        <span className="text-[10px] text-[#86868B]">{food.cal} kcal</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-[#D2D2D7] pl-7">暂无记录</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* AI tips */}
      <div className="px-6 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-[#C45A2C]" />
          <h2 className="text-sm font-semibold text-[#1D1D1F]">AI 营养建议</h2>
        </div>
        <div className="space-y-2">
          {aiTips.map((tip, index) => (
            <div key={index} className="rounded-xl border border-[#D2D2D7] p-3 flex items-start gap-3">
              <span className="text-lg flex-shrink-0">{tip.icon}</span>
              <div>
                <p className="text-xs text-[#86868B] leading-relaxed">{tip.text}</p>
                <span className="text-[10px] text-[#C45A2C] mt-1 inline-block">{tip.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended recipes */}
      <div className="px-6">
        <h2 className="text-sm font-semibold text-[#1D1D1F] mb-3">推荐食谱</h2>
        <div className="flex gap-2 mb-3 overflow-x-auto scrollbar-hide">
          {recipeTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveRecipeTag(tag)}
              className={`flex-shrink-0 px-3 py-1 rounded-full text-[10px] transition-colors ${
                activeRecipeTag === tag
                  ? "bg-[#1D1D1F] text-white"
                  : "bg-[#F5F5F7] text-[#86868B]"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          {filteredRecipes.map((recipe, index) => (
            <div key={index} className="rounded-xl border border-[#D2D2D7] p-3 flex items-center gap-3">
              <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                <img src={recipe.image} alt={recipe.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm text-[#1D1D1F] font-medium truncate">{recipe.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-[#86868B]">{recipe.cal}</span>
                  <span className="text-[10px] text-[#D2D2D7]">·</span>
                  <span className="text-[10px] text-[#86868B]">{recipe.time}</span>
                </div>
              </div>
              <span className="flex-shrink-0 text-[9px] px-2 py-0.5 rounded bg-[#F5F5F7] text-[#1D1D1F]">
                {recipe.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
