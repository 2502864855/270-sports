'use client';

import { useState } from 'react';
import {
  Clock,
  Users,
  Star,
  MapPin,
  ChevronRight,
  Filter,
  Calendar,
  CheckCircle2,
  X,
} from 'lucide-react';

const categories = ['全部', '普拉提', '瑜伽', '女性力量', '孕产修复', '体态管理'];

const courses = [
  {
    id: 1,
    title: '普拉提核心塑形',
    instructor: '陈雨萱',
    avatar: '👩‍🦰',
    time: '周三 10:00-11:00',
    location: '万象城店 · 2F教室A',
    price: 128,
    memberPrice: 98,
    spots: 3,
    total: 8,
    level: '全级别',
    category: '普拉提',
    rating: 4.9,
    students: 256,
    emoji: '🌸',
    gradient: 'from-[#D4859B]/20 to-[#E8A0B5]/20',
    desc: '使用瑞士进口普拉提器械，针对核心肌群进行精准训练，改善体态，塑造优雅身姿。',
    suitable: '久坐办公族、体态不良、想增强核心力量',
  },
  {
    id: 2,
    title: '流瑜伽 · 晨光序列',
    instructor: '张诗涵',
    avatar: '🧘‍♀️',
    time: '周一/五 07:30-08:30',
    location: '万象城店 · 3F瑜伽房',
    price: 98,
    memberPrice: 78,
    spots: 5,
    total: 12,
    level: '初级',
    category: '瑜伽',
    rating: 4.9,
    students: 312,
    emoji: '🌅',
    gradient: 'from-[#7EC8B7]/20 to-[#A8DFD0]/20',
    desc: '以呼吸引领动作，在晨光中唤醒身体能量，开启美好的一天。',
    suitable: '所有女性，尤其适合初学者',
  },
  {
    id: 3,
    title: '女性力量 · 蜜桃臀',
    instructor: '林小雅',
    avatar: '👩',
    time: '周二/四 14:00-15:00',
    location: '万象城店 · 1F力量区',
    price: 138,
    memberPrice: 108,
    spots: 4,
    total: 10,
    level: '中级',
    category: '女性力量',
    rating: 4.8,
    students: 189,
    emoji: '💪',
    gradient: 'from-[#F08080]/20 to-[#E8A0B5]/20',
    desc: '专为女性设计的臀腿力量训练，科学发力，打造理想曲线。',
    suitable: '有一定运动基础，想塑形提臀',
  },
  {
    id: 4,
    title: '孕产修复 · 温柔恢复',
    instructor: '张诗涵',
    avatar: '🧘‍♀️',
    time: '周三/五 09:30-10:30',
    location: '万象城店 · 2F私教室',
    price: 168,
    memberPrice: 138,
    spots: 2,
    total: 6,
    level: '专属',
    category: '孕产修复',
    rating: 5.0,
    students: 87,
    emoji: '🤰',
    gradient: 'from-[#B8A9C9]/20 to-[#D4C5E0]/20',
    desc: '针对产后妈妈的温和修复课程，恢复腹直肌、盆底肌功能。',
    suitable: '产后3个月以上，经医生确认可以运动',
  },
  {
    id: 5,
    title: '体态管理 · 天鹅颈',
    instructor: '陈雨萱',
    avatar: '👩‍🦰',
    time: '周六 10:00-11:00',
    location: '万象城店 · 2F教室A',
    price: 118,
    memberPrice: 88,
    spots: 6,
    total: 8,
    level: '全级别',
    category: '体态管理',
    rating: 4.8,
    students: 145,
    emoji: '🦢',
    gradient: 'from-[#E8A0B5]/20 to-[#F5D5DE]/20',
    desc: '改善含胸驼背、头前伸等不良体态，塑造优雅天鹅颈和直角肩。',
    suitable: '长期伏案、手机族、希望改善体态',
  },
  {
    id: 6,
    title: '阴瑜伽 · 深度放松',
    instructor: '张诗涵',
    avatar: '🧘‍♀️',
    time: '周日 19:00-20:00',
    location: '万象城店 · 3F瑜伽房',
    price: 98,
    memberPrice: 78,
    spots: 8,
    total: 12,
    level: '全级别',
    category: '瑜伽',
    rating: 4.9,
    students: 203,
    emoji: '🌙',
    gradient: 'from-[#B8A9C9]/20 to-[#D4C5E0]/20',
    desc: '长时间保持体式，深入拉伸筋膜，释放身心压力，改善睡眠质量。',
    suitable: '压力大、失眠、需要深度放松',
  },
];

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState('全部');
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<typeof courses[0] | null>(null);
  const [booked, setBooked] = useState<Set<number>>(new Set());

  const filteredCourses = activeCategory === '全部'
    ? courses
    : courses.filter(c => c.category === activeCategory);

  const handleBook = (id: number) => {
    setBooked(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="px-4 pt-6 animate-float-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold text-[#3A2E2A]">课程预约</h1>
          <p className="text-xs text-[#8A7A74] mt-0.5">为她量身定制的运动课程</p>
        </div>
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center"
        >
          <Filter size={15} className="text-[#8A7A74]" />
        </button>
      </div>

      {/* Filter Panel */}
      {showFilter && (
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-4 animate-float-up">
          <p className="text-xs font-medium text-[#3A2E2A] mb-2">按难度筛选</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {['全级别', '初级', '中级', '高级'].map(level => (
              <button key={level} className="text-[11px] px-3 py-1 rounded-full bg-[#FDF0F0] text-[#8A7A74] hover:bg-[#D4859B]/10 hover:text-[#D4859B] transition-colors">
                {level}
              </button>
            ))}
          </div>
          <p className="text-xs font-medium text-[#3A2E2A] mb-2">按教练筛选</p>
          <div className="flex flex-wrap gap-2">
            {['陈雨萱', '林小雅', '张诗涵'].map(name => (
              <button key={name} className="text-[11px] px-3 py-1 rounded-full bg-[#FDF0F0] text-[#8A7A74] hover:bg-[#D4859B]/10 hover:text-[#D4859B] transition-colors">
                {name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'brand-gradient text-white shadow-sm'
                : 'bg-white text-[#8A7A74] hover:bg-[#FDF0F0]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Course List */}
      <div className="space-y-3">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden"
          >
            <div className="p-4">
              <div className="flex items-start gap-3">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${course.gradient} flex items-center justify-center text-2xl flex-shrink-0`}>
                  {course.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-[#3A2E2A]">{course.title}</h3>
                  <p className="text-[11px] text-[#8A7A74] mt-0.5 flex items-center gap-1">
                    {course.avatar} {course.instructor}
                  </p>
                  <div className="flex items-center gap-3 mt-1.5 text-[11px] text-[#8A7A74]">
                    <span className="flex items-center gap-0.5"><Clock size={11} /> {course.time}</span>
                    <span className="flex items-center gap-0.5"><MapPin size={11} /> {course.location.split('·')[0].trim()}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#F0E6E0]">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-[#D4859B]">¥{course.memberPrice}</span>
                  <span className="text-[10px] text-[#B8A8A4] line-through">¥{course.price}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#D4859B]/10 text-[#D4859B]">{course.level}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-[#F08080]">余{course.spots}位</span>
                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="text-[11px] px-3 py-1.5 rounded-full brand-gradient text-white shadow-sm"
                  >
                    预约
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Course Detail Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-[200] flex items-end justify-center">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setSelectedCourse(null)} />
          <div className="relative bg-white rounded-t-3xl w-full max-w-[480px] max-h-[80vh] overflow-y-auto animate-float-up">
            <div className="sticky top-0 bg-white/95 backdrop-blur-sm p-4 border-b border-[#F0E6E0] flex items-center justify-between z-10">
              <h3 className="font-semibold text-[#3A2E2A]">课程详情</h3>
              <button onClick={() => setSelectedCourse(null)} className="w-8 h-8 rounded-full bg-[#FDF0F0] flex items-center justify-center">
                <X size={16} className="text-[#8A7A74]" />
              </button>
            </div>
            <div className="p-4">
              <div className={`w-full h-32 rounded-2xl bg-gradient-to-br ${selectedCourse.gradient} flex items-center justify-center text-5xl mb-4`}>
                {selectedCourse.emoji}
              </div>
              <h2 className="text-lg font-bold text-[#3A2E2A]">{selectedCourse.title}</h2>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-[#8A7A74]">{selectedCourse.avatar} {selectedCourse.instructor}</span>
                <span className="flex items-center gap-0.5 text-xs text-[#FFB800]"><Star size={11} className="fill-[#FFB800]" /> {selectedCourse.rating}</span>
                <span className="text-xs text-[#8A7A74]">{selectedCourse.students}人已学</span>
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-2 text-xs text-[#4A4A4A]">
                  <Clock size={14} className="text-[#D4859B]" />
                  <span>{selectedCourse.time}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#4A4A4A]">
                  <MapPin size={14} className="text-[#D4859B]" />
                  <span>{selectedCourse.location}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#4A4A4A]">
                  <Users size={14} className="text-[#D4859B]" />
                  <span>剩余 {selectedCourse.spots}/{selectedCourse.total} 名额</span>
                </div>
              </div>

              <div className="mt-4 p-3 rounded-xl bg-[#FDF8F5]">
                <p className="text-xs font-medium text-[#3A2E2A] mb-1">课程介绍</p>
                <p className="text-xs text-[#4A4A4A] leading-relaxed">{selectedCourse.desc}</p>
              </div>

              <div className="mt-3 p-3 rounded-xl bg-[#FDF8F5]">
                <p className="text-xs font-medium text-[#3A2E2A] mb-1">适合人群</p>
                <p className="text-xs text-[#4A4A4A]">{selectedCourse.suitable}</p>
              </div>

              <div className="mt-5 flex items-center gap-3">
                <div>
                  <span className="text-xl font-bold text-[#D4859B]">¥{selectedCourse.memberPrice}</span>
                  <span className="text-xs text-[#B8A8A4] line-through ml-1">¥{selectedCourse.price}</span>
                  <p className="text-[10px] text-[#8A7A74]">会员价</p>
                </div>
                <div className="flex-1" />
                <button
                  onClick={() => { handleBook(selectedCourse.id); setSelectedCourse(null); }}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                    booked.has(selectedCourse.id)
                      ? 'bg-[#7EC8B7] text-white'
                      : 'brand-gradient text-white shadow-md'
                  }`}
                >
                  {booked.has(selectedCourse.id) ? '已预约' : '立即预约'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
