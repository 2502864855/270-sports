"use client";

import { useState } from "react";
import { ArrowLeft, Eye, EyeOff, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const sendCode = () => {
    if (phone.length !== 11 || countdown > 0) return;
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) { clearInterval(timer); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSubmit = () => {
    if (!agreed) return;
    alert(isLogin ? "登录成功！" : "注册成功！");
  };

  return (
    <div className="min-h-screen relative flex flex-col">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&q=80"
          alt="background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative flex-1 flex flex-col max-w-[480px] mx-auto w-full">
        <div className="px-8 pt-14">
          <Link href="/" className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center hover:bg-white/25 transition-colors">
            <ArrowLeft className="w-4 h-4 text-white" />
          </Link>
        </div>

        <div className="flex-1" />

        {/* Login card - Apple style */}
        <div className="px-8 pb-12">
          <div className="bg-white rounded-3xl p-8">
            {/* Brand */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-[#1D1D1F] tracking-tight">270</h1>
              <p className="text-xs text-[#86868B] tracking-[0.2em] mt-1">BEAUTY CYCLE 270</p>
              <p className="text-xl text-[#1D1D1F] mt-6 font-semibold">
                {isLogin ? "欢迎回来" : "加入 270"}
              </p>
              <p className="text-sm text-[#86868B] mt-2">
                {isLogin ? "登录你的账户" : "注册成为会员"}
              </p>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <div>
                <label className="text-sm text-[#86868B] mb-2 block">手机号</label>
                <input
                  type="tel"
                  maxLength={11}
                  placeholder="请输入手机号"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  className="w-full px-5 py-4 bg-[#F5F5F7] rounded-xl text-base text-[#1D1D1F] placeholder:text-[#D2D2D7] outline-none focus:ring-2 focus:ring-[#C45A2C]/30 transition-all"
                />
              </div>

              {isLogin ? (
                <div>
                  <label className="text-sm text-[#86868B] mb-2 block">验证码</label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="请输入验证码"
                      value={code}
                      onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                      className="flex-1 px-5 py-4 bg-[#F5F5F7] rounded-xl text-base text-[#1D1D1F] placeholder:text-[#D2D2D7] outline-none focus:ring-2 focus:ring-[#C45A2C]/30 transition-all"
                    />
                    <button
                      onClick={sendCode}
                      disabled={phone.length !== 11 || countdown > 0}
                      className={`px-5 py-4 rounded-xl text-sm font-medium flex-shrink-0 transition-colors ${
                        phone.length === 11 && countdown === 0
                          ? "bg-[#1D1D1F] text-white"
                          : "bg-[#F5F5F7] text-[#D2D2D7]"
                      }`}
                    >
                      {countdown > 0 ? `${countdown}s` : "获取验证码"}
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="text-sm text-[#86868B] mb-2 block">密码</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      maxLength={20}
                      placeholder="请设置密码（6-20位）"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-5 py-4 bg-[#F5F5F7] rounded-xl text-base text-[#1D1D1F] placeholder:text-[#D2D2D7] outline-none focus:ring-2 focus:ring-[#C45A2C]/30 transition-all pr-12"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 text-[#D2D2D7]" />
                      ) : (
                        <Eye className="w-5 h-5 text-[#D2D2D7]" />
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {isLogin && (
              <div className="text-right mt-3">
                <button className="text-sm text-[#C45A2C] font-medium">忘记密码？</button>
              </div>
            )}

            {/* Agreement */}
            <div className="flex items-start gap-2.5 mt-6">
              <button
                onClick={() => setAgreed(!agreed)}
                className={`w-5 h-5 rounded border flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors ${
                  agreed ? "bg-[#C45A2C] border-[#C45A2C]" : "border-[#D2D2D7]"
                }`}
              >
                {agreed && <span className="text-white text-xs">✓</span>}
              </button>
              <p className="text-xs text-[#86868B] leading-relaxed">
                我已阅读并同意
                <button className="text-[#C45A2C]">《用户协议》</button>
                和
                <button className="text-[#C45A2C]">《隐私政策》</button>
              </p>
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={!agreed}
              className={`w-full py-4 rounded-full text-base font-medium mt-6 transition-all duration-300 btn-scale ${
                agreed
                  ? "bg-[#C45A2C] text-white hover:bg-[#D4612F]"
                  : "bg-[#F5F5F7] text-[#D2D2D7]"
              }`}
            >
              {isLogin ? "登录" : "注册"}
            </button>

            {/* Switch mode */}
            <div className="text-center mt-5">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-[#86868B]"
              >
                {isLogin ? "没有账号？" : "已有账号？"}
                <span className="text-[#C45A2C] font-medium ml-1">
                  {isLogin ? "立即注册" : "去登录"}
                </span>
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-[#D2D2D7]" />
              <span className="text-xs text-[#86868B]">其他登录方式</span>
              <div className="flex-1 h-px bg-[#D2D2D7]" />
            </div>

            {/* WeChat login */}
            <button className="w-full py-4 rounded-full bg-[#07C160] text-white text-base font-medium flex items-center justify-center gap-2.5 hover:bg-[#06ae56] transition-colors duration-300 btn-scale">
              <MessageSquare className="w-5 h-5" />
              微信登录
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
