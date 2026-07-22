"use client";

import { useState } from "react";
import {
  ShoppingBag, Heart, ShoppingCart, Search,
  Crown, X, Plus, Minus, Trash2, ChevronRight
} from "lucide-react";

const categories = ["推荐", "运动服饰", "健康食品", "瑜伽辅具", "护肤美容"];

const allProducts = [
  { id: 1, name: "高腰瑜伽裤 · 裸感系列", price: 299, memberPrice: 239, category: "运动服饰", image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=300&q=80", tag: "热卖" },
  { id: 2, name: "有机蛋白粉 · 草莓味", price: 399, memberPrice: 319, category: "健康食品", image: "https://images.unsplash.com/photo-1593095948071-474c5cc2c129?w=300&q=80", tag: "新品" },
  { id: 3, name: "天然橡胶瑜伽垫 · 6mm", price: 459, memberPrice: 367, category: "瑜伽辅具", image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=300&q=80", tag: "" },
  { id: 4, name: "运动内衣 · 中强度支撑", price: 199, memberPrice: 159, category: "运动服饰", image: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=300&q=80", tag: "会员专享" },
  { id: 5, name: "胶原蛋白肽 · 玫瑰味", price: 529, memberPrice: 423, category: "护肤美容", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&q=80", tag: "" },
  { id: 6, name: "普拉提弹力带套装", price: 129, memberPrice: 99, category: "瑜伽辅具", image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=300&q=80", tag: "热卖" },
  { id: 7, name: "低卡代餐奶昔 · 抹茶味", price: 168, memberPrice: 134, category: "健康食品", image: "https://images.unsplash.com/photo-1556881286-fc6915169721?w=300&q=80", tag: "" },
  { id: 8, name: "玫瑰精油身体乳", price: 259, memberPrice: 207, category: "护肤美容", image: "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=300&q=80", tag: "新品" },
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
    <div className="min-h-screen bg-[#FDF5F0] pb-20">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-[#FDF5F0]/90 backdrop-blur-md px-6 pt-4 pb-3">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-serif text-[#3A2E2A]">精选商城</h1>
          <button
            onClick={() => setShowCart(true)}
            className="relative w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center"
          >
            <ShoppingCart className="w-4 h-4 text-[#3A2E2A]" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#D4859B] text-white text-[9px] flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-full shadow-sm mb-3">
          <Search className="w-4 h-4 text-[#B8A8A4]" />
          <input
            type="text"
            placeholder="搜索商品..."
            className="flex-1 bg-transparent text-sm text-[#3A2E2A] placeholder:text-[#B8A8A4] outline-none"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
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
      </div>

      {/* Banner */}
      <div className="px-6 pt-3">
        <div className="h-28 rounded-[20px] bg-gradient-to-r from-[#D4859B] to-[#F5A89A] flex items-center px-6 shadow-md shadow-[#D4859B]/15">
          <div>
            <p className="text-white/80 text-xs mb-1">会员专享</p>
            <p className="text-white text-lg font-serif">春季焕新 全场8折</p>
            <p className="text-white/70 text-[10px] mt-1">金卡以上会员享额外95折</p>
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div className="px-6 pt-4">
        <div className="grid grid-cols-2 gap-3">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-[16px] overflow-hidden shadow-sm shadow-[#D4859B]/5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {product.tag && (
                  <span className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-medium ${
                    product.tag === "热卖" ? "bg-[#F5A89A] text-white" :
                    product.tag === "新品" ? "bg-[#A8D5BA] text-white" :
                    "bg-[#C9A96E] text-white"
                  }`}>
                    {product.tag}
                  </span>
                )}
                <button
                  onClick={() => toggleFav(product.id)}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center"
                >
                  <Heart className={`w-3.5 h-3.5 transition-all ${
                    favorites.includes(product.id) ? "fill-[#D4859B] text-[#D4859B]" : "text-[#7A6B66]"
                  }`} />
                </button>
              </div>
              <div className="p-3">
                <h3 className="text-[#3A2E2A] text-xs font-medium leading-tight mb-2 line-clamp-2">{product.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-[#D4859B] text-sm font-serif">¥{product.memberPrice}</span>
                  <span className="text-[#B8A8A4] text-[10px] line-through">¥{product.price}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5">
                    <Crown className="w-3 h-3 text-[#C9A96E]" />
                    <span className="text-[9px] text-[#C9A96E]">会员价</span>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-7 h-7 rounded-full bg-[#D4859B] flex items-center justify-center shadow-sm shadow-[#D4859B]/20 hover:bg-[#c4748a] transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart drawer */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setShowCart(false)} />
          <div className="relative w-full max-w-[480px] bg-white rounded-t-[24px] max-h-[70vh] flex flex-col animate-float-up">
            <div className="flex items-center justify-between p-5 border-b border-[#F0E6E0]">
              <h2 className="text-base font-serif text-[#3A2E2A]">购物车</h2>
              <button onClick={() => setShowCart(false)}>
                <X className="w-5 h-5 text-[#7A6B66]" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-12 h-12 text-[#E8A0B5] mx-auto mb-3 opacity-50" />
                  <p className="text-sm text-[#7A6B66]">购物车是空的</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 bg-[#FDF5F0] rounded-[14px]">
                    <div className="w-14 h-14 rounded-[10px] overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs text-[#3A2E2A] truncate">{item.name}</h4>
                      <p className="text-[#D4859B] text-sm font-serif mt-0.5">¥{item.price}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQty(item.id, -1)} className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                        <Minus className="w-3 h-3 text-[#7A6B66]" />
                      </button>
                      <span className="text-xs text-[#3A2E2A] w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                        <Plus className="w-3 h-3 text-[#7A6B66]" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-5 border-t border-[#F0E6E0]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-[#7A6B66]">合计</span>
                  <span className="text-xl font-serif text-[#D4859B]">¥{totalPrice}</span>
                </div>
                <button className="w-full py-3 bg-[#D4859B] text-white rounded-full text-sm font-medium shadow-md shadow-[#D4859B]/20 hover:bg-[#c4748a] transition-all duration-300">
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
