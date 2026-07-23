'use client';

import { useState } from 'react';
import { Plus, Search, MoreVertical, Edit3, Trash2, Eye, EyeOff } from 'lucide-react';

// 课程数据
const initialCourses = [
  { id: 1, name: '普拉提核心塑形', category: '普拉提', coach: '李教练', price: 128, duration: '60min', status: '上架中', bookings: 156 },
  { id: 2, name: '流瑜伽·晨光序列', category: '瑜伽', coach: '王教练', price: 98, duration: '75min', status: '上架中', bookings: 89 },
  { id: 3, name: 'HIIT 燃脂训练', category: '团课', coach: '张教练', price: 88, duration: '45min', status: '上架中', bookings: 203 },
  { id: 4, name: '产后修复专项', category: '私教', coach: '刘教练', price: 298, duration: '60min', status: '已下架', bookings: 45 },
  { id: 5, name: '舞蹈有氧·拉丁', category: '舞蹈', coach: '陈教练', price: 108, duration: '60min', status: '上架中', bookings: 127 },
];

const categories = ['全部', '普拉提', '瑜伽', '团课', '私教', '舞蹈'];

export default function CoursesManagementPage() {
  const [courses, setCourses] = useState(initialCourses);
  const [activeCategory, setActiveCategory] = useState('全部');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleCourseStatus = (id: number) => {
    setCourses(courses.map(c =>
      c.id === id ? { ...c, status: c.status === '上架中' ? '已下架' : '上架中' } : c
    ));
  };

  return (
    <div className="p-8">
      {/* 页面标题 */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">课程管理</h1>
          <p className="text-sm text-white/40">管理所有课程信息</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all" style={{ background: 'linear-gradient(180deg, #D97A4A, #C45A2C, #A84A22)' }}>
          <Plus size={16} />
          添加课程
        </button>
      </div>

      {/* 筛选栏 */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex gap-1 p-1 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-md text-xs transition-all ${
                activeCategory === cat
                  ? 'text-white font-medium'
                  : 'text-white/40 hover:text-white/60'
              }`}
              style={activeCategory === cat ? { backgroundColor: 'rgba(196,90,44,0.15)' } : {}}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
          <input
            type="text"
            placeholder="搜索课程名称..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg text-sm text-white focus:outline-none"
            style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
          />
        </div>
      </div>

      {/* 课程列表 */}
      <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.04]">
              <th className="text-left text-xs text-white/40 font-medium p-4">课程名称</th>
              <th className="text-left text-xs text-white/40 font-medium p-4">分类</th>
              <th className="text-left text-xs text-white/40 font-medium p-4">教练</th>
              <th className="text-left text-xs text-white/40 font-medium p-4">价格</th>
              <th className="text-left text-xs text-white/40 font-medium p-4">时长</th>
              <th className="text-left text-xs text-white/40 font-medium p-4">预约数</th>
              <th className="text-left text-xs text-white/40 font-medium p-4">状态</th>
              <th className="text-right text-xs text-white/40 font-medium p-4">操作</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors">
                <td className="p-4 text-sm text-white font-medium">{course.name}</td>
                <td className="p-4">
                  <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: 'rgba(196,90,44,0.1)', color: '#C45A2C' }}>
                    {course.category}
                  </span>
                </td>
                <td className="p-4 text-sm text-white/60">{course.coach}</td>
                <td className="p-4 text-sm text-white font-medium">¥{course.price}</td>
                <td className="p-4 text-sm text-white/60">{course.duration}</td>
                <td className="p-4 text-sm text-white/60">{course.bookings}</td>
                <td className="p-4">
                  <button
                    onClick={() => toggleCourseStatus(course.id)}
                    className={`px-2 py-1 rounded text-xs ${
                      course.status === '上架中'
                        ? 'text-green-400 bg-green-400/10'
                        : 'text-white/30 bg-white/5'
                    }`}
                  >
                    {course.status}
                  </button>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 rounded hover:bg-white/5 transition-colors">
                      <Edit3 size={14} className="text-white/40" />
                    </button>
                    <button className="p-1.5 rounded hover:bg-white/5 transition-colors">
                      <Trash2 size={14} className="text-red-400/60" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
