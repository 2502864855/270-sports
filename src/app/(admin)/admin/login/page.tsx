'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, User, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // 模拟管理员登录验证
    if (username === 'admin' && password === 'admin123') {
      // 登录成功，跳转到管理后台
      setTimeout(() => {
        router.push('/admin');
      }, 500);
    } else {
      setError('用户名或密码错误');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#181817' }}>
      <div className="w-full max-w-md p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4" style={{ backgroundColor: 'rgba(196,90,44,0.15)' }}>
            <span className="text-2xl font-bold" style={{ color: '#C45A2C' }}>270</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">管理后台登录</h1>
          <p className="text-sm text-white/40">270 运动馆 · BEAUTY CYCLE 270</p>
        </div>

        {/* 登录表单 */}
        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="p-3 rounded-lg text-sm text-red-400" style={{ backgroundColor: 'rgba(239,68,68,0.1)' }}>
              {error}
            </div>
          )}

          <div className="relative">
            <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              placeholder="管理员账号"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 transition-all"
              style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            />
          </div>

          <div className="relative">
            <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-3 rounded-lg text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 transition-all"
              style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg text-sm font-medium text-white transition-all disabled:opacity-50"
            style={{
              background: 'linear-gradient(180deg, #D97A4A, #C45A2C, #A84A22)',
              boxShadow: '0 1px 6px rgba(196,90,44,0.3)',
            }}
          >
            {loading ? '登录中...' : '登录'}
          </button>
        </form>

        {/* 测试账号提示 */}
        <div className="mt-6 p-4 rounded-lg text-xs" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="text-white/40 mb-2">测试账号：</p>
          <p className="text-white/60">账号：<code className="text-[#C45A2C]">admin</code></p>
          <p className="text-white/60">密码：<code className="text-[#C45A2C]">admin123</code></p>
        </div>

        {/* 返回前台 */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-xs text-white/30 hover:text-white/60 transition-colors">
            ← 返回前台网站
          </Link>
        </div>
      </div>
    </div>
  );
}
