'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');

  return (
    <div className="min-h-screen flex">
      {/* Left - Brand Display (Desktop) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #1F1E1C 0%, #181817 100%)' }}>
        <div className="absolute inset-0 noise-overlay" />
        <div className="absolute top-0 right-0 w-[500px] h-[400px] opacity-20"
          style={{ background: 'radial-gradient(ellipse at center, rgba(196,90,44,0.25), transparent 60%)' }}
        />
        <div className="relative z-10 flex flex-col justify-center p-16">
          <p className="text-[12px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-4">Beauty Cycle 270</p>
          <h1 className="text-[56px] font-black text-white leading-[0.95] tracking-[-0.025em] mb-6" style={{ fontFamily: 'Inter' }}>
            270
          </h1>
          <p className="text-[24px] text-white/80 font-medium mb-3">她的运动美学</p>
          <p className="text-[15px] text-gray-500 max-w-sm">安全 · 私密 · 无评判 · 高适配</p>
        </div>
      </div>

      {/* Right - Login Form */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-12 py-12 bg-cream">
        <div className="w-full max-w-[400px] mx-auto">
          <Link href="/" className="inline-flex items-center gap-1 text-[14px] text-gray-500 hover:text-gray-800 mb-10 transition-colors">
            <ArrowLeft size={16} /> 返回首页
          </Link>

          <h2 className="text-[28px] font-bold text-gray-900 mb-2">
            {mode === 'login' ? '欢迎回来' : '创建账户'}
          </h2>
          <p className="text-[15px] text-gray-500 mb-8">
            {mode === 'login' ? '登录你的270账户' : '加入270运动馆'}
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1.5">手机号</label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="请输入手机号"
                className="w-full h-12 px-4 bg-white border border-gray-200 rounded-lg text-[15px] text-gray-900 placeholder:text-gray-400 focus:border-gray-800 transition-colors"
              />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1.5">验证码</label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  placeholder="请输入验证码"
                  className="flex-1 h-12 px-4 bg-white border border-gray-200 rounded-lg text-[15px] text-gray-900 placeholder:text-gray-400 focus:border-gray-800 transition-colors"
                />
                <button className="btn-secondary h-12 px-4 text-[13px] font-medium whitespace-nowrap">
                  获取验证码
                </button>
              </div>
            </div>
          </div>

          <button className="btn-primary w-full h-[52px] mt-8 text-[16px] font-medium">
            {mode === 'login' ? '登录' : '注册'}
          </button>

          <div className="mt-6 text-center">
            <button
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="text-[14px] text-gray-500 hover:text-gray-800 transition-colors"
            >
              {mode === 'login' ? '没有账户？立即注册' : '已有账户？立即登录'}
            </button>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-[12px] text-gray-400 text-center">
              登录即表示同意 <Link href="#" className="text-gray-600 underline">用户协议</Link> 和 <Link href="#" className="text-gray-600 underline">隐私政策</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
