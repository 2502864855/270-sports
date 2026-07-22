'use client';

import Link from 'next/link';
import { Brain, Shield, Home } from 'lucide-react';
import { useState } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [showPortal, setShowPortal] = useState(false);

  return (
    <div className="min-h-screen bg-[#1D1D1F]">
      {/* Portal Switcher */}
      <button
        onClick={() => setShowPortal(!showPortal)}
        className="fixed top-4 right-4 z-[100] w-9 h-9 rounded-full bg-[#C45A2C] text-white flex items-center justify-center shadow-lg hover:bg-[#D4612F] transition-colors"
        title="切换界面"
      >
        <Home size={16} />
      </button>

      {showPortal && (
        <div className="fixed top-14 right-4 z-[100] bg-white rounded-xl shadow-2xl border border-[#D2D2D7] p-2 w-44">
          <p className="text-[10px] text-[#86868B] px-2 py-1">切换界面</p>
          <Link href="/" onClick={() => setShowPortal(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#1D1D1F] hover:bg-[#F5F5F7]">
            <Home size={14} /> 客户端
          </Link>
          <Link href="/ai" onClick={() => setShowPortal(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#1D1D1F] hover:bg-[#F5F5F7]">
            <Brain size={14} /> AI 中台
          </Link>
          <Link href="/admin" onClick={() => setShowPortal(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#C45A2C] bg-[#F5F5F7] font-medium">
            <Shield size={14} /> 管理后台
          </Link>
        </div>
      )}

      {children}
    </div>
  );
}
