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
  const [codeSent, setCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const sendCode = () => {
    if (phone.length !== 11 || countdown > 0) return;
    setCodeSent(true);
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
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
          src="https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80"
          alt="background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#3A2E2A]/40 backdrop-blur-md" />
      </div>

      {/* Content */}
      <div className="relative flex-1 flex flex-col max-w-[480px] mx-auto w-full">
        {/* Back button */}
        <div className="px-6 pt-12">
          <Link href="/" className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 text-white" />
          </Link>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Login card */}
        <div className="px-6 pb-12">
          <div className="bg-white/90 backdrop-blur-xl rounded-[28px] p-6 shadow-2xl shadow-black/10">
            {/* Brand */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-serif text-[#D4859B]">270</h1>
              <p className="text-[10px] text-[#7A6B66] tracking-[0.2em] mt-0.5">BEAUTY CYCLE 270</p>
              <p className="text-sm text-[#3A2E2A] mt-3 font-medium">
                {isLogin ? "欢迎回来" : "加入 270"}
              </p>
              <p className="text-xs text-[#7A6B66] mt-1">
                {isLogin ? "登录你的账户，继续你的美丽旅程" : "注册成为会员，开启运动美学之旅"}
              </p>
            </div>

            {/* Form */}
            <div className="space-y-3">
              <div>
                <label className="text-xs text-[#7A6B66] mb-1 block">手机号</label>
                <input
                  type="tel"
                  maxLength={11}
                  placeholder="请输入手机号"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  className="w-full px-4 py-3 bg-[#FDF5F0] rounded-[14px] text-sm text-[#3A2E2A] placeholder:text-[#B8A8A4] outline-none focus:ring-2 focus:ring-[#D4859B]/20 transition-all"
                />
              </div>

              {isLogin ? (
                <div>
                  <label className="text-xs text-[#7A6B66] mb-1 block">验证码</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="请输入验证码"
                      value={code}
                      onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                      className="flex-1 px-4 py-3 bg-[#FDF5F0] rounded-[14px] text-sm text-[#3A2E2A] placeholder:text-[#B8A8A4] outline-none focus:ring-2 focus:ring-[#D4859B]/20 transition-all"
                    />
                    <button
                      onClick={sendCode}
                      disabled={phone.length !== 11 || countdown > 0}
                      className={`px-4 py-3 rounded-[14px] text-xs font-medium flex-shrink-0 transition-all ${
                        phone.length === 11 && countdown === 0
                          ? "bg-[#D4859B] text-white"
                          : "bg-[#FDF0F0] text-[#B8A8A4]"
                      }`}
                    >
                      {countdown > 0 ? `${countdown}s` : "获取验证码"}
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="text-xs text-[#7A6B66] mb-1 block">密码</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      maxLength={20}
                      placeholder="请设置密码（6-20位）"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-[#FDF5F0] rounded-[14px] text-sm text-[#3A2E2A] placeholder:text-[#B8A8A4] outline-none focus:ring-2 focus:ring-[#D4859B]/20 transition-all pr-10"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4 text-[#B8A8A4]" />
                      ) : (
                        <Eye className="w-4 h-4 text-[#B8A8A4]" />
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Forgot password */}
            {isLogin && (
              <div className="text-right mt-2">
                <button className="text-xs text-[#D4859B]">忘记密码？</button>
              </div>
            )}

            {/* Agreement */}
            <div className="flex items-start gap-2 mt-4">
              <button
                onClick={() => setAgreed(!agreed)}
                className={`w-4 h-4 rounded border flex-shrink-0 mt-0.5 flex items-center justify-center transition-all ${
                  agreed ? "bg-[#D4859B] border-[#D4859B]" : "border-[#E8A0B5]"
                }`}
              >
                {agreed && <span className="text-white text-[10px]">✓</span>}
              </button>
              <p className="text-[10px] text-[#7A6B66] leading-relaxed">
                我已阅读并同意
                <button className="text-[#D4859B]">《用户协议》</button>
                和
                <button className="text-[#D4859B]">《隐私政策》</button>
              </p>
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={!agreed}
              className={`w-full py-3.5 rounded-full text-sm font-medium mt-4 transition-all duration-300 ${
                agreed
                  ? "bg-[#D4859B] text-white shadow-lg shadow-[#D4859B]/20 hover:shadow-xl"
                  : "bg-[#FDF0F0] text-[#B8A8A4]"
              }`}
            >
              {isLogin ? "登录" : "注册"}
            </button>

            {/* Switch mode */}
            <div className="text-center mt-4">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-xs text-[#7A6B66]"
              >
                {isLogin ? "没有账号？" : "已有账号？"}
                <span className="text-[#D4859B] font-medium ml-1">
                  {isLogin ? "立即注册" : "去登录"}
                </span>
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-[#F0E6E0]" />
              <span className="text-[10px] text-[#B8A8A4]">其他登录方式</span>
              <div className="flex-1 h-px bg-[#F0E6E0]" />
            </div>

            {/* WeChat login */}
            <button className="w-full py-3 rounded-full bg-[#07C160] text-white text-sm font-medium flex items-center justify-center gap-2 hover:bg-[#06ae56] transition-colors">
              <MessageSquare className="w-4 h-4" />
              微信登录
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
