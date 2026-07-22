'use client';

import { useState } from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

const categories = ['全部', '运动服饰', '健康食品', '瑜伽辅具', '护肤美容'];

const products = [
  { id: 1, name: '高腰瑜伽裤', price: 299, memberPrice: 239, category: '运动服饰', img: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500&q=80' },
  { id: 2, name: '有机蛋白粉', price: 399, memberPrice: 329, category: '健康食品', img: 'https://images.unsplash.com/photo-1593095948663-65f9795a8d3d?w=500&q=80' },
  { id: 3, name: '天然橡胶瑜伽垫', price: 459, memberPrice: 369, category: '瑜伽辅具', img: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&q=80' },
  { id: 4, name: '运动内衣', price: 199, memberPrice: 159, category: '运动服饰', img: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=500&q=80' },
  { id: 5, name: '胶原蛋白肽', price: 599, memberPrice: 479, category: '护肤美容', img: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&q=80' },
  { id: 6, name: '瑜伽砖套装', price: 129, memberPrice: 99, category: '瑜伽辅具', img: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=500&q=80' },
];

export default function MallPage() {
  const [activeCategory, setActiveCategory] = useState('全部');
  const filtered = activeCategory === '全部' ? products : products.filter(p => p.category === activeCategory);

  return (
    <div className="pt-24 pb-20 px-5 md:px-10">
      <div className="mx-auto max-w-[1240px]">
        <Reveal>
          <p className="text-[12px] font-semibold tracking-[0.2em] uppercase text-gray-400 mb-4">Shop</p>
          <h1 className="text-[36px] md:text-[56px] font-bold text-gray-900 leading-[1.05] tracking-[-0.02em] mb-4">商城</h1>
          <p className="text-[17px] text-gray-500 max-w-lg mb-10">精选运动生活方式好物，会员专享优惠。</p>
        </Reveal>

        <Reveal delay={1}>
          <div className="flex gap-6 border-b border-gray-200 mb-10 overflow-x-auto">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`tab-underline whitespace-nowrap text-[15px] pb-3 ${activeCategory === cat ? 'active' : ''}`}>
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((product, i) => (
            <Reveal key={product.id} delay={Math.min(i + 1, 6)}>
              <div className="card group overflow-hidden">
                <div className="aspect-square overflow-hidden relative">
                  <img src={product.img} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <button className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-gray-500 hover:text-gray-900 transition-colors">
                    <Heart size={15} />
                  </button>
                </div>
                <div className="p-4">
                  <p className="text-[11px] text-gray-400 mb-1">{product.category}</p>
                  <h3 className="text-[15px] font-medium text-gray-900 mb-2 leading-snug">{product.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <span style={{ color: '#C45A2C', fontFamily: 'Inter' }} className="text-[16px] font-bold">¥{product.memberPrice}</span>
                    <span className="text-[12px] text-gray-400 line-through">¥{product.price}</span>
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
