'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Monitor, Shield, Brain } from 'lucide-react';

export default function AILayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showPortal, setShowPortal] = useState(false);

  return (
    <>
      {/* Portal Switcher */}
      <button
        onClick={() => setShowPortal(!showPortal)}
        className="fixed top-4 right-4 z-[100] w-9 h-9 rounded-full bg-[#4ECDC4] text-[#0F0F23] flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
        title="切换界面"
      >
        <Brain size={16} />
      </button>

      {showPortal && (
        <div className="fixed top-14 right-4 z-[100] bg-[#1E1E3A] rounded-xl shadow-2xl border border-[#2D2D4A] p-2 w-40 animate-float-up">
          <p className="text-[10px] text-gray-500 px-2 py-1">切换界面</p>
          <Link
            href="/"
            onClick={() => setShowPortal(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-[#2D2D4A]"
          >
            <Monitor size={14} /> 客户端
          </Link>
          <Link
            href="/ai"
            onClick={() => setShowPortal(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#4ECDC4] bg-[#4ECDC4]/10 font-medium"
          >
            <Brain size={14} /> AI 中台
          </Link>
          <Link
            href="/admin"
            onClick={() => setShowPortal(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-[#2D2D4A]"
          >
            <Shield size={14} /> 管理后台
          </Link>
        </div>
      )}

      {children}
    </>
  );
}
