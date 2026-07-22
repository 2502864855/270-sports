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
  { name: "低卡鸡胸肉沙拉", cal: "320kcal", time: "15min", tag: "减脂期", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80" },
  { name: "暖宫红糖姜茶", cal: "85kcal", time: "10min", tag: "备孕期", image: "https://images.unsplash.com/photo-1556881286-fc6915169721?w=400&q=80" },
  { name: "产后恢复粥", cal: "280kcal", time: "30min", tag: "产后修复", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80" },
  { name: "高蛋白增肌碗", cal: "450kcal", time: "20min", tag: "增肌期", image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80" },
];

export default function DietPage() {
  const [activeRecipeTag, setActiveRecipeTag] = useState("全部");
  const recipeTags = ["全部", "减脂期", "备孕期", "产后修复", "增肌期"];

  const filteredRecipes = activeRecipeTag === "全部"
    ? recipes
    : recipes.filter((r) => r.tag === activeRecipeTag);

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Hero Header - Apple style */}
      <div className="pt-16 pb-8 px-8 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-[#1D1D1F] mb-3">营养</h1>
        <p className="text-lg text-[#86868B]">科学饮食，健康每一天</p>
      </div>

      {/* Nutrition overview - Large card */}
      <div className="px-8 pb-8">
        <div className="rounded-2xl border border-[#D2D2D7]/50 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-[#1D1D1F]">今日营养摄入</h2>
            <span className="text-sm text-[#C45A2C] bg-[#C45A2C]/10 px-3 py-1 rounded-full font-medium">80%</span>
          </div>

          {/* Calorie ring - Larger */}
          <div className="flex items-center justify-center mb-8">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#F5F5F7" strokeWidth="6" />
                <circle
                  cx="50" cy="50" r="42" fill="none" stroke="#C45A2C" strokeWidth="6"
                  strokeDasharray={`${80 * 2.64} ${100 * 2.64}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-[#1D1D1F]">1280</span>
                <span className="text-sm text-[#86868B]">/ 1600 kcal</span>
              </div>
            </div>
          </div>

          {/* Macro bars - Larger */}
          <div className="grid grid-cols-3 gap-6">
            {nutritionData.slice(1).map((item) => (
              <div key={item.label} className="text-center">
                <div className="h-2 bg-[#F5F5F7] rounded-full mb-3 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${item.percent}%`, backgroundColor: item.color }}
                  />
                </div>
                <p className="text-base text-[#1D1D1F] font-semibold">{item.current}<span className="text-xs text-[#86868B] ml-0.5">{item.unit}</span></p>
                <p className="text-sm text-[#86868B] mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Water intake - Larger */}
      <div className="px-8 pb-8">
        <div className="rounded-2xl border border-[#D2D2D7]/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Droplets className="w-5 h-5 text-[#007AFF]" />
              <span className="text-base text-[#1D1D1F] font-medium">今日饮水</span>
            </div>
            <span className="text-base text-[#1D1D1F]">
              <span className="font-bold text-[#007AFF]">{waterIntake.current}</span>
              <span className="text-[#86868B] text-sm"> / {waterIntake.target} 杯</span>
            </span>
          </div>
          <div className="flex gap-2">
            {Array.from({ length: waterIntake.target }).map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-3 rounded-full transition-all duration-300 ${
                  i < waterIntake.current ? "bg-[#007AFF]" : "bg-[#F5F5F7]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Meal records - Larger cards */}
      <div className="px-8 pb-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-[#1D1D1F]">饮食记录</h2>
          <button className="flex items-center gap-1.5 text-sm text-[#C45A2C] font-medium">
            <Plus className="w-4 h-4" /> 添加记录
          </button>
        </div>
        <div className="space-y-4">
          {mealCategories.map((cat) => {
            const record = mealRecords.find((r) => r.category === cat.id);
            const foods = record?.foods || [];
            const totalCal = foods.reduce((sum, f) => sum + f.cal, 0);

            return (
              <div key={cat.id} className="rounded-2xl border border-[#D2D2D7]/50 p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{cat.icon}</span>
                    <span className="text-base text-[#1D1D1F] font-medium">{cat.label}</span>
                    <span className="text-sm text-[#86868B]">{cat.time}</span>
                  </div>
                  {totalCal > 0 && (
                    <span className="text-sm text-[#C45A2C] font-medium">{totalCal} kcal</span>
                  )}
                </div>
                {foods.length > 0 ? (
                  <div className="space-y-2 pl-9">
                    {foods.map((food, fi) => (
                      <div key={fi} className="flex items-center justify-between">
                        <span className="text-sm text-[#86868B]">{food.name}</span>
                        <span className="text-sm text-[#86868B]">{food.cal} kcal</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[#D2D2D7] pl-9">暂无记录</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* AI tips - Larger cards */}
      <div className="px-8 pb-8">
        <div className="flex items-center gap-2 mb-5">
          <Sparkles className="w-5 h-5 text-[#C45A2C]" />
          <h2 className="text-lg font-semibold text-[#1D1D1F]">AI 营养建议</h2>
        </div>
        <div className="space-y-4">
          {aiTips.map((tip, index) => (
            <div key={index} className="rounded-2xl border border-[#D2D2D7]/50 p-5 flex items-start gap-4">
              <span className="text-2xl flex-shrink-0">{tip.icon}</span>
              <div>
                <p className="text-sm text-[#86868B] leading-relaxed">{tip.text}</p>
                <span className="text-xs text-[#C45A2C] mt-2 inline-block font-medium">{tip.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended recipes - Larger cards */}
      <div className="px-8">
        <h2 className="text-lg font-semibold text-[#1D1D1F] mb-5">推荐食谱</h2>
        <div className="flex gap-2 mb-5 overflow-x-auto scrollbar-hide">
          {recipeTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveRecipeTag(tag)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm transition-colors ${
                activeRecipeTag === tag
                  ? "bg-[#1D1D1F] text-white"
                  : "bg-[#F5F5F7] text-[#86868B] hover:bg-[#E5E5EA]"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="space-y-4">
          {filteredRecipes.map((recipe, index) => (
            <div key={index} className="card-hover rounded-2xl border border-[#D2D2D7]/50 p-4 flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                <img src={recipe.image} alt={recipe.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-base text-[#1D1D1F] font-medium truncate">{recipe.name}</h4>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-sm text-[#86868B]">{recipe.cal}</span>
                  <span className="text-sm text-[#D2D2D7]">·</span>
                  <span className="text-sm text-[#86868B]">{recipe.time}</span>
                </div>
              </div>
              <span className="flex-shrink-0 text-xs px-3 py-1 rounded-full bg-[#F5F5F7] text-[#1D1D1F] font-medium">
                {recipe.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
