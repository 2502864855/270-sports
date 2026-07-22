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
} from 'lucide-react';

const aiInsights = [
  {
    type: 'warning',
    icon: AlertCircle,
    title: '用户活跃度下降',
    desc: '过去7天有 23% 的用户运动频率下降，建议推送激励内容',
    color: '#FF6B35',
  },
  {
    type: 'success',
    icon: CheckCircle2,
    title: '课程完成率提升',
    desc: 'HIIT 系列课程完成率从 68% 提升至 82%，效果显著',
    color: '#00F5A0',
  },
  {
    type: 'info',
    icon: Target,
    title: '营养建议优化',
    desc: '基于用户反馈，建议增加素食选项和低碳水饮食方案',
    color: '#4ECDC4',
  },
];

const userSegments = [
  { label: '高活跃用户', count: 3456, percent: 35, color: '#00F5A0' },
  { label: '中等活跃', count: 4231, percent: 43, color: '#4ECDC4' },
  { label: '低活跃用户', count: 1567, percent: 16, color: '#FFD93D' },
  { label: '沉默用户', count: 589, percent: 6, color: '#FF6B35' },
];

const recentAlerts = [
  { time: '10:32', msg: '检测到异常训练数据（用户 #2341），已自动标记', level: 'warning' },
  { time: '09:15', msg: 'AI 模型已完成本周训练计划生成', level: 'success' },
  { time: '08:40', msg: '新增 128 名用户完成注册', level: 'info' },
  { time: '07:00', msg: '每日数据备份完成', level: 'success' },
];

export default function AIDashboardPage() {
  const [activeSection, setActiveSection] = useState('overview');

  return (
    <div className="min-h-screen bg-[#0F0F23] text-white">
      {/* Top Header */}
      <header className="border-b border-[#2D2D4A] px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4ECDC4] to-[#00F5A0] flex items-center justify-center">
              <Brain size={20} className="text-[#0F0F23]" />
            </div>
            <div>
              <h1 className="text-lg font-bold">270 AI 中枢</h1>
              <p className="text-xs text-gray-400">智能分析与决策支持系统</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1E1E3A] border border-[#2D2D4A]">
              <div className="w-2 h-2 rounded-full bg-[#00F5A0] animate-pulse" />
              <span className="text-xs text-gray-300">AI 运行中</span>
            </div>
            <div className="text-xs text-gray-400">
              <Clock size={12} className="inline mr-1" />
              最后更新: 2 分钟前
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-56 border-r border-[#2D2D4A] min-h-[calc(100vh-73px)] p-4">
          <nav className="space-y-1">
            {[
              { id: 'overview', icon: BarChart3, label: '数据总览' },
              { id: 'insights', icon: Brain, label: 'AI 洞察' },
              { id: 'users', icon: Users, label: '用户分析' },
              { id: 'training', icon: Activity, label: '训练分析' },
              { id: 'nutrition', icon: Zap, label: '营养分析' },
              { id: 'chat', icon: MessageSquare, label: 'AI 对话' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all ${
                    activeSection === item.id
                      ? 'bg-[#FF6B35]/10 text-[#FF6B35]'
                      : 'text-gray-400 hover:text-white hover:bg-[#1E1E3A]'
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
              { label: '总用户数', value: '9,843', change: '+12.5%', icon: Users, color: '#4ECDC4' },
              { label: '今日活跃', value: '3,267', change: '+8.3%', icon: Activity, color: '#00F5A0' },
              { label: '课程完成', value: '1,542', change: '+15.2%', icon: Target, color: '#FF6B35' },
              { label: 'AI 建议数', value: '856', change: '+22.1%', icon: Brain, color: '#FFD93D' },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="dark-card rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <Icon size={18} style={{ color: stat.color }} />
                    <span className="text-[11px] text-[#00F5A0] flex items-center gap-0.5">
                      <TrendingUp size={11} /> {stat.change}
                    </span>
                  </div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
                </div>
              );
            })}
          </div>

          {/* AI Insights */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="dark-card rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Brain size={18} className="text-[#4ECDC4]" />
                <h2 className="font-semibold">AI 智能洞察</h2>
              </div>
              <div className="space-y-3">
                {aiInsights.map((insight, i) => {
                  const Icon = insight.icon;
                  return (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 rounded-xl bg-[#0F0F23]/50 border border-[#2D2D4A]/50 hover:border-[#2D2D4A] transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${insight.color}15` }}>
                        <Icon size={14} style={{ color: insight.color }} />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{insight.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{insight.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* User Segments */}
            <div className="dark-card rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Users size={18} className="text-[#00F5A0]" />
                <h2 className="font-semibold">用户分层分析</h2>
              </div>
              <div className="space-y-4">
                {userSegments.map((seg) => (
                  <div key={seg.label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm text-gray-300">{seg.label}</span>
                      <span className="text-sm font-medium" style={{ color: seg.color }}>
                        {seg.count.toLocaleString()} ({seg.percent}%)
                      </span>
                    </div>
                    <div className="h-2 bg-[#0F0F23] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ width: `${seg.percent}%`, backgroundColor: seg.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-[#2D2D4A]">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">AI 建议</span>
                  <button className="text-xs text-[#4ECDC4] flex items-center gap-0.5">
                    查看详情 <ChevronRight size={12} />
                  </button>
                </div>
                <p className="text-xs text-gray-300 mt-1.5 leading-relaxed">
                  建议针对低活跃用户推送个性化激励方案，预计可提升活跃度 15-20%。
                </p>
              </div>
            </div>
          </div>

          {/* Activity Chart Placeholder + Alerts */}
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 dark-card rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Activity size={18} className="text-[#FF6B35]" />
                <h2 className="font-semibold">7 日趋势</h2>
              </div>
              <div className="flex items-end gap-3 h-40">
                {[65, 78, 55, 88, 92, 70, 85].map((val, i) => {
                  const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
                  const isMax = val === Math.max(65, 78, 55, 88, 92, 70, 85);
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-[10px] text-gray-400">{val}%</span>
                      <div
                        className={`w-full rounded-t-md transition-all ${
                          isMax ? 'bg-gradient-to-t from-[#FF6B35] to-[#FF8F65]' : 'bg-[#1E1E3A]'
                        }`}
                        style={{ height: `${val}%` }}
                      />
                      <span className="text-[10px] text-gray-500">{days[i]}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="dark-card rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Zap size={18} className="text-[#FFD93D]" />
                <h2 className="font-semibold">系统日志</h2>
              </div>
              <div className="space-y-3">
                {recentAlerts.map((alert, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-[10px] text-gray-500 mt-0.5 flex-shrink-0">{alert.time}</span>
                    <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                      alert.level === 'warning' ? 'bg-[#FF6B35]' :
                      alert.level === 'success' ? 'bg-[#00F5A0]' : 'bg-[#4ECDC4]'
                    }`} />
                    <p className="text-xs text-gray-300 leading-relaxed">{alert.msg}</p>
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
