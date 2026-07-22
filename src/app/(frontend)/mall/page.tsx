'use client';

import { useState } from 'react';
import { ShoppingBag, Star, Heart, ShoppingCart, Search, Filter } from 'lucide-react';

const categories = ['推荐', '运动装备', '营养补给', '智能设备', '运动服饰'];

const products = [
  {
    id: 1,
    name: '专业跑步鞋 Air Max',
    price: 599,
    originalPrice: 799,
    rating: 4.8,
    sales: 2341,
    image: '👟',
    tag: '热卖',
    category: '运动装备',
  },
  {
    id: 2,
    name: '乳清蛋白粉 香草味 2kg',
    price: 298,
    originalPrice: 398,
    rating: 4.9,
    sales: 5678,
    image: '🥤',
    tag: '爆款',
    category: '营养补给',
  },
  {
    id: 3,
    name: '智能运动手环 Pro',
    price: 899,
    originalPrice: 1299,
    rating: 4.7,
    sales: 1234,
    image: '⌚',
    tag: '新品',
    category: '智能设备',
  },
  {
    id: 4,
    name: '瑜伽垫 TPE 加厚 6mm',
    price: 128,
    originalPrice: 168,
    rating: 4.8,
    sales: 3456,
    image: '🧘',
    tag: '好评',
    category: '运动装备',
  },
  {
    id: 5,
    name: '速干运动T恤',
    price: 159,
    originalPrice: 219,
    rating: 4.6,
    sales: 1890,
    image: '👕',
    tag: '',
    category: '运动服饰',
  },
  {
    id: 6,
    name: 'BCAA 支链氨基酸',
    price: 188,
    originalPrice: 258,
    rating: 4.7,
    sales: 2100,
    image: '💊',
    tag: '推荐',
    category: '营养补给',
  },
  {
    id: 7,
    name: '运动腰包防水款',
    price: 79,
    originalPrice: 119,
    rating: 4.5,
    sales: 4321,
    image: '👝',
    tag: '',
    category: '运动装备',
  },
  {
    id: 8,
    name: '筋膜枪 Mini 便携版',
    price: 399,
    originalPrice: 599,
    rating: 4.9,
    sales: 1567,
    image: '🔫',
    tag: '限时折扣',
    category: '智能设备',
  },
];

export default function MallPage() {
  const [activeCategory, setActiveCategory] = useState('推荐');
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const toggleFavorite = (id: number) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredProducts = activeCategory === '推荐'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="px-4 pt-6 animate-float-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-[#1A1A2E]">270 商城</h1>
        <button className="relative">
          <ShoppingCart size={22} className="text-[#1A1A2E]" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FF6B35] text-white text-[9px] flex items-center justify-center">
            3
          </span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-4">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="搜索运动装备、营养品..."
          className="w-full pl-9 pr-4 py-2.5 bg-white rounded-xl text-sm border border-gray-100 focus:border-[#FF6B35] focus:outline-none transition-colors"
        />
      </div>

      {/* Banner */}
      <div className="bg-gradient-to-r from-[#1A1A2E] to-[#2D2D4A] rounded-2xl p-4 mb-5 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF6B35]/20 rounded-full -translate-y-6 translate-x-6" />
        <div className="relative z-10">
          <span className="text-[10px] bg-[#FF6B35] px-2 py-0.5 rounded-full">限时活动</span>
          <h3 className="text-base font-bold mt-2">运动季大促</h3>
          <p className="text-xs text-white/70 mt-0.5">全场满 299 减 50</p>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
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

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-3">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
          >
            <div className="relative h-28 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center text-4xl">
              {product.image}
              {product.tag && (
                <span className="absolute top-2 left-2 text-[9px] bg-[#FF6B35] text-white px-1.5 py-0.5 rounded-md">
                  {product.tag}
                </span>
              )}
              <button
                onClick={() => toggleFavorite(product.id)}
                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/80 flex items-center justify-center"
              >
                <Heart
                  size={12}
                  className={favorites.has(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}
                />
              </button>
            </div>
            <div className="p-3">
              <h3 className="text-xs font-medium text-[#1A1A2E] line-clamp-2 leading-tight">
                {product.name}
              </h3>
              <div className="flex items-center gap-1 mt-1.5">
                <Star size={10} className="fill-yellow-400 text-yellow-400" />
                <span className="text-[10px] text-gray-500">{product.rating} · 已售 {product.sales}</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-[#FF6B35] font-bold text-sm">¥{product.price}</span>
                  <span className="text-[10px] text-gray-300 line-through">¥{product.originalPrice}</span>
                </div>
                <button className="w-6 h-6 rounded-full brand-gradient flex items-center justify-center">
                  <ShoppingBag size={11} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
