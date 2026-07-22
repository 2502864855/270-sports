'use client';

import { useState } from 'react';
import {
  ShoppingBag,
  Star,
  Heart,
  ShoppingCart,
  Search,
  Crown,
  Minus,
  Plus,
  X,
  Trash2,
} from 'lucide-react';

const categories = ['推荐', '运动服饰', '健康食品', '瑜伽辅具', '护肤美容'];

const products = [
  {
    id: 1, name: '高腰瑜伽裤 · 裸感系列', price: 258, memberPrice: 198, rating: 4.9, sales: 2341,
    image: '👖', tag: '热卖', category: '运动服饰', desc: '裸感面料，高腰收腹，提臀设计',
  },
  {
    id: 2, name: '有机蛋白棒 · 莓果味', price: 68, memberPrice: 48, rating: 4.8, sales: 5678,
    image: '🍫', tag: '爆款', category: '健康食品', desc: '0蔗糖，高蛋白，运动后补给首选',
  },
  {
    id: 3, name: '天然橡胶瑜伽垫 5mm', price: 328, memberPrice: 268, rating: 4.9, sales: 1234,
    image: '🧘', tag: '精选', category: '瑜伽辅具', desc: '天然橡胶，防滑吸汗，环保无味',
  },
  {
    id: 4, name: '运动内衣 · 中强度支撑', price: 168, memberPrice: 128, rating: 4.7, sales: 1890,
    image: '👙', tag: '', category: '运动服饰', desc: '舒适支撑，透气速干，可拆卸胸垫',
  },
  {
    id: 5, name: '胶原蛋白肽 · 玫瑰味', price: 298, memberPrice: 238, rating: 4.8, sales: 3456,
    image: '🌹', tag: '会员专享', category: '护肤美容', desc: '小分子肽，易吸收，由内而外焕发光彩',
  },
  {
    id: 6, name: '瑜伽砖 + 瑜伽带套装', price: 89, memberPrice: 68, rating: 4.6, sales: 2100,
    image: '🧱', tag: '', category: '瑜伽辅具', desc: 'EVA高密度材质，辅助拉伸，初学者必备',
  },
  {
    id: 7, name: '低GI代餐奶昔', price: 128, memberPrice: 98, rating: 4.7, sales: 4321,
    image: '🥤', tag: '新品', category: '健康食品', desc: '科学配比，饱腹感强，减脂期好帮手',
  },
  {
    id: 8, name: '面部防晒喷雾 SPF50+', price: 158, memberPrice: 118, rating: 4.9, sales: 1567,
    image: '✨', tag: '限时折扣', category: '护肤美容', desc: '轻薄不油腻，运动专用防水配方',
  },
];

interface CartItem {
  product: typeof products[0];
  qty: number;
}

export default function MallPage() {
  const [activeCategory, setActiveCategory] = useState('推荐');
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const addToCart = (product: typeof products[0]) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prev, { product, qty: 1 }];
    });
  };

  const updateCartQty = (productId: number, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.product.id === productId) {
          const newQty = item.qty + delta;
          return newQty > 0 ? { ...item, qty: newQty } : item;
        }
        return item;
      }).filter(item => item.qty > 0);
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.product.memberPrice * item.qty, 0);

  const filteredProducts = activeCategory === '推荐'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="px-4 pt-6 animate-float-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold text-[#3A2E2A]">270 <span className="text-[#D4859B]">精选</span></h1>
          <p className="text-xs text-[#8A7A74] mt-0.5">为会员甄选好物</p>
        </div>
        <button onClick={() => setShowCart(true)} className="relative w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center">
          <ShoppingCart size={16} className="text-[#8A7A74]" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#D4859B] text-white text-[9px] flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B8A8A4]" />
        <input
          type="text"
          placeholder="搜索运动服饰、健康食品..."
          className="w-full pl-9 pr-4 py-2.5 bg-white rounded-2xl text-sm border border-[#F0E6E0] focus:border-[#D4859B] focus:outline-none transition-colors text-[#3A2E2A] placeholder:text-[#B8A8A4]"
        />
      </div>

      {/* Banner */}
      <div className="bg-gradient-to-r from-[#D4859B] to-[#E8A0B5] rounded-2xl p-4 mb-5 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
        <div className="absolute bottom-0 left-1/2 w-16 h-16 bg-white/5 rounded-full translate-y-6" />
        <div className="relative z-10">
          <div className="flex items-center gap-1.5 mb-1">
            <Crown size={14} />
            <span className="text-[10px] tracking-wider">会员专享价</span>
          </div>
          <h3 className="text-base font-bold">春季焕新 满299减50</h3>
          <p className="text-xs text-white/80 mt-0.5">金卡会员额外享95折</p>
        </div>
      </div>

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

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-3">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
          >
            <div className="relative h-28 bg-gradient-to-br from-[#FDF0F0] to-[#FDF8F5] flex items-center justify-center text-4xl">
              {product.image}
              {product.tag && (
                <span className="absolute top-2 left-2 text-[9px] bg-[#D4859B] text-white px-2 py-0.5 rounded-full">
                  {product.tag}
                </span>
              )}
              <button
                onClick={() => toggleFavorite(product.id)}
                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/80 flex items-center justify-center"
              >
                <Heart
                  size={12}
                  className={favorites.has(product.id) ? 'fill-[#F08080] text-[#F08080]' : 'text-[#B8A8A4]'}
                />
              </button>
            </div>
            <div className="p-3">
              <h3 className="text-xs font-medium text-[#3A2E2A] line-clamp-2 leading-tight">
                {product.name}
              </h3>
              <p className="text-[10px] text-[#8A7A74] mt-0.5">{product.desc}</p>
              <div className="flex items-center gap-1 mt-1.5">
                <Star size={10} className="fill-[#FFB800] text-[#FFB800]" />
                <span className="text-[10px] text-[#8A7A74]">{product.rating} · 已售 {product.sales}</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[#D4859B] font-bold text-sm">¥{product.memberPrice}</span>
                    <span className="text-[10px] text-[#B8A8A4] line-through">¥{product.price}</span>
                  </div>
                  <span className="text-[9px] text-[#D4859B]">会员价</span>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="w-7 h-7 rounded-full brand-gradient flex items-center justify-center shadow-sm"
                >
                  <Plus size={13} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Drawer */}
      {showCart && (
        <div className="fixed inset-0 z-[200] flex items-end justify-center">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setShowCart(false)} />
          <div className="relative bg-white rounded-t-3xl w-full max-w-[480px] max-h-[70vh] overflow-y-auto animate-float-up">
            <div className="sticky top-0 bg-white/95 backdrop-blur-sm p-4 border-b border-[#F0E6E0] flex items-center justify-between z-10">
              <h3 className="font-semibold text-[#3A2E2A]">购物车 ({totalItems})</h3>
              <button onClick={() => setShowCart(false)} className="w-8 h-8 rounded-full bg-[#FDF0F0] flex items-center justify-center">
                <X size={16} className="text-[#8A7A74]" />
              </button>
            </div>
            <div className="p-4">
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingBag size={40} className="text-[#F0E6E0] mx-auto mb-2" />
                  <p className="text-sm text-[#8A7A74]">购物车是空的</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div key={item.product.id} className="flex items-center gap-3 p-2 rounded-xl bg-[#FDF8F5]">
                        <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-xl">
                          {item.product.image}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-[#3A2E2A] truncate">{item.product.name}</p>
                          <p className="text-xs text-[#D4859B] font-medium mt-0.5">¥{item.product.memberPrice}</p>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button onClick={() => updateCartQty(item.product.id, -1)} className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                            <Minus size={12} className="text-[#8A7A74]" />
                          </button>
                          <span className="text-xs w-4 text-center text-[#3A2E2A]">{item.qty}</span>
                          <button onClick={() => updateCartQty(item.product.id, 1)} className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                            <Plus size={12} className="text-[#8A7A74]" />
                          </button>
                        </div>
                        <button onClick={() => removeFromCart(item.product.id)} className="w-6 h-6 rounded-full flex items-center justify-center">
                          <Trash2 size={12} className="text-[#B8A8A4]" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-[#F0E6E0] flex items-center justify-between">
                    <div>
                      <p className="text-xs text-[#8A7A74]">合计</p>
                      <p className="text-lg font-bold text-[#D4859B]">¥{totalPrice}</p>
                    </div>
                    <button className="px-6 py-2.5 rounded-full brand-gradient text-white text-sm font-medium shadow-md">
                      去结算
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
