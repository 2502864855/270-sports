"use client";

import { useState } from "react";
import {
  Clock, Star, MapPin, ChevronRight, Filter,
  X, Check
} from "lucide-react";

const categories = ["全部", "普拉提", "瑜伽", "女性力量", "孕产修复", "体态管理"];
const difficulties = ["全部难度", "入门", "初级", "中级", "高级"];

const allCourses = [
  { id: 1, name: "普拉提核心床入门", coach: "林悦", time: "周一 10:00", duration: "50min", location: "2F 普拉提室", price: 199, memberPrice: 159, spots: 3, total: 8, category: "普拉提", difficulty: "入门", rating: 4.9, reviews: 128, image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80", desc: "使用普拉提核心床进行基础训练，精准激活深层肌肉，改善体态，适合零基础学员。", suitable: "零基础、久坐办公、想改善体态的女性" },
  { id: 2, name: "流瑜伽 · 晨间唤醒", coach: "苏晴", time: "周二 09:00", duration: "60min", location: "2F 瑜伽室", price: 149, memberPrice: 119, spots: 5, total: 12, category: "瑜伽", difficulty: "初级", rating: 4.8, reviews: 96, image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80", desc: "通过流畅的瑜伽体式串联，唤醒身体能量，开启充满活力的一天。", suitable: "有一定瑜伽基础、希望提升活力的女性" },
  { id: 3, name: "女性力量塑形", coach: "张诗涵", time: "周三 19:00", duration: "55min", location: "1F 训练区", price: 179, memberPrice: 139, spots: 6, total: 10, category: "女性力量", difficulty: "中级", rating: 4.9, reviews: 87, image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80", desc: "专为女性设计的力量训练课程，使用轻器械和自重训练，塑造优美线条。", suitable: "有一定运动基础、想塑形增肌的女性" },
  { id: 4, name: "孕产修复瑜伽", coach: "陈雨桐", time: "周四 10:30", duration: "45min", location: "2F 瑜伽室", price: 229, memberPrice: 183, spots: 2, total: 6, category: "孕产修复", difficulty: "入门", rating: 5.0, reviews: 64, image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800&q=80", desc: "针对孕期和产后女性的专业修复课程，安全温和，帮助恢复身体状态。", suitable: "孕期16周以上或产后3个月以上的女性" },
  { id: 5, name: "体态管理 · 肩颈专项", coach: "林悦", time: "周五 14:00", duration: "50min", location: "2F 普拉提室", price: 199, memberPrice: 159, spots: 4, total: 8, category: "体态管理", difficulty: "入门", rating: 4.8, reviews: 112, image: "https://images.unsplash.com/photo-1574680096145-d05b4564568e?w=800&q=80", desc: "针对圆肩、驼背、颈前伸等常见体态问题，通过精准训练改善姿态。", suitable: "长期伏案办公、有体态困扰的女性" },
  { id: 6, name: "阴瑜伽 · 深度放松", coach: "苏晴", time: "周六 20:00", duration: "70min", location: "2F 瑜伽室", price: 149, memberPrice: 119, spots: 8, total: 12, category: "瑜伽", difficulty: "入门", rating: 4.9, reviews: 143, image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80", desc: "缓慢深入的阴瑜伽练习，每个体式保持3-5分钟，深度拉伸筋膜，放松身心。", suitable: "所有女性，特别适合压力大、睡眠不佳者" },
];

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState("全部");
  const [selectedDifficulty, setSelectedDifficulty] = useState("全部难度");
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
    <div className="min-h-screen bg-white pb-24">
      {/* Hero Header - Apple style */}
      <div className="pt-16 pb-10 px-8 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-[#1D1D1F] mb-3">课程</h1>
        <p className="text-lg text-[#86868B]">找到适合你的运动方式</p>
      </div>

      {/* Filter Bar */}
      <div className="px-8 pb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex gap-2 overflow-x-auto flex-1 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-[#1D1D1F] text-white"
                    : "bg-[#F5F5F7] text-[#86868B] hover:bg-[#E5E5EA]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#F5F5F7] text-sm text-[#86868B] hover:bg-[#E5E5EA] transition-colors"
          >
            <Filter className="w-4 h-4" />
            筛选
          </button>
        </div>

        {showFilter && (
          <div className="flex flex-wrap gap-2 pb-4 border-b border-[#F5F5F7]">
            {difficulties.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDifficulty(d)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  selectedDifficulty === d
                    ? "bg-[#C45A2C] text-white"
                    : "bg-[#F5F5F7] text-[#86868B] hover:bg-[#E5E5EA]"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Course Cards - Large, spacious, Apple style */}
      <div className="px-8 space-y-6">
        {filtered.map((course, index) => (
          <div
            key={course.id}
            onClick={() => setShowDetail(course.id)}
            className="card-hover group cursor-pointer rounded-2xl overflow-hidden border border-[#D2D2D7]/50 bg-white"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Large image */}
            <div className="relative h-52 overflow-hidden">
              <img src={course.image} alt={course.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              {course.spots <= 3 && (
                <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 text-[#FF3B30] text-xs font-medium backdrop-blur-sm">
                  仅剩{course.spots}位
                </span>
              )}
              <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                <div>
                  <h3 className="text-white text-xl font-bold mb-1">{course.name}</h3>
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <span>{course.coach}</span>
                    <span className="text-white/40">·</span>
                    <span>{course.duration}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full">
                  <Star className="w-3.5 h-3.5 fill-[#FF9500] text-[#FF9500]" />
                  <span className="text-white text-xs font-medium">{course.rating}</span>
                </div>
              </div>
            </div>

            {/* Info bar */}
            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-[#86868B] text-sm">
                  <Clock className="w-4 h-4" />
                  <span>{course.time}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#86868B] text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{course.location}</span>
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-[#C45A2C] text-lg font-bold">¥{course.memberPrice}</span>
                <span className="text-[#86868B] text-xs line-through">¥{course.price}</span>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#86868B] text-lg">暂无符合条件的课程</p>
          </div>
        )}
      </div>

      {/* Course detail modal */}
      {detail && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowDetail(null)} />
          <div className="relative w-full max-w-[480px] bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto animate-float-up">
            <div className="relative h-64">
              <img src={detail.image} alt={detail.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <button
                onClick={() => setShowDetail(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center"
              >
                <X className="w-4 h-4 text-white" />
              </button>
              <div className="absolute bottom-5 left-6 right-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs">{detail.category}</span>
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs">{detail.difficulty}</span>
                </div>
                <h2 className="text-white text-2xl font-bold">{detail.name}</h2>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-white/80 text-sm">{detail.coach}</span>
                  <span className="text-white/40">·</span>
                  <span className="text-white/80 text-sm">{detail.duration}</span>
                  <span className="text-white/40">·</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-[#FF9500] text-[#FF9500]" />
                    <span className="text-white/80 text-sm">{detail.rating} ({detail.reviews})</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-[#F5F5F7]">
                  <Clock className="w-5 h-5 text-[#C45A2C]" />
                  <div>
                    <p className="text-xs text-[#86868B]">时间</p>
                    <p className="text-sm text-[#1D1D1F] font-medium">{detail.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-[#F5F5F7]">
                  <MapPin className="w-5 h-5 text-[#C45A2C]" />
                  <div>
                    <p className="text-xs text-[#86868B]">地点</p>
                    <p className="text-sm text-[#1D1D1F] font-medium">{detail.location}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-base font-semibold text-[#1D1D1F] mb-3">课程介绍</h3>
                <p className="text-[#86868B] leading-relaxed">{detail.desc}</p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-[#1D1D1F] mb-3">适合人群</h3>
                <p className="text-[#86868B] leading-relaxed">{detail.suitable}</p>
              </div>

              <div className="flex items-center justify-between pt-5 border-t border-[#F5F5F7]">
                <div className="flex items-baseline gap-2">
                  <span className="text-[#C45A2C] text-2xl font-bold">¥{detail.memberPrice}</span>
                  <span className="text-[#86868B] text-sm line-through">¥{detail.price}</span>
                </div>
                <button
                  onClick={() => handleBook(detail.id)}
                  className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 btn-scale ${
                    booked.includes(detail.id)
                      ? "bg-[#34C759] text-white"
                      : "bg-[#C45A2C] text-white hover:bg-[#D4612F]"
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
