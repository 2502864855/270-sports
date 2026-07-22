"use client";

import { useState } from "react";
import { ArrowLeft, Check, Crown, Gift, Sparkles } from "lucide-react";
import Link from "next/link";

const memberLevels = [
  { level: "普通会员", icon: "🤍", price: "免费", color: "#86868B", benefits: ["预约课程", "积分累计", "会员价商品"] },
  { level: "银卡会员", icon: "🥈", price: "¥1,980/年", color: "#86868B", benefits: ["8折课程", "生日礼遇", "专属活动", "优先预约"] },
  { level: "金卡会员", icon: "🥇", price: "¥3,980/年", color: "#C45A2C", benefits: ["6.5折课程", "专属私教", "免费商城配送", "专属课程", "VIP活动"] },
  { level: "钻石会员", icon: "💎", price: "¥6,980/年", color: "#1D1D1F", benefits: ["5折课程", "1对1私教", "免费商城", "全部课程", "年度派对", "专属顾问"] },
];

const purchasePlans = [
  { name: "月卡", price: "299", original: "299", unit: "元/月", save: null, popular: false },
  { name: "季卡", price: "699", original: "897", unit: "元/季", save: "省198元", popular: true },
  { name: "年卡", price: "1,999", original: "3,588", unit: "元/年", save: "省1,589元", popular: false },
];

const pointsRules = [
  { action: "每日签到", points: "+5" },
  { action: "完成课程", points: "+20" },
  { action: "消费1元", points: "+1" },
  { action: "邀请好友", points: "+100" },
];

const pointsExchange = [
  { name: "体验课1节", points: "500", icon: "🩰" },
  { name: "运动毛巾", points: "800", icon: "🧣" },
  { name: "蛋白棒", points: "300", icon: "🍫" },
  { name: "私教课1节", points: "2000", icon: "💪" },
];

export default function VipPage() {
  const [activeTab, setActiveTab] = useState<"levels" | "purchase" | "points">("levels");

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header - Dark premium */}
      <div className="relative px-8 pt-14 pb-10 bg-[#1D1D1F]">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/profile">
            <ArrowLeft className="w-5 h-5 text-white/80" />
          </Link>
          <h1 className="text-xl font-semibold text-white">会员中心</h1>
        </div>

        {/* Current member info */}
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-[#C45A2C]/50 ring-offset-2 ring-offset-[#1D1D1F]">
            <img
              src="https://images.unsplash.com/photo-1438761681033-64697f97b067?w=200&q=80"
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-white text-lg font-medium">小美</span>
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#C45A2C] text-white text-xs">
                <Crown className="w-3 h-3" />
                银卡会员
              </span>
            </div>
            <p className="text-white/50 text-sm mt-1.5">到期时间：2025-03-15</p>
          </div>
        </div>

        {/* Quick stats */}
        <div className="flex items-center justify-around mt-8 pt-6 border-t border-white/10">
          <div className="text-center">
            <p className="text-2xl font-bold text-white">2,680</p>
            <p className="text-sm text-white/50 mt-1">可用积分</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">3</p>
            <p className="text-sm text-white/50 mt-1">可兑换</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">68</p>
            <p className="text-sm text-white/50 mt-1">距升级差</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-8 pt-6">
        <div className="bg-[#F5F5F7] rounded-xl p-1 flex">
          {[
            { key: "levels", label: "等级权益" },
            { key: "purchase", label: "开通会员" },
            { key: "points", label: "积分商城" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`flex-1 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? "bg-white text-[#1D1D1F] shadow-sm"
                  : "text-[#86868B]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-8 pt-6">
        {activeTab === "levels" && (
          <div className="space-y-4">
            {memberLevels.map((level, index) => (
              <div
                key={index}
                className="border border-[#D2D2D7]/50 rounded-2xl p-5"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-3xl">{level.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-[#1D1D1F]">{level.level}</h3>
                    <p className="text-sm text-[#86868B] mt-0.5">{level.price}</p>
                  </div>
                  {index === 1 && (
                    <span className="text-xs px-3 py-1 rounded-full bg-[#C45A2C] text-white">当前</span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {level.benefits.map((benefit, bi) => (
                    <span key={bi} className="flex items-center gap-1 text-sm text-[#86868B]">
                      <Check className="w-3.5 h-3.5 text-[#C45A2C]" />
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "purchase" && (
          <div className="space-y-4">
            {purchasePlans.map((plan, index) => (
              <div
                key={index}
                className={`card-hover relative rounded-2xl p-6 ${
                  plan.popular
                    ? "bg-[#1D1D1F] text-white"
                    : "border border-[#D2D2D7]/50"
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-[#C45A2C] text-white text-xs rounded-full">
                    推荐
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`text-lg font-semibold ${plan.popular ? "text-white" : "text-[#1D1D1F]"}`}>
                      {plan.name}
                    </h3>
                    {plan.save && (
                      <span className="text-sm text-[#C45A2C] mt-1">{plan.save}</span>
                    )}
                  </div>
                  <div className="text-right">
                    <span className={`text-3xl font-bold ${plan.popular ? "text-white" : "text-[#C45A2C]"}`}>
                      ¥{plan.price}
                    </span>
                    <span className={`text-sm ml-1 ${plan.popular ? "text-white/50" : "text-[#86868B]"}`}>
                      /{plan.unit.replace("元/", "")}
                    </span>
                  </div>
                </div>
                {plan.original !== plan.price && (
                  <p className={`text-xs mt-2 ${plan.popular ? "text-white/40" : "text-[#86868B]"}`}>
                    原价 ¥{plan.original}
                  </p>
                )}
              </div>
            ))}

            <button className="w-full mt-6 py-4 bg-[#C45A2C] text-white rounded-full text-base font-medium hover:bg-[#D4612F] transition-colors duration-300 btn-scale">
              立即开通会员
            </button>
          </div>
        )}

        {activeTab === "points" && (
          <div className="space-y-6">
            {/* Points rules */}
            <div className="border border-[#D2D2D7]/50 rounded-2xl p-6">
              <h3 className="text-base font-semibold text-[#1D1D1F] mb-5 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#C45A2C]" />
                积分规则
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {pointsRules.map((rule, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-[#F5F5F7] rounded-xl">
                    <span className="text-sm text-[#86868B]">{rule.action}</span>
                    <span className="text-sm text-[#C45A2C] font-medium">{rule.points}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Points exchange */}
            <div className="border border-[#D2D2D7]/50 rounded-2xl p-6">
              <h3 className="text-base font-semibold text-[#1D1D1F] mb-5 flex items-center gap-2">
                <Gift className="w-5 h-5 text-[#C45A2C]" />
                积分兑换
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {pointsExchange.map((item, index) => (
                  <div key={index} className="p-5 bg-[#F5F5F7] rounded-xl text-center hover:bg-[#E8E8ED] transition-colors cursor-pointer">
                    <span className="text-3xl">{item.icon}</span>
                    <p className="text-sm text-[#1D1D1F] mt-2">{item.name}</p>
                    <p className="text-xs text-[#C45A2C] mt-1 font-medium">{item.points} 积分</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
