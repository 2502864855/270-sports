'use client';

import { useState } from 'react';
import { Search, Filter } from 'lucide-react';

// 订单数据
const initialOrders = [
  { id: 'ORD-001', user: '小鹿', type: '课程', item: '普拉提核心塑形', amount: '¥128', status: '已完成', date: '2025-01-15 10:30' },
  { id: 'ORD-002', user: 'Amy', type: '会员', item: '钻石年卡', amount: '¥8,999', status: '已完成', date: '2025-01-15 09:15' },
  { id: 'ORD-003', user: '王小花', type: '课程', item: '流瑜伽·晨光序列', amount: '¥98', status: '待确认', date: '2025-01-14 16:20' },
  { id: 'ORD-004', user: '陈女士', type: '会员', item: '金卡季卡', amount: '¥2,999', status: '已完成', date: '2025-01-14 14:10' },
  { id: 'ORD-005', user: '林小姐', type: '课程', item: 'HIIT 燃脂训练', amount: '¥88', status: '已取消', date: '2025-01-14 11:30' },
  { id: 'ORD-006', user: '张小姐', type: '课程', item: '舞蹈有氧·拉丁', amount: '¥108', status: '已完成', date: '2025-01-13 18:00' },
];

const statusColors: Record<string, string> = {
  '已完成': 'text-green-400 bg-green-400/10',
  '待确认': 'text-yellow-400 bg-yellow-400/10',
  '已取消': 'text-red-400 bg-red-400/10',
};

export default function OrdersManagementPage() {
  const [orders] = useState(initialOrders);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="p-8">
      {/* 页面标题 */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">订单管理</h1>
          <p className="text-sm text-white/40">管理所有订单记录</p>
        </div>
      </div>

      {/* 筛选栏 */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
          <input
            type="text"
            placeholder="搜索订单号或用户..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg text-sm text-white focus:outline-none"
            style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-white/60 transition-colors" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <Filter size={16} />
          筛选
        </button>
      </div>

      {/* 订单列表 */}
      <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.04]">
              <th className="text-left text-xs text-white/40 font-medium p-4">订单号</th>
              <th className="text-left text-xs text-white/40 font-medium p-4">用户</th>
              <th className="text-left text-xs text-white/40 font-medium p-4">类型</th>
              <th className="text-left text-xs text-white/40 font-medium p-4">项目</th>
              <th className="text-left text-xs text-white/40 font-medium p-4">金额</th>
              <th className="text-left text-xs text-white/40 font-medium p-4">状态</th>
              <th className="text-left text-xs text-white/40 font-medium p-4">时间</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors">
                <td className="p-4 text-sm text-white font-mono">{order.id}</td>
                <td className="p-4 text-sm text-white">{order.user}</td>
                <td className="p-4">
                  <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: 'rgba(196,90,44,0.1)', color: '#C45A2C' }}>
                    {order.type}
                  </span>
                </td>
                <td className="p-4 text-sm text-white/60">{order.item}</td>
                <td className="p-4 text-sm text-white font-medium">{order.amount}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-4 text-sm text-white/40">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
