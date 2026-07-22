"use client";

import {
  ChevronRight, Crown,
  Bell, Settings, HelpCircle, LogOut, Ruler,
  Award, ShoppingBag, Bookmark, Gift,
  User, Shield, Info, Calendar
} from "lucide-react";
import Link from "next/link";

const stats = [
  { label: "累计运动", value: "128", unit: "次" },
  { label: "消耗卡路里", value: "32,680", unit: "kcal" },
  { label: "连续打卡", value: "15", unit: "天" },
];

const achievements = [
  { icon: "🔥", name: "连续7天打卡", done: true },
  { icon: "💪", name: "完成50次训练", done: true },
  { icon: "⭐", name: "首次私教课", done: true },
  { icon: "🏆", name: "月度全勤", done: false },
  { icon: "💎", name: "累计100次", done: false },
  { icon: "👑", name: "年度会员", done: false },
];

const bodyData = [
  { label: "身高", value: "163", unit: "cm" },
  { label: "体重", value: "52.5", unit: "kg" },
  { label: "体脂率", value: "22.8", unit: "%" },
  { label: "BMI", value: "19.7", unit: "" },
];

const menuSections = [
  {
    items: [
      { icon: Calendar, label: "我的课程", desc: "已预约 3 节", href: "/courses" },
      { icon: ShoppingBag, label: "我的订单", desc: "2 件待收货", href: "/mall" },
      { icon: Bookmark, label: "我的收藏", desc: "12 项", href: "#" },
      { icon: Crown, label: "会员中心", desc: "银卡会员", href: "/vip" },
    ],
  },
  {
    items: [
      { icon: Gift, label: "我的积分", desc: "2,680 分", href: "#" },
      { icon: Ruler, label: "身体数据", desc: "上次测量 11/10", href: "#" },
      { icon: Bell, label: "消息通知", desc: "3 条未读", href: "#" },
    ],
  },
  {
    items: [
      { icon: User, label: "个人信息", href: "#" },
      { icon: Shield, label: "账号安全", href: "#" },
      { icon: Settings, label: "设置", href: "#" },
      { icon: HelpCircle, label: "帮助与反馈", href: "#" },
      { icon: Info, label: "关于我们", href: "#" },
    ],
  },
];

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Profile header */}
      <div className="px-6 pt-8 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1438761681033-64697f97b067?w=150&q=80"
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-[#1D1D1F]">小美</h2>
              <span className="flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#1D1D1F] text-white text-[10px]">
                <Crown className="w-2.5 h-2.5" />
                银卡
              </span>
            </div>
            <p className="text-xs text-[#86868B] mt-0.5">ID: 270001 · 加入 286 天</p>
            <p className="text-[10px] text-[#C45A2C] mt-0.5">会员到期：2025-03-15</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-around mt-6 rounded-xl border border-[#D2D2D7] p-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex items-baseline justify-center gap-0.5">
                <span className="text-xl font-bold text-[#1D1D1F]">{stat.value}</span>
                <span className="text-[10px] text-[#86868B]">{stat.unit}</span>
              </div>
              <p className="text-[10px] text-[#86868B] mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="px-6 mb-6">
        <div className="rounded-xl border border-[#D2D2D7] p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#FF9500]" />
              <h3 className="text-sm font-semibold text-[#1D1D1F]">我的成就</h3>
            </div>
            <span className="text-[10px] text-[#86868B]">3/6 已解锁</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {achievements.map((ach, index) => (
              <div
                key={index}
                className={`text-center p-2.5 rounded-lg transition-all ${
                  ach.done ? "bg-[#F5F5F7]" : "bg-[#F5F5F7] opacity-40"
                }`}
              >
                <span className="text-xl">{ach.icon}</span>
                <p className="text-[10px] text-[#1D1D1F] mt-1 leading-tight">{ach.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Body data */}
      <div className="px-6 mb-6">
        <div className="rounded-xl border border-[#D2D2D7] p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-[#1D1D1F]">身体数据</h3>
            <button className="text-[10px] text-[#C45A2C]">编辑</button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {bodyData.map((data, index) => (
              <div key={index} className="text-center p-2 bg-[#F5F5F7] rounded-lg">
                <p className="text-sm font-bold text-[#1D1D1F]">{data.value}</p>
                <p className="text-[9px] text-[#86868B]">{data.unit}</p>
                <p className="text-[10px] text-[#86868B] mt-0.5">{data.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Menu sections */}
      {menuSections.map((section, si) => (
        <div key={si} className="px-6 mb-4">
          <div className="rounded-xl border border-[#D2D2D7] overflow-hidden">
            {section.items.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3.5 hover:bg-[#F5F5F7] transition-colors border-b border-[#F5F5F7] last:border-b-0"
              >
                <div className="w-8 h-8 rounded-lg bg-[#F5F5F7] flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-[#1D1D1F]" />
                </div>
                <span className="flex-1 text-sm text-[#1D1D1F]">{item.label}</span>
                {"desc" in item && item.desc && (
                  <span className="text-[10px] text-[#86868B]">{item.desc}</span>
                )}
                <ChevronRight className="w-4 h-4 text-[#D2D2D7]" />
              </Link>
            ))}
          </div>
        </div>
      ))}

      {/* Logout */}
      <div className="px-6 mt-2">
        <button className="w-full py-3 rounded-xl border border-[#D2D2D7] text-sm text-[#86868B] hover:bg-[#F5F5F7] transition-colors flex items-center justify-center gap-2">
          <LogOut className="w-4 h-4" />
          退出登录
        </button>
      </div>
    </div>
  );
}
