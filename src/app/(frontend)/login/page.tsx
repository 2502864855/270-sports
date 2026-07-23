'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, User, Lock, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('请输入用户名和密码');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), password }),
      });

      const result = await res.json();

      if (result.code === 200 && result.data?.token) {
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('userInfo', JSON.stringify(result.data.user));
        router.push('/profile');
      } else {
        setError(result.message || '用户名或密码错误');
      }
    } catch {
      setError('网络错误，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

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

          <form onSubmit={handleLogin}>
            {error && (
              <div className="mb-4 p-3 rounded-lg text-[14px] text-red-600" style={{ backgroundColor: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)' }}>
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-[13px] font-medium text-gray-700 mb-1.5">用户名</label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="请输入用户名"
                    className="w-full h-12 pl-10 pr-4 bg-white border border-gray-200 rounded-lg text-[15px] text-gray-900 placeholder:text-gray-400 focus:border-gray-800 transition-colors"
                    autoComplete="username"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[13px] font-medium text-gray-700 mb-1.5">密码</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="请输入密码"
                    className="w-full h-12 pl-10 pr-10 bg-white border border-gray-200 rounded-lg text-[15px] text-gray-900 placeholder:text-gray-400 focus:border-gray-800 transition-colors"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex items-center justify-center w-full h-[52px] mt-8 text-[16px] font-medium disabled:opacity-50"
            >
              {loading ? '登录中...' : (mode === 'login' ? '登录' : '注册')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
              className="text-[14px] text-gray-500 hover:text-gray-800 transition-colors"
            >
              {mode === 'login' ? '没有账户？立即注册' : '已有账户？立即登录'}
            </button>
          </div>

          {/* Test account hint */}
          <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E7E5E1' }}>
            <p className="text-[12px] text-gray-400 mb-2">测试账号：</p>
            <p className="text-[13px] text-gray-600">用户名：<code className="font-medium" style={{ color: '#C45A2C' }}>user270</code></p>
            <p className="text-[13px] text-gray-600">密码：<code className="font-medium" style={{ color: '#C45A2C' }}>270sport888</code></p>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-[12px] text-gray-400 text-center">
              登录即表示同意 <Link href="#" className="text-gray-600 underline">用户协议</Link> 和 <Link href="#" className="text-gray-600 underline">隐私政策</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
