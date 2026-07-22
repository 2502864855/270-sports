"use client";

import { useState } from "react";
import {
  Clock, Star, MapPin, ChevronRight, Filter,
  X, Check
} from "lucide-react";

const categories = ["全部", "普拉提", "瑜伽", "女性力量", "孕产修复", "体态管理"];
const difficulties = ["全部难度", "入门", "初级", "中级", "高级"];

const allCourses = [
  { id: 1, name: "普拉提核心床入门", coach: "林悦", time: "周一 10:00", duration: "50min", location: "2F 普拉提室", price: 199, memberPrice: 159, spots: 3, total: 8, category: "普拉提", difficulty: "入门", rating: 4.9, reviews: 128, image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80", desc: "使用普拉提核心床进行基础训练，精准激活深层肌肉，改善体态，适合零基础学员。", suitable: "零基础、久坐办公、想改善体态的女性" },
  { id: 2, name: "流瑜伽 · 晨间唤醒", coach: "苏晴", time: "周二 09:00", duration: "60min", location: "2F 瑜伽室", price: 149, memberPrice: 119, spots: 5, total: 12, category: "瑜伽", difficulty: "初级", rating: 4.8, reviews: 96, image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80", desc: "通过流畅的瑜伽体式串联，唤醒身体能量，开启充满活力的一天。", suitable: "有一定瑜伽基础、希望提升活力的女性" },
  { id: 3, name: "女性力量塑形", coach: "张诗涵", time: "周三 19:00", duration: "55min", location: "1F 训练区", price: 179, memberPrice: 139, spots: 6, total: 10, category: "女性力量", difficulty: "中级", rating: 4.9, reviews: 87, image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80", desc: "专为女性设计的力量训练课程，使用轻器械和自重训练，塑造优美线条。", suitable: "有一定运动基础、想塑形增肌的女性" },
  { id: 4, name: "孕产修复瑜伽", coach: "陈雨桐", time: "周四 10:30", duration: "45min", location: "2F 瑜伽室", price: 229, memberPrice: 183, spots: 2, total: 6, category: "孕产修复", difficulty: "入门", rating: 5.0, reviews: 64, image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=600&q=80", desc: "针对孕期和产后女性的专业修复课程，安全温和，帮助恢复身体状态。", suitable: "孕期16周以上或产后3个月以上的女性" },
  { id: 5, name: "体态管理 · 肩颈专项", coach: "林悦", time: "周五 14:00", duration: "50min", location: "2F 普拉提室", price: 199, memberPrice: 159, spots: 4, total: 8, category: "体态管理", difficulty: "入门", rating: 4.8, reviews: 112, image: "https://images.unsplash.com/photo-1574680096145-d05b4564568e?w=600&q=80", desc: "针对圆肩、驼背、颈前伸等常见体态问题，通过精准训练改善姿态。", suitable: "长期伏案办公、有体态困扰的女性" },
  { id: 6, name: "阴瑜伽 · 深度放松", coach: "苏晴", time: "周六 20:00", duration: "70min", location: "2F 瑜伽室", price: 149, memberPrice: 119, spots: 8, total: 12, category: "瑜伽", difficulty: "入门", rating: 4.9, reviews: 143, image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80", desc: "缓慢深入的阴瑜伽练习，每个体式保持3-5分钟，深度拉伸筋膜，放松身心。", suitable: "所有女性，特别适合压力大、睡眠不佳者" },
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
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-6 pt-6 pb-3 border-b border-[#F5F5F7]">
        <h1 className="text-2xl font-bold tracking-tight text-[#1D1D1F] mb-4">课程</h1>
        <div className="flex items-center gap-2">
          <div className="flex gap-2 overflow-x-auto flex-1 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
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
            className="flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#F5F5F7] text-xs text-[#86868B]"
          >
            <Filter className="w-3.5 h-3.5" />
            筛选
          </button>
        </div>

        {showFilter && (
          <div className="mt-3 pb-2">
            <div className="flex flex-wrap gap-1.5">
              {difficulties.map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDifficulty(d)}
                  className={`px-3 py-1 rounded-full text-xs transition-colors ${
                    selectedDifficulty === d
                      ? "bg-[#C45A2C] text-white"
                      : "bg-[#F5F5F7] text-[#86868B]"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Course list */}
      <div className="px-6 pt-6 space-y-4">
        {filtered.map((course) => (
          <div
            key={course.id}
            onClick={() => setShowDetail(course.id)}
            className="card-hover group cursor-pointer rounded-xl border border-[#D2D2D7] overflow-hidden hover:border-[#C45A2C]/30 transition-colors"
          >
            <div className="flex gap-4 p-4">
              <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                <img src={course.image} alt={course.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[#1D1D1F] text-sm font-semibold truncate">{course.name}</h3>
                <p className="text-[#86868B] text-xs mt-1">{course.coach} · {course.duration}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <div className="flex items-center gap-0.5">
                    <Star className="w-3 h-3 fill-[#FF9500] text-[#FF9500]" />
                    <span className="text-[10px] text-[#1D1D1F]">{course.rating}</span>
                  </div>
                  <span className="text-[10px] text-[#86868B]">({course.reviews})</span>
                  {course.spots <= 3 && (
                    <span className="text-[10px] text-[#FF3B30]">余{course.spots}位</span>
                  )}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[#C45A2C] text-base font-semibold">¥{course.memberPrice}</span>
                    <span className="text-[#86868B] text-[10px] line-through">¥{course.price}</span>
                  </div>
                  <span className="text-[10px] text-[#C45A2C] font-medium flex items-center gap-0.5">
                    详情 <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Course detail modal */}
      {detail && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowDetail(null)} />
          <div className="relative w-full max-w-[480px] bg-white rounded-t-2xl max-h-[85vh] overflow-y-auto animate-float-up">
            <div className="relative h-52">
              <img src={detail.image} alt={detail.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <button
                onClick={() => setShowDetail(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center"
              >
                <X className="w-4 h-4 text-white" />
              </button>
              <div className="absolute bottom-4 left-5 right-5">
                <h2 className="text-white text-xl font-bold">{detail.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-white/80 text-sm">{detail.coach}</span>
                  <span className="text-white/50">·</span>
                  <span className="text-white/80 text-sm">{detail.duration}</span>
                </div>
              </div>
            </div>

            <div className="p-5 space-y-5">
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-[#F5F5F7] text-[#1D1D1F] text-xs">{detail.category}</span>
                <span className="px-3 py-1 rounded-full bg-[#F5F5F7] text-[#1D1D1F] text-xs">{detail.difficulty}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 p-3 rounded-lg bg-[#F5F5F7]">
                  <Clock className="w-4 h-4 text-[#C45A2C]" />
                  <div>
                    <p className="text-[10px] text-[#86868B]">时间</p>
                    <p className="text-xs text-[#1D1D1F]">{detail.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-[#F5F5F7]">
                  <MapPin className="w-4 h-4 text-[#C45A2C]" />
                  <div>
                    <p className="text-[10px] text-[#86868B]">地点</p>
                    <p className="text-xs text-[#1D1D1F]">{detail.location}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[#1D1D1F] mb-2">课程介绍</h3>
                <p className="text-sm text-[#86868B] leading-relaxed">{detail.desc}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[#1D1D1F] mb-2">适合人群</h3>
                <p className="text-sm text-[#86868B]">{detail.suitable}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#D2D2D7]">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[#C45A2C] text-2xl font-bold">¥{detail.memberPrice}</span>
                  <span className="text-[#86868B] text-xs line-through">¥{detail.price}</span>
                </div>
                <button
                  onClick={() => handleBook(detail.id)}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${
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
