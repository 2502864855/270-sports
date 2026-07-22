"use client";

import { useState } from "react";
import { Crown, Check, Star, Sparkles, ChevronRight, Gift, Zap, ArrowLeft } from "lucide-react";
import Link from "next/link";

const memberLevels = [
  {
    level: "普通会员",
    icon: "🌱",
    color: "#A8D5BA",
    price: "免费",
    benefits: ["预约全部课程", "基础体测服务", "更衣室使用", "积分累积"],
  },
  {
    level: "银卡会员",
    icon: "🥈",
    color: "#B8C9D4",
    price: "599/月",
    benefits: ["全部普通权益", "商城9.5折", "月度体测", "生日礼遇", "优先预约"],
  },
  {
    level: "金卡会员",
    icon: "🥇",
    color: "#C9A96E",
    price: "1,499/季",
    benefits: ["全部银卡权益", "商城9折", "专属课程", "1次私教/月", "积分双倍", "会员活动"],
  },
  {
    level: "钻石会员",
    icon: "💎",
    color: "#D4859B",
    price: "4,999/年",
    benefits: ["全部金卡权益", "商城8.5折", "专属储物柜", "4次私教/月", "积分三倍", "年度派对", "新品优先体验"],
  },
];

const purchasePlans = [
  { name: "月卡", price: "599", original: "599", unit: "元/月", save: "", popular: false },
  { name: "季卡", price: "1,499", original: "1,797", unit: "元/季", save: "省298元", popular: true },
  { name: "年卡", price: "4,999", original: "7,188", unit: "元/年", save: "省2,189元", popular: false },
];

const pointsRules = [
  { action: "每日签到", points: "+5" },
  { action: "完成课程", points: "+20" },
  { action: "商城消费", points: "1元=1分" },
  { action: "邀请好友", points: "+200" },
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
    <div className="min-h-screen bg-[#FDF5F0] pb-20">
      {/* Header */}
      <div className="relative px-6 pt-6 pb-8 bg-gradient-to-b from-[#3A2E2A] to-[#4A3E52] rounded-b-[28px]">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/profile">
            <ArrowLeft className="w-5 h-5 text-white/80" />
          </Link>
          <h1 className="text-lg font-serif text-white">会员中心</h1>
        </div>

        {/* Current member info */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-[#C9A96E]/50">
            <img
              src="https://images.unsplash.com/photo-1438761681033-64697f97b067?w=150&q=80"
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-white font-medium">小美</span>
              <span className="flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-gradient-to-r from-[#C9A96E] to-[#E0C992] text-white text-[10px]">
                <Crown className="w-2.5 h-2.5" />
                银卡会员
              </span>
            </div>
            <p className="text-white/60 text-xs mt-1">到期时间：2025-03-15</p>
          </div>
        </div>

        {/* Quick stats */}
        <div className="flex items-center justify-around mt-5 pt-4 border-t border-white/10">
          <div className="text-center">
            <p className="text-lg font-serif text-[#E0C992]">2,680</p>
            <p className="text-[10px] text-white/50">可用积分</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-serif text-[#E0C992]">3</p>
            <p className="text-[10px] text-white/50">可兑换</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-serif text-[#E0C992]">68</p>
            <p className="text-[10px] text-white/50">距升级差</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 -mt-4">
        <div className="bg-white rounded-[16px] p-1 flex shadow-sm shadow-[#D4859B]/5">
          {[
            { key: "levels", label: "等级权益" },
            { key: "purchase", label: "开通会员" },
            { key: "points", label: "积分商城" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`flex-1 py-2.5 rounded-[12px] text-xs font-medium transition-all duration-300 ${
                activeTab === tab.key
                  ? "bg-[#D4859B] text-white shadow-sm"
                  : "text-[#7A6B66]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pt-4">
        {activeTab === "levels" && (
          <div className="space-y-3">
            {memberLevels.map((level, index) => (
              <div
                key={index}
                className="bg-white rounded-[20px] p-4 shadow-sm shadow-[#D4859B]/5"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{level.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-[#3A2E2A]">{level.level}</h3>
                    <p className="text-xs" style={{ color: level.color }}>{level.price}</p>
                  </div>
                  {index === 1 && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FDF0F0] text-[#D4859B]">当前</span>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {level.benefits.map((benefit, bi) => (
                    <span key={bi} className="flex items-center gap-1 text-[10px] text-[#7A6B66]">
                      <Check className="w-2.5 h-2.5" style={{ color: level.color }} />
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "purchase" && (
          <div className="space-y-3">
            {purchasePlans.map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-[20px] p-5 transition-all ${
                  plan.popular
                    ? "bg-gradient-to-br from-[#3A2E2A] to-[#4A3E52] text-white shadow-lg shadow-[#C9A96E]/15"
                    : "bg-white shadow-sm shadow-[#D4859B]/5"
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-3 right-3 px-2 py-0.5 bg-[#C9A96E] text-white text-[10px] rounded-full">
                    推荐
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`text-base font-medium ${plan.popular ? "text-white" : "text-[#3A2E2A]"}`}>
                      {plan.name}
                    </h3>
                    {plan.save && (
                      <span className="text-[10px] text-[#F5A89A]">{plan.save}</span>
                    )}
                  </div>
                  <div className="text-right">
                    <span className={`text-2xl font-serif ${plan.popular ? "text-[#E0C992]" : "text-[#D4859B]"}`}>
                      ¥{plan.price}
                    </span>
                    <span className={`text-xs ml-1 ${plan.popular ? "text-white/50" : "text-[#7A6B66]"}`}>
                      /{plan.unit.replace("元/", "")}
                    </span>
                  </div>
                </div>
                {plan.original !== plan.price && (
                  <p className={`text-[10px] mt-1 ${plan.popular ? "text-white/40" : "text-[#B8A8A4]"}`}>
                    原价 ¥{plan.original}
                  </p>
                )}
              </div>
            ))}

            <button className="w-full mt-4 py-3.5 bg-gradient-to-r from-[#C9A96E] to-[#E0C992] text-white rounded-full text-sm font-medium shadow-lg shadow-[#C9A96E]/20 hover:shadow-xl transition-all duration-300">
              立即开通会员
            </button>
          </div>
        )}

        {activeTab === "points" && (
          <div className="space-y-4">
            {/* Points rules */}
            <div className="bg-white rounded-[20px] p-4 shadow-sm shadow-[#D4859B]/5">
              <h3 className="text-sm font-medium text-[#3A2E2A] mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C9A96E]" />
                积分规则
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {pointsRules.map((rule, index) => (
                  <div key={index} className="flex items-center justify-between p-2.5 bg-[#FDF5F0] rounded-[12px]">
                    <span className="text-xs text-[#7A6B66]">{rule.action}</span>
                    <span className="text-xs text-[#D4859B] font-medium">{rule.points}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Points exchange */}
            <div className="bg-white rounded-[20px] p-4 shadow-sm shadow-[#D4859B]/5">
              <h3 className="text-sm font-medium text-[#3A2E2A] mb-3 flex items-center gap-2">
                <Gift className="w-4 h-4 text-[#D4859B]" />
                积分兑换
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {pointsExchange.map((item, index) => (
                  <div key={index} className="p-3 bg-[#FDF5F0] rounded-[14px] text-center hover:bg-[#FDF0F0] transition-colors cursor-pointer">
                    <span className="text-2xl">{item.icon}</span>
                    <p className="text-xs text-[#3A2E2A] mt-1.5">{item.name}</p>
                    <p className="text-[10px] text-[#D4859B] mt-0.5">{item.points} 积分</p>
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
