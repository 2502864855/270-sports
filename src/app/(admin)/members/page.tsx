'use client';

import { useState } from 'react';
import { Search, MoreVertical, Crown, Star } from 'lucide-react';

// 会员数据
const initialMembers = [
  { id: 1, name: '小鹿', phone: '138****1234', level: '钻石', joinDate: '2024-01-15', expiryDate: '2026-01-15', totalSpent: '¥28,999', status: '活跃' },
  { id: 2, name: 'Amy', phone: '139****5678', level: '金卡', joinDate: '2024-03-20', expiryDate: '2025-09-20', totalSpent: '¥12,999', status: '活跃' },
  { id: 3, name: '王小花', phone: '137****9012', level: '银卡', joinDate: '2024-06-10', expiryDate: '2025-06-10', totalSpent: '¥5,999', status: '即将到期' },
  { id: 4, name: '陈女士', phone: '136****3456', level: '普通', joinDate: '2024-09-01', expiryDate: '-', totalSpent: '¥1,280', status: '活跃' },
  { id: 5, name: '林小姐', phone: '135****7890', level: '金卡', joinDate: '2023-12-05', expiryDate: '2025-12-05', totalSpent: '¥18,999', status: '活跃' },
];

const levelColors: Record<string, string> = {
  '钻石': '#A855F7',
  '金卡': '#F59E0B',
  '银卡': '#94A3B8',
  '普通': '#6B7280',
};

export default function MembersManagementPage() {
  const [members] = useState(initialMembers);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="p-8">
      {/* 页面标题 */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">会员管理</h1>
          <p className="text-sm text-white/40">管理所有会员信息</p>
        </div>
      </div>

      {/* 搜索栏 */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
          <input
            type="text"
            placeholder="搜索会员姓名或手机号..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg text-sm text-white focus:outline-none"
            style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
          />
        </div>
      </div>

      {/* 会员列表 */}
      <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.04]">
              <th className="text-left text-xs text-white/40 font-medium p-4">会员</th>
              <th className="text-left text-xs text-white/40 font-medium p-4">手机号</th>
              <th className="text-left text-xs text-white/40 font-medium p-4">等级</th>
              <th className="text-left text-xs text-white/40 font-medium p-4">加入日期</th>
              <th className="text-left text-xs text-white/40 font-medium p-4">到期日期</th>
              <th className="text-left text-xs text-white/40 font-medium p-4">累计消费</th>
              <th className="text-left text-xs text-white/40 font-medium p-4">状态</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium" style={{ backgroundColor: `${levelColors[member.level]}20`, color: levelColors[member.level] }}>
                      {member.name[0]}
                    </div>
                    <span className="text-sm text-white font-medium">{member.name}</span>
                  </div>
                </td>
                <td className="p-4 text-sm text-white/60">{member.phone}</td>
                <td className="p-4">
                  <div className="flex items-center gap-1.5">
                    {member.level === '钻石' && <Crown size={14} style={{ color: levelColors[member.level] }} />}
                    {member.level === '金卡' && <Star size={14} style={{ color: levelColors[member.level] }} />}
                    <span className="text-sm font-medium" style={{ color: levelColors[member.level] }}>
                      {member.level}
                    </span>
                  </div>
                </td>
                <td className="p-4 text-sm text-white/60">{member.joinDate}</td>
                <td className="p-4 text-sm text-white/60">{member.expiryDate}</td>
                <td className="p-4 text-sm text-white font-medium">{member.totalSpent}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs ${
                    member.status === '活跃'
                      ? 'text-green-400 bg-green-400/10'
                      : 'text-yellow-400 bg-yellow-400/10'
                  }`}>
                    {member.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
