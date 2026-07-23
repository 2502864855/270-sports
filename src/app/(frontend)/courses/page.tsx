'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Clock, MapPin, Users, ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

const categories = ['全部', '普拉提', '瑜伽', '女性力量', '孕产修复', '体态管理'];

const coursesData = [
  { id: 1, name: '普拉提核心床入门', coach: '林悦', time: '周一/三/五 10:00', location: 'A101', price: 199, memberPrice: 149, spots: 4, category: '普拉提', difficulty: '入门', img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80' },
  { id: 2, name: '流瑜伽基础', coach: '陈雨桐', time: '周二/四 09:00', location: 'B201', price: 159, memberPrice: 119, spots: 8, category: '瑜伽', difficulty: '入门', img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80' },
  { id: 3, name: '女性力量塑形', coach: '王思琪', time: '周一/三 18:00', location: 'C301', price: 179, memberPrice: 129, spots: 6, category: '女性力量', difficulty: '进阶', img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80' },
  { id: 4, name: '孕产修复瑜伽', coach: '林悦', time: '周六 14:00', location: 'A102', price: 229, memberPrice: 179, spots: 3, category: '孕产修复', difficulty: '全级别', img: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=600&q=80' },
  { id: 5, name: '体态管理精品课', coach: '陈雨桐', time: '周五 15:00', location: 'B202', price: 189, memberPrice: 139, spots: 5, category: '体态管理', difficulty: '入门', img: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&q=80' },
  { id: 6, name: '高级普拉提', coach: '林悦', time: '周二/四 19:00', location: 'A101', price: 259, memberPrice: 199, spots: 2, category: '普拉提', difficulty: '高级', img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80' },
];

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState('全部');

  const filtered = activeCategory === '全部'
    ? coursesData
    : coursesData.filter(c => c.category === activeCategory);

  return (
    <div className="pt-24 pb-20 px-5 md:px-10">
      <div className="mx-auto max-w-[1240px]">
        {/* Header */}
        <Reveal>
          <p className="text-[12px] font-semibold tracking-[0.2em] uppercase text-gray-400 mb-4">Courses</p>
          <h1 className="text-[30px] md:text-[56px] font-bold text-gray-900 leading-[1.05] tracking-[-0.02em] mb-4">课程预约</h1>
          <p className="text-[17px] text-gray-500 max-w-lg mb-10">专为女性设计的课程体系，从入门到进阶，找到适合你的运动节奏。</p>
        </Reveal>

        {/* Category Tabs - Underline Style */}
        <Reveal delay={1}>
          <div className="flex gap-6 border-b border-gray-200 mb-10 overflow-x-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`tab-underline whitespace-nowrap text-[15px] pb-3 ${activeCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((course, i) => (
            <Reveal key={course.id} delay={Math.min(i + 1, 4)}>
              <div className="card group overflow-hidden">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img src={course.img} alt={course.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  {course.spots <= 3 && (
                    <span className="absolute top-3 right-3 bg-gray-900 text-white text-[11px] font-medium px-2.5 py-1 rounded">
                      仅剩{course.spots}位
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded flex-shrink-0">{course.difficulty}</span>
                    <span className="text-[11px] text-gray-400 truncate">{course.category}</span>
                  </div>
                  <h3 className="text-[17px] font-semibold text-gray-900 mb-2 truncate">{course.name}</h3>
                  <div className="space-y-1.5 mb-4">
                    <p className="flex items-center gap-1.5 text-[13px] text-gray-500">
                      <Clock size={13} className="flex-shrink-0" /> <span className="truncate">{course.time}</span>
                    </p>
                    <p className="flex items-center gap-1.5 text-[13px] text-gray-500">
                      <MapPin size={13} className="flex-shrink-0" /> <span className="truncate">{course.location}</span>
                    </p>
                    <p className="flex items-center gap-1.5 text-[13px] text-gray-500">
                      <Users size={13} className="flex-shrink-0" /> <span className="truncate">{course.coach}</span>
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100 gap-2">
                    <div className="flex items-baseline gap-2 min-w-0">
                      <span className="text-[13px] text-gray-400 line-through flex-shrink-0">¥{course.price}</span>
                      <span className="text-[18px] font-bold flex-shrink-0" style={{ color: '#C45A2C', fontFamily: 'Inter' }}>¥{course.memberPrice}</span>
                    </div>
                    <button className="btn-primary h-9 px-4 text-[13px] font-medium flex-shrink-0">预约</button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
