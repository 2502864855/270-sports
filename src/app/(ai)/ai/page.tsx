'use client';

import { useState } from 'react';
import {
  Brain,
  Activity,
  Users,
  TrendingUp,
  BarChart3,
  MessageSquare,
  Zap,
  ChevronRight,
  Target,
  AlertCircle,
  CheckCircle2,
  Clock,
  Crown,
  DollarSign,
} from 'lucide-react';

const aiInsights = [
  { type: 'warning', icon: AlertCircle, title: '会员活跃度下降预警', desc: '过去7天银卡会员运动频率下降18%，建议推送专属激励方案', color: '#F08080' },
  { type: 'success', icon: CheckCircle2, title: '普拉提课程完成率创新高', desc: '普拉提系列课程完成率达89%，用户满意度4.9分', color: '#7EC8B7' },
  { type: 'info', icon: Target, title: '孕产修复课程需求增长', desc: '孕产修复类课程搜索量增长45%，建议增加排课', color: '#B8A9C9' },
];

const userSegments = [
  { label: '高活跃会员', count: 456, percent: 45, color: '#7EC8B7' },
  { label: '中等活跃', count: 328, percent: 33, color: '#D4859B' },
  { label: '低活跃会员', count: 152, percent: 15, color: '#F08080' },
  { label: '沉默会员', count: 64, percent: 7, color: '#B8A9C9' },
];

const memberDistribution = [
  { level: '普通会员', count: 3200, color: '#7EC8B7', percent: 32 },
  { level: '银卡会员', count: 2800, color: '#B8A9C9', percent: 28 },
  { level: '金卡会员', count: 2500, color: '#D4859B', percent: 25 },
  { level: '钻石会员', count: 1500, color: '#F08080', percent: 15 },
];

const recentAlerts = [
  { time: '10:32', msg: '检测到3名金卡会员连续7天未运动，已触发关怀提醒', level: 'warning' },
  { time: '09:15', msg: 'AI已完成本周个性化训练计划生成（1,008份）', level: 'success' },
  { time: '08:40', msg: '新增56名会员完成注册，来源：小红书推广', level: 'info' },
  { time: '07:00', msg: '每日数据备份完成，会员数据同步至AI分析系统', level: 'success' },
];

const revenueData = [
  { month: '1月', value: 12.5 },
  { month: '2月', value: 15.2 },
  { month: '3月', value: 18.8 },
  { month: '4月', value: 16.3 },
  { month: '5月', value: 21.5 },
  { month: '6月', value: 24.1 },
  { month: '7月', value: 22.8 },
];

export default function AIDashboardPage() {
  const [activeSection, setActiveSection] = useState('overview');

  return (
    <div className="min-h-screen bg-[#2A2030] text-white">
      {/* Header */}
      <header className="border-b border-[#4A3E52] px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4859B] to-[#E8A0B5] flex items-center justify-center">
              <Brain size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold">270 AI 中枢</h1>
              <p className="text-xs text-[#B8A8A4]">智能分析与决策支持系统</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#362A3E] border border-[#4A3E52]">
              <div className="w-2 h-2 rounded-full bg-[#7EC8B7] animate-pulse" />
              <span className="text-xs text-[#B8A8A4]">AI 运行中</span>
            </div>
            <div className="text-xs text-[#B8A8A4]">
              <Clock size={12} className="inline mr-1" /> 最后更新: 2分钟前
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-56 border-r border-[#4A3E52] min-h-[calc(100vh-73px)] p-4">
          <nav className="space-y-1">
            {[
              { id: 'overview', icon: BarChart3, label: '数据总览' },
              { id: 'insights', icon: Brain, label: 'AI 洞察' },
              { id: 'members', icon: Crown, label: '会员分析' },
              { id: 'training', icon: Activity, label: '训练分析' },
              { id: 'nutrition', icon: Zap, label: '营养分析' },
              { id: 'revenue', icon: DollarSign, label: '收入分析' },
              { id: 'chat', icon: MessageSquare, label: 'AI 对话' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all ${
                    activeSection === item.id
                      ? 'bg-[#D4859B]/15 text-[#E8A0B5]'
                      : 'text-[#B8A8A4] hover:text-white hover:bg-[#362A3E]'
                  }`}
                >
                  <Icon size={16} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { label: '总会员数', value: '10,043', change: '+12.5%', icon: Users, color: '#D4859B' },
              { label: '今日活跃', value: '3,267', change: '+8.3%', icon: Activity, color: '#7EC8B7' },
              { label: '本月续费率', value: '68%', change: '+3.2%', icon: Crown, color: '#F08080' },
              { label: 'AI建议数', value: '856', change: '+22.1%', icon: Brain, color: '#B8A9C9' },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="dark-card rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <Icon size={18} style={{ color: stat.color }} />
                    <span className="text-[11px] text-[#7EC8B7] flex items-center gap-0.5">
                      <TrendingUp size={11} /> {stat.change}
                    </span>
                  </div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-[#B8A8A4] mt-1">{stat.label}</p>
                </div>
              );
            })}
          </div>

          {/* AI Insights + Member Distribution */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="dark-card rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Brain size={18} className="text-[#D4859B]" />
                <h2 className="font-semibold">AI 智能洞察</h2>
              </div>
              <div className="space-y-3">
                {aiInsights.map((insight, i) => {
                  const Icon = insight.icon;
                  return (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-[#2A2030]/50 border border-[#4A3E52]/50 hover:border-[#4A3E52] transition-colors">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${insight.color}15` }}>
                        <Icon size={14} style={{ color: insight.color }} />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{insight.title}</p>
                        <p className="text-xs text-[#B8A8A4] mt-0.5">{insight.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Member Distribution */}
            <div className="dark-card rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Crown size={18} className="text-[#E8A0B5]" />
                <h2 className="font-semibold">会员等级分布</h2>
              </div>
              <div className="space-y-4">
                {memberDistribution.map((item) => (
                  <div key={item.level}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm text-[#B8A8A4]">{item.level}</span>
                      <span className="text-sm font-medium" style={{ color: item.color }}>
                        {item.count.toLocaleString()} ({item.percent}%)
                      </span>
                    </div>
                    <div className="h-2 bg-[#2A2030] rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${item.percent}%`, backgroundColor: item.color }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-[#4A3E52]">
                <p className="text-xs text-[#B8A8A4]">AI 建议：金卡会员续费率稳定，建议加大钻石会员转化力度，预计可提升收入15%。</p>
              </div>
            </div>
          </div>

          {/* Revenue Trend + User Segments + Alerts */}
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 dark-card rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign size={18} className="text-[#7EC8B7]" />
                <h2 className="font-semibold">月度收入趋势（万元）</h2>
              </div>
              <div className="flex items-end gap-3 h-40">
                {revenueData.map((item, i) => {
                  const maxVal = Math.max(...revenueData.map(d => d.value));
                  const height = (item.value / maxVal) * 100;
                  const isMax = item.value === maxVal;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-[10px] text-[#B8A8A4]">{item.value}</span>
                      <div
                        className={`w-full rounded-t-md transition-all ${
                          isMax ? 'bg-gradient-to-t from-[#D4859B] to-[#E8A0B5]' : 'bg-[#362A3E]'
                        }`}
                        style={{ height: `${height}%` }}
                      />
                      <span className="text-[10px] text-[#B8A8A4]">{item.month}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="dark-card rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Zap size={18} className="text-[#B8A9C9]" />
                <h2 className="font-semibold">系统日志</h2>
              </div>
              <div className="space-y-3">
                {recentAlerts.map((alert, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-[10px] text-[#B8A8A4] mt-0.5 flex-shrink-0">{alert.time}</span>
                    <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                      alert.level === 'warning' ? 'bg-[#F08080]' :
                      alert.level === 'success' ? 'bg-[#7EC8B7]' : 'bg-[#D4859B]'
                    }`} />
                    <p className="text-xs text-[#B8A8A4] leading-relaxed">{alert.msg}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
