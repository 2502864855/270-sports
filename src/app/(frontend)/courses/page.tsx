"use client";

import { useState } from "react";
import {
  Clock, Users, Star, MapPin, ChevronRight, Filter,
  X, Calendar, Check, ChevronDown
} from "lucide-react";

const categories = ["全部", "普拉提", "瑜伽", "女性力量", "孕产修复", "体态管理"];
const difficulties = ["全部难度", "入门", "初级", "中级", "高级"];
const timeSlots = ["全部时间", "上午", "下午", "晚上"];

const allCourses = [
  { id: 1, name: "普拉提核心床入门", coach: "林悦", time: "周一 10:00", duration: "50min", location: "2F 普拉提室", price: 199, memberPrice: 159, spots: 3, total: 8, category: "普拉提", difficulty: "入门", rating: 4.9, reviews: 128, image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80", desc: "使用普拉提核心床进行基础训练，精准激活深层肌肉，改善体态，适合零基础学员。", suitable: "零基础、久坐办公、想改善体态的女性" },
  { id: 2, name: "流瑜伽 · 晨间唤醒", coach: "苏晴", time: "周二 09:00", duration: "60min", location: "2F 瑜伽室", price: 149, memberPrice: 119, spots: 5, total: 12, category: "瑜伽", difficulty: "初级", rating: 4.8, reviews: 96, image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80", desc: "通过流畅的瑜伽体式串联，唤醒身体能量，开启充满活力的一天。", suitable: "有一定瑜伽基础、希望提升活力的女性" },
  { id: 3, name: "女性力量塑形", coach: "张诗涵", time: "周三 19:00", duration: "55min", location: "1F 训练区", price: 179, memberPrice: 139, spots: 6, total: 10, category: "女性力量", difficulty: "中级", rating: 4.9, reviews: 87, image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80", desc: "专为女性设计的力量训练课程，使用轻器械和自重训练，塑造优美线条。", suitable: "有一定运动基础、想塑形增肌的女性" },
  { id: 4, name: "孕产修复瑜伽", coach: "陈雨桐", time: "周四 10:30", duration: "45min", location: "2F 瑜伽室", price: 229, memberPrice: 183, spots: 2, total: 6, category: "孕产修复", difficulty: "入门", rating: 5.0, reviews: 64, image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400&q=80", desc: "针对孕期和产后女性的专业修复课程，安全温和，帮助恢复身体状态。", suitable: "孕期16周以上或产后3个月以上的女性" },
  { id: 5, name: "体态管理 · 肩颈专项", coach: "林悦", time: "周五 14:00", duration: "50min", location: "2F 普拉提室", price: 199, memberPrice: 159, spots: 4, total: 8, category: "体态管理", difficulty: "入门", rating: 4.8, reviews: 112, image: "https://images.unsplash.com/photo-1574680096145-d05b4564568e?w=400&q=80", desc: "针对圆肩、驼背、颈前伸等常见体态问题，通过精准训练改善姿态。", suitable: "长期伏案办公、有体态困扰的女性" },
  { id: 6, name: "阴瑜伽 · 深度放松", coach: "苏晴", time: "周六 20:00", duration: "70min", location: "2F 瑜伽室", price: 149, memberPrice: 119, spots: 8, total: 12, category: "瑜伽", difficulty: "入门", rating: 4.9, reviews: 143, image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=80", desc: "缓慢深入的阴瑜伽练习，每个体式保持3-5分钟，深度拉伸筋膜，放松身心。", suitable: "所有女性，特别适合压力大、睡眠不佳者" },
];

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState("全部");
  const [selectedDifficulty, setSelectedDifficulty] = useState("全部难度");
  const [selectedTime, setSelectedTime] = useState("全部时间");
  const [showDetail, setShowDetail] = useState<number | null>(null);
  const [showFilter, setShowFilter] = useState(false);
  const [booked, setBooked] = useState<number[]>([]);

  const filtered = allCourses.filter((c) => {
    if (activeCategory !== "全部" && c.category !== activeCategory) return false;
    if (selectedDifficulty !== "全部难度" && c.difficulty !== selectedDifficulty) return false;
    return true;
  });

  const detail = showDetail !== null ? allCourses.find((c) => c.id === showDetail) : null;

  const handleBook = (id: number) => {
    if (booked.includes(id)) {
      setBooked(booked.filter((b) => b !== id));
    } else {
      setBooked([...booked, id]);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF5F0] pb-20">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-[#FDF5F0]/90 backdrop-blur-md px-6 pt-4 pb-3">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-serif text-[#3A2E2A]">课程预约</h1>
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white shadow-sm text-xs text-[#7A6B66]"
          >
            <Filter className="w-3.5 h-3.5" />
            筛选
          </button>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-[#D4859B] text-white shadow-sm shadow-[#D4859B]/20"
                  : "bg-white text-[#7A6B66] hover:bg-[#FDF0F0]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filter panel */}
        {showFilter && (
          <div className="mt-3 p-4 bg-white rounded-[16px] shadow-sm animate-float-up">
            <div className="flex gap-3">
              <div className="flex-1">
                <p className="text-[10px] text-[#7A6B66] mb-1.5">难度</p>
                <div className="flex flex-wrap gap-1.5">
                  {difficulties.map((d) => (
                    <button
                      key={d}
                      onClick={() => setSelectedDifficulty(d)}
                      className={`px-2.5 py-1 rounded-full text-[10px] transition-all ${
                        selectedDifficulty === d
                          ? "bg-[#D4859B] text-white"
                          : "bg-[#FDF0F0] text-[#7A6B66]"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Course list */}
      <div className="px-6 pt-3 space-y-3">
        {filtered.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-[20px] overflow-hidden shadow-sm shadow-[#D4859B]/5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
          >
            <div className="flex gap-3 p-4">
              <div className="w-20 h-20 rounded-[14px] overflow-hidden flex-shrink-0">
                <img src={course.image} alt={course.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-[#3A2E2A] text-sm font-medium truncate">{course.name}</h3>
                  <span className={`flex-shrink-0 text-[10px] px-2 py-0.5 rounded-full ${
                    course.spots <= 3 ? "bg-red-50 text-red-400" : "bg-[#F0FAF5] text-[#A8D5BA]"
                  }`}>
                    余{course.spots}位
                  </span>
                </div>
                <p className="text-[#7A6B66] text-xs mt-1">{course.coach} · {course.duration}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <div className="flex items-center gap-0.5">
                    <Star className="w-3 h-3 fill-[#C9A96E] text-[#C9A96E]" />
                    <span className="text-[10px] text-[#C9A96E]">{course.rating}</span>
                  </div>
                  <span className="text-[10px] text-[#B8A8A4]">({course.reviews}条评价)</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[#D4859B] text-base font-serif">¥{course.memberPrice}</span>
                    <span className="text-[#B8A8A4] text-[10px] line-through">¥{course.price}</span>
                  </div>
                  <button
                    onClick={() => setShowDetail(course.id)}
                    className="text-[10px] text-[#D4859B] font-medium flex items-center gap-0.5"
                  >
                    详情 <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Course detail modal */}
      {detail && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setShowDetail(null)} />
          <div className="relative w-full max-w-[480px] bg-white rounded-t-[24px] max-h-[85vh] overflow-y-auto animate-float-up">
            <div className="relative h-48">
              <img src={detail.image} alt={detail.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <button
                onClick={() => setShowDetail(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
              >
                <X className="w-4 h-4 text-white" />
              </button>
              <div className="absolute bottom-4 left-4 right-4">
                <h2 className="text-white text-lg font-serif">{detail.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-white/80 text-xs">{detail.coach}</span>
                  <span className="text-white/60 text-xs">·</span>
                  <span className="text-white/80 text-xs">{detail.duration}</span>
                </div>
              </div>
            </div>

            <div className="p-5 space-y-4">
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded-full bg-[#FDF0F0] text-[#D4859B] text-[10px]">{detail.category}</span>
                <span className="px-2.5 py-1 rounded-full bg-[#F0FAF5] text-[#6BB89A] text-[10px]">{detail.difficulty}</span>
                <span className="px-2.5 py-1 rounded-full bg-[#FDF0F0] text-[#7A6B66] text-[10px]">{detail.duration}</span>
              </div>

              {/* Info */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 p-3 rounded-[12px] bg-[#FDF5F0]">
                  <Clock className="w-4 h-4 text-[#D4859B]" />
                  <div>
                    <p className="text-[10px] text-[#7A6B66]">时间</p>
                    <p className="text-xs text-[#3A2E2A]">{detail.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-[12px] bg-[#FDF5F0]">
                  <MapPin className="w-4 h-4 text-[#D4859B]" />
                  <div>
                    <p className="text-[10px] text-[#7A6B66]">地点</p>
                    <p className="text-xs text-[#3A2E2A]">{detail.location}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-sm font-medium text-[#3A2E2A] mb-2">课程介绍</h3>
                <p className="text-xs text-[#7A6B66] leading-relaxed">{detail.desc}</p>
              </div>

              {/* Suitable */}
              <div>
                <h3 className="text-sm font-medium text-[#3A2E2A] mb-2">适合人群</h3>
                <p className="text-xs text-[#7A6B66]">{detail.suitable}</p>
              </div>

              {/* Price & Book */}
              <div className="flex items-center justify-between pt-3 border-t border-[#F0E6E0]">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[#D4859B] text-xl font-serif">¥{detail.memberPrice}</span>
                  <span className="text-[#B8A8A4] text-xs line-through">¥{detail.price}</span>
                  <span className="text-[10px] text-[#C9A96E] ml-1">会员价</span>
                </div>
                <button
                  onClick={() => handleBook(detail.id)}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    booked.includes(detail.id)
                      ? "bg-[#A8D5BA] text-white"
                      : "bg-[#D4859B] text-white shadow-md shadow-[#D4859B]/20 hover:shadow-lg"
                  }`}
                >
                  {booked.includes(detail.id) ? "已预约" : "立即预约"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
