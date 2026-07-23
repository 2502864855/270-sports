'use client';

import {
  Users,
  UserPlus,
  Activity,
  Crown,
  TrendingUp,
  Calendar,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';

// 核心指标数据
const metrics = [
  {
    label: '总用户数',
    value: '1,286',
    change: '+12.5%',
    trend: 'up' as const,
    icon: Users,
    color: '#C45A2C',
  },
  {
    label: '今日新增',
    value: '28',
    change: '+8.2%',
    trend: 'up' as const,
    icon: UserPlus,
    color: '#22C55E',
  },
  {
    label: '活跃用户',
    value: '856',
    change: '-3.1%',
    trend: 'down' as const,
    icon: Activity,
    color: '#3B82F6',
  },
  {
    label: 'VIP 会员',
    value: '423',
    change: '+15.8%',
    trend: 'up' as const,
    icon: Crown,
    color: '#A855F7',
  },
];

// 课程预约数据
const courseMetrics = [
  { label: '今日预约', value: '156', change: '+22%' },
  { label: '本周完课', value: '892', change: '+18%' },
  { label: '完课率', value: '94.2%', change: '+2.1%' },
];

// 营收数据
const revenueMetrics = [
  { label: '今日营收', value: '¥12,680', change: '+28%' },
  { label: '本周营收', value: '¥86,420', change: '+15%' },
  { label: '本月营收', value: '¥328,500', change: '+22%' },
];

// 最近订单
const recentOrders = [
  { id: 'ORD-001', user: '小鹿', type: '课程', item: '普拉提核心塑形', amount: '¥128', status: '已完成', time: '10:30' },
  { id: 'ORD-002', user: 'Amy', type: '会员', item: '钻石年卡', amount: '¥8,999', status: '已完成', time: '09:15' },
  { id: 'ORD-003', user: '王小花', type: '课程', item: '流瑜伽·晨光序列', amount: '¥98', status: '待确认', time: '昨天' },
  { id: 'ORD-004', user: '陈女士', type: '会员', item: '金卡季卡', amount: '¥2,999', status: '已完成', time: '昨天' },
];

export default function AdminDashboardPage() {
  return (
    <div className="p-8">
      {/* 页面标题 */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">数据看板</h1>
        <p className="text-sm text-white/40">实时查看平台运营数据</p>
      </div>

      {/* 核心指标卡片 */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="p-6 rounded-xl"
            style={{
              backgroundColor: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${metric.color}15` }}>
                <metric.icon size={20} style={{ color: metric.color }} />
              </div>
              <div className={`flex items-center gap-1 text-xs ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                {metric.trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {metric.change}
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
            <div className="text-xs text-white/40">{metric.label}</div>
          </div>
        ))}
      </div>

      {/* 课程与营收数据 */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {/* 课程数据 */}
        <div className="p-6 rounded-xl" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <h3 className="text-sm font-medium text-white/60 mb-4 flex items-center gap-2">
            <Calendar size={16} />
            课程数据
          </h3>
          <div className="space-y-4">
            {courseMetrics.map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-sm text-white/50">{item.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-white">{item.value}</span>
                  <span className="text-xs text-green-400">{item.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 营收数据 */}
        <div className="p-6 rounded-xl" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <h3 className="text-sm font-medium text-white/60 mb-4 flex items-center gap-2">
            <DollarSign size={16} />
            营收数据
          </h3>
          <div className="space-y-4">
            {revenueMetrics.map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-sm text-white/50">{item.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-white">{item.value}</span>
                  <span className="text-xs text-green-400">{item.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 最近订单 */}
      <div className="p-6 rounded-xl" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <h3 className="text-sm font-medium text-white/60 mb-4 flex items-center gap-2">
          <TrendingUp size={16} />
          最近订单
        </h3>
        <div className="space-y-3">
          {recentOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium" style={{ backgroundColor: 'rgba(196,90,44,0.15)', color: '#C45A2C' }}>
                  {order.user[0]}
                </div>
                <div>
                  <p className="text-sm text-white">{order.user}</p>
                  <p className="text-xs text-white/30">{order.item}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-white">{order.amount}</p>
                <p className="text-xs text-white/30">{order.time}</p>
              </div>
              <span className={`px-2 py-1 rounded text-xs ${
                order.status === '已完成' ? 'text-green-400 bg-green-400/10' : 'text-yellow-400 bg-yellow-400/10'
              }`}>
                {order.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
