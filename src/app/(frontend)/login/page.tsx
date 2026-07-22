'use client';

import { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [agreed, setAgreed] = useState(false);

  const handleSendCode = () => {
    if (phone.length !== 11 || countdown > 0) return;
    setCodeSent(true);
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#FDF8F5] flex flex-col">
      {/* Header Decoration */}
      <div className="relative h-56 bg-gradient-to-br from-[#D4859B] to-[#E8A0B5] overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
        <div className="absolute bottom-0 left-0 w-28 h-28 bg-white/5 rounded-full translate-y-12 -translate-x-12" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white/5 rounded-full" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
          <Link href="/" className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <ArrowLeft size={16} />
          </Link>
          <h1 className="text-2xl font-bold tracking-wider">270运动馆</h1>
          <p className="text-xs text-white/70 tracking-widest mt-1">BEAUTY CYCLE 270</p>
          <p className="text-sm text-white/80 mt-3">她的运动美学</p>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 -mt-8 relative z-20">
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          {/* Tab Switch */}
          <div className="flex gap-1 bg-[#FDF0F0] rounded-2xl p-1 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isLogin ? 'bg-white text-[#3A2E2A] shadow-sm' : 'text-[#8A7A74]'
              }`}
            >
              登录
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                !isLogin ? 'bg-white text-[#3A2E2A] shadow-sm' : 'text-[#8A7A74]'
              }`}
            >
              注册
            </button>
          </div>

          {/* Phone Input */}
          <div className="mb-4">
            <label className="text-xs text-[#8A7A74] mb-1.5 block">手机号</label>
            <input
              type="tel"
              maxLength={11}
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
              placeholder="请输入手机号"
              className="w-full px-4 py-3 bg-[#FDF8F5] rounded-xl text-sm border border-[#F0E6E0] focus:border-[#D4859B] focus:outline-none transition-colors text-[#3A2E2A] placeholder:text-[#B8A8A4]"
            />
          </div>

          {/* Verify Code or Password */}
          {isLogin ? (
            <div className="mb-4">
              <label className="text-xs text-[#8A7A74] mb-1.5 block">验证码</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={verifyCode}
                  onChange={(e) => setVerifyCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="请输入验证码"
                  className="flex-1 px-4 py-3 bg-[#FDF8F5] rounded-xl text-sm border border-[#F0E6E0] focus:border-[#D4859B] focus:outline-none transition-colors text-[#3A2E2A] placeholder:text-[#B8A8A4]"
                />
                <button
                  onClick={handleSendCode}
                  disabled={phone.length !== 11 || countdown > 0}
                  className={`px-4 py-3 rounded-xl text-xs whitespace-nowrap transition-all ${
                    phone.length === 11 && countdown === 0
                      ? 'brand-gradient text-white shadow-sm'
                      : 'bg-[#FDF0F0] text-[#B8A8A4]'
                  }`}
                >
                  {countdown > 0 ? `${countdown}s` : codeSent ? '重新发送' : '获取验证码'}
                </button>
              </div>
            </div>
          ) : (
            <div className="mb-4">
              <label className="text-xs text-[#8A7A74] mb-1.5 block">密码</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="请设置密码（至少8位）"
                  className="w-full px-4 py-3 pr-10 bg-[#FDF8F5] rounded-xl text-sm border border-[#F0E6E0] focus:border-[#D4859B] focus:outline-none transition-colors text-[#3A2E2A] placeholder:text-[#B8A8A4]"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff size={16} className="text-[#B8A8A4]" /> : <Eye size={16} className="text-[#B8A8A4]" />}
                </button>
              </div>
            </div>
          )}

          {/* Forgot Password */}
          {isLogin && (
            <div className="flex justify-end mb-4">
              <button className="text-xs text-[#D4859B]">忘记密码？</button>
            </div>
          )}

          {/* Agreement */}
          <div className="flex items-start gap-2 mb-5">
            <button
              onClick={() => setAgreed(!agreed)}
              className={`w-4 h-4 rounded border mt-0.5 flex-shrink-0 transition-colors ${
                agreed ? 'bg-[#D4859B] border-[#D4859B]' : 'border-[#F0E6E0]'
              }`}
            >
              {agreed && <span className="text-white text-[10px] flex items-center justify-center h-full">✓</span>}
            </button>
            <p className="text-[10px] text-[#8A7A74] leading-relaxed">
              我已阅读并同意
              <a href="#" className="text-[#D4859B]">《用户协议》</a>
              和
              <a href="#" className="text-[#D4859B]">《隐私政策》</a>
            </p>
          </div>

          {/* Submit Button */}
          <button
            disabled={!agreed || phone.length !== 11}
            className={`w-full py-3 rounded-2xl text-sm font-medium transition-all ${
              agreed && phone.length === 11
                ? 'brand-gradient text-white shadow-lg shadow-[#D4859B]/30 active:scale-[0.98]'
                : 'bg-[#F0E6E0] text-[#B8A8A4]'
            }`}
          >
            {isLogin ? '登录' : '注册'}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-[#F0E6E0]" />
            <span className="text-[10px] text-[#B8A8A4]">其他方式登录</span>
            <div className="flex-1 h-px bg-[#F0E6E0]" />
          </div>

          {/* WeChat Login */}
          <button className="w-full py-3 rounded-2xl bg-[#07C160]/10 text-[#07C160] text-sm font-medium flex items-center justify-center gap-2 hover:bg-[#07C160]/15 transition-colors">
            <MessageSquare size={18} />
            微信登录
          </button>
        </div>

        {/* Brand Footer */}
        <p className="text-center text-[10px] text-[#B8A8A4] mt-6">
          福州坤成体育发展有限公司
        </p>
      </div>
    </div>
  );
}
