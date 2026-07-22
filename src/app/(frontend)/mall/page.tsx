"use client";

import { useState } from "react";
import {
  ShoppingBag, Heart, ShoppingCart, Search,
  Crown, X, Plus, Minus
} from "lucide-react";

const categories = ["推荐", "运动服饰", "健康食品", "瑜伽辅具", "护肤美容"];

const allProducts = [
  { id: 1, name: "高腰瑜伽裤 · 裸感系列", price: 299, memberPrice: 239, category: "运动服饰", image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80", tag: "热卖" },
  { id: 2, name: "有机蛋白粉 · 草莓味", price: 399, memberPrice: 319, category: "健康食品", image: "https://images.unsplash.com/photo-1593095948071-474c5cc2c129?w=600&q=80", tag: "新品" },
  { id: 3, name: "天然橡胶瑜伽垫 · 6mm", price: 459, memberPrice: 367, category: "瑜伽辅具", image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&q=80", tag: "" },
  { id: 4, name: "运动内衣 · 中强度支撑", price: 199, memberPrice: 159, category: "运动服饰", image: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=600&q=80", tag: "会员专享" },
  { id: 5, name: "胶原蛋白肽 · 玫瑰味", price: 529, memberPrice: 423, category: "护肤美容", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=80", tag: "" },
  { id: 6, name: "普拉提弹力带套装", price: 129, memberPrice: 99, category: "瑜伽辅具", image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80", tag: "热卖" },
  { id: 7, name: "低卡代餐奶昔 · 抹茶味", price: 168, memberPrice: 134, category: "健康食品", image: "https://images.unsplash.com/photo-1556881286-fc6915169721?w=600&q=80", tag: "" },
  { id: 8, name: "玫瑰精油身体乳", price: 259, memberPrice: 207, category: "护肤美容", image: "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=600&q=80", tag: "新品" },
];

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export default function MallPage() {
  const [activeCategory, setActiveCategory] = useState("推荐");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);

  const filtered = activeCategory === "推荐"
    ? allProducts
    : allProducts.filter((p) => p.category === activeCategory);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const addToCart = (product: typeof allProducts[0]) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: product.id, name: product.name, price: product.memberPrice, image: product.image, quantity: 1 }];
    });
  };

  const updateQty = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const toggleFav = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Hero Header - Apple style */}
      <div className="pt-16 pb-8 px-8 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-[#1D1D1F] mb-3">商城</h1>
        <p className="text-lg text-[#86868B]">精选好物，为你的生活加分</p>
      </div>

      {/* Search & Cart */}
      <div className="px-8 pb-6">
        <div className="flex items-center gap-3">
          <div className="flex-1 flex items-center gap-2.5 px-4 py-3 bg-[#F5F5F7] rounded-xl">
            <Search className="w-4 h-4 text-[#86868B]" />
            <input
              type="text"
              placeholder="搜索商品..."
              className="flex-1 bg-transparent text-sm text-[#1D1D1F] placeholder:text-[#86868B] outline-none"
            />
          </div>
          <button
            onClick={() => setShowCart(true)}
            className="relative w-12 h-12 rounded-xl bg-[#F5F5F7] flex items-center justify-center hover:bg-[#E5E5EA] transition-colors"
          >
            <ShoppingCart className="w-5 h-5 text-[#1D1D1F]" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#C45A2C] text-white text-[10px] flex items-center justify-center font-medium">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Category tabs */}
      <div className="px-8 pb-6">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
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
      </div>

      {/* Promo Banner */}
      <div className="px-8 pb-8">
        <div className="relative h-36 rounded-2xl bg-[#1D1D1F] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#C45A2C]/20 to-transparent" />
          <div className="relative h-full flex items-center px-8">
            <div>
              <p className="text-white/50 text-xs uppercase tracking-widest mb-2">会员专享</p>
              <p className="text-white text-2xl font-bold">春季焕新 全场8折</p>
              <p className="text-white/40 text-sm mt-2">金卡以上会员享额外95折</p>
            </div>
          </div>
        </div>
      </div>

      {/* Product grid - Larger, more spacious */}
      <div className="px-8">
        <div className="grid grid-cols-2 gap-5">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="card-hover group cursor-pointer"
            >
              <div className="relative aspect-square overflow-hidden rounded-2xl mb-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {product.tag && (
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-medium bg-[#C45A2C] text-white">
                    {product.tag}
                  </span>
                )}
                <button
                  onClick={() => toggleFav(product.id)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-transform duration-300 hover:scale-110"
                >
                  <Heart className={`w-4 h-4 transition-colors ${
                    favorites.includes(product.id) ? "fill-[#C45A2C] text-[#C45A2C]" : "text-[#86868B]"
                  }`} />
                </button>
              </div>
              <h3 className="text-[#1D1D1F] text-sm font-medium leading-tight mb-2 line-clamp-2">{product.name}</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[#C45A2C] text-base font-bold">¥{product.memberPrice}</span>
                  <span className="text-[#86868B] text-[10px] line-through">¥{product.price}</span>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="w-8 h-8 rounded-full bg-[#1D1D1F] flex items-center justify-center hover:bg-[#C45A2C] transition-colors duration-300"
                >
                  <Plus className="w-4 h-4 text-white" />
                </button>
              </div>
              <div className="flex items-center gap-1 mt-1.5">
                <Crown className="w-3 h-3 text-[#C9A96E]" />
                <span className="text-[10px] text-[#86868B]">会员价</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart drawer */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowCart(false)} />
          <div className="relative w-full max-w-[480px] bg-white rounded-t-3xl max-h-[70vh] flex flex-col animate-float-up">
            <div className="flex items-center justify-between p-6 border-b border-[#F5F5F7]">
              <h2 className="text-lg font-semibold text-[#1D1D1F]">购物车</h2>
              <button onClick={() => setShowCart(false)}>
                <X className="w-5 h-5 text-[#86868B]" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingBag className="w-14 h-14 text-[#D2D2D7] mx-auto mb-4" />
                  <p className="text-[#86868B]">购物车是空的</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 bg-[#F5F5F7] rounded-xl">
                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm text-[#1D1D1F] truncate">{item.name}</h4>
                      <p className="text-[#C45A2C] text-base font-bold mt-1">¥{item.price}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQty(item.id, -1)} className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
                        <Minus className="w-3.5 h-3.5 text-[#86868B]" />
                      </button>
                      <span className="text-sm text-[#1D1D1F] w-5 text-center">{item.quantity}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
                        <Plus className="w-3.5 h-3.5 text-[#86868B]" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-[#F5F5F7]">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[#86868B]">合计</span>
                  <span className="text-2xl font-bold text-[#1D1D1F]">¥{totalPrice}</span>
                </div>
                <button className="w-full py-3.5 bg-[#C45A2C] text-white rounded-full text-sm font-medium hover:bg-[#D4612F] transition-colors duration-300 btn-scale">
                  去结算
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
