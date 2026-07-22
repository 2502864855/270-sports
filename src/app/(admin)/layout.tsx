'use client';

import Link from 'next/link';
import { Brain, Shield, Home } from 'lucide-react';
import { useState } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [showPortal, setShowPortal] = useState(false);

  return (
    <div className="min-h-screen bg-[#2A2030]">
      {/* Portal Switcher */}
      <button
        onClick={() => setShowPortal(!showPortal)}
        className="fixed top-4 right-4 z-[100] w-9 h-9 rounded-full bg-gradient-to-br from-[#D4859B] to-[#E8A0B5] text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
        title="切换界面"
      >
        <Home size={16} />
      </button>

      {showPortal && (
        <div className="fixed top-14 right-4 z-[100] bg-[#362A3E] rounded-2xl shadow-2xl border border-[#4A3E52] p-2 w-44 animate-float-up">
          <p className="text-[10px] text-[#B8A8A4] px-2 py-1">切换界面</p>
          <Link href="/" onClick={() => setShowPortal(false)} className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-[#B8A8A4] hover:text-white hover:bg-[#4A3E52]">
            <Home size={14} /> 客户端
          </Link>
          <Link href="/ai" onClick={() => setShowPortal(false)} className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-[#B8A8A4] hover:text-white hover:bg-[#4A3E52]">
            <Brain size={14} /> AI 中台
          </Link>
          <Link href="/admin" onClick={() => setShowPortal(false)} className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-[#E8A0B5] bg-[#D4859B]/10 font-medium">
            <Shield size={14} /> 管理后台
          </Link>
        </div>
      )}

      {children}
    </div>
  );
}
