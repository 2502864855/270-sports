'use client';

import { useState } from 'react';
import { Play, Clock, Users, Star, Filter, ChevronDown } from 'lucide-react';

const categories = ['全部', '有氧燃脂', '力量训练', '瑜伽拉伸', 'HIIT', '普拉提'];

const courses = [
  {
    id: 1,
    title: 'HIIT 全身燃脂挑战',
    instructor: '李教练',
    avatar: '👨‍🏫',
    duration: '30 min',
    level: '中级',
    calories: '350 kcal',
    rating: 4.9,
    students: 2341,
    category: 'HIIT',
    gradient: 'from-orange-400 to-red-500',
    emoji: '🔥',
  },
  {
    id: 2,
    title: '核心力量 28 天计划',
    instructor: '王教练',
    avatar: '👩‍🏫',
    duration: '25 min',
    level: '初级',
    calories: '200 kcal',
    rating: 4.8,
    students: 1856,
    category: '力量训练',
    gradient: 'from-blue-400 to-indigo-500',
    emoji: '💪',
  },
  {
    id: 3,
    title: '晨间瑜伽唤醒',
    instructor: '张教练',
    avatar: '🧘',
    duration: '20 min',
    level: '全级别',
    calories: '120 kcal',
    rating: 4.9,
    students: 3102,
    category: '瑜伽拉伸',
    gradient: 'from-green-400 to-teal-500',
    emoji: '🧘',
  },
  {
    id: 4,
    title: '跑步耐力提升',
    instructor: '赵教练',
    avatar: '🏃',
    duration: '40 min',
    level: '高级',
    calories: '450 kcal',
    rating: 4.7,
    students: 987,
    category: '有氧燃脂',
    gradient: 'from-purple-400 to-pink-500',
    emoji: '🏃',
  },
  {
    id: 5,
    title: '普拉提基础入门',
    instructor: '刘教练',
    avatar: '💃',
    duration: '35 min',
    level: '初级',
    calories: '180 kcal',
    rating: 4.8,
    students: 1543,
    category: '普拉提',
    gradient: 'from-pink-400 to-rose-500',
    emoji: '🤸',
  },
  {
    id: 6,
    title: '上肢力量强化',
    instructor: '陈教练',
    avatar: '🏋️',
    duration: '30 min',
    level: '中级',
    calories: '280 kcal',
    rating: 4.6,
    students: 1234,
    category: '力量训练',
    gradient: 'from-amber-400 to-orange-500',
    emoji: '🏋️',
  },
];

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState('全部');

  const filteredCourses = activeCategory === '全部'
    ? courses
    : courses.filter(c => c.category === activeCategory);

  return (
    <div className="px-4 pt-6 animate-float-up">
      {/* Header */}
      <h1 className="text-xl font-bold text-[#1A1A2E] mb-1">训练课程</h1>
      <p className="text-sm text-gray-500 mb-5">专业教练带你科学训练</p>

      {/* Categories */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'brand-gradient text-white shadow-sm'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured Course */}
      <div className="bg-gradient-to-br from-[#FF6B35] to-[#FF8F65] rounded-2xl p-5 text-white mb-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-10 translate-x-10" />
        <div className="relative z-10">
          <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">推荐课程</span>
          <h3 className="text-lg font-bold mt-2">270 燃脂挑战赛</h3>
          <p className="text-sm text-white/80 mt-1">270 分钟挑战 · 21 天养成运动习惯</p>
          <div className="flex items-center gap-4 mt-3 text-sm">
            <span className="flex items-center gap-1"><Users size={14} /> 5,678 人参与</span>
            <span className="flex items-center gap-1"><Star size={14} /> 4.9 分</span>
          </div>
          <button className="mt-3 bg-white text-[#FF6B35] px-5 py-2 rounded-xl text-sm font-semibold hover:bg-white/90 transition-colors">
            立即参加
          </button>
        </div>
      </div>

      {/* Course List */}
      <div className="space-y-3">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
          >
            <div className="flex items-start gap-3">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${course.gradient} flex items-center justify-center text-2xl flex-shrink-0`}>
                {course.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-[#1A1A2E] truncate">{course.title}</h3>
                <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                  {course.avatar} {course.instructor}
                </p>
                <div className="flex items-center gap-3 mt-2 text-[11px] text-gray-400">
                  <span className="flex items-center gap-0.5"><Clock size={11} /> {course.duration}</span>
                  <span className="flex items-center gap-0.5"><Users size={11} /> {course.students}</span>
                  <span className="flex items-center gap-0.5"><Star size={11} className="text-yellow-400" /> {course.rating}</span>
                </div>
              </div>
              <button className="w-9 h-9 rounded-full brand-gradient flex items-center justify-center text-white shadow-sm flex-shrink-0 mt-1">
                <Play size={14} />
              </button>
            </div>
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-50">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FF6B35]/10 text-[#FF6B35]">{course.level}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#4ECDC4]/10 text-[#4ECDC4]">{course.calories}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
