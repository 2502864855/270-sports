'use client';

import { useState } from 'react';
import { Save, Key, Plus, Trash2 } from 'lucide-react';

export default function SettingsPage() {
  const [siteName, setSiteName] = useState('270 运动馆');
  const [siteLogo, setSiteLogo] = useState('');
  const [icpNumber, setIcpNumber] = useState('');
  const [apiKeys, setApiKeys] = useState([
    { id: 1, name: '默认 API Key', key: 'sk_270_a1b2c3d4e5f6g7h8i9j0', created: '2025-01-01' },
  ]);

  return (
    <div className="p-8">
      {/* 页面标题 */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">系统设置</h1>
          <p className="text-sm text-white/40">管理网站基础配置</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all" style={{ background: 'linear-gradient(180deg, #D97A4A, #C45A2C, #A84A22)' }}>
          <Save size={16} />
          保存更改
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* 网站基础设置 */}
        <div className="p-6 rounded-xl" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <h3 className="text-sm font-medium text-white/60 mb-4">网站基础设置</h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-white/40 mb-2 block">网站名称</label>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg text-sm text-white focus:outline-none focus:ring-2"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
              />
            </div>
            <div>
              <label className="text-xs text-white/40 mb-2 block">Logo URL</label>
              <input
                type="text"
                value={siteLogo}
                onChange={(e) => setSiteLogo(e.target.value)}
                placeholder="https://..."
                className="w-full px-4 py-3 rounded-lg text-sm text-white focus:outline-none focus:ring-2"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
              />
            </div>
            <div>
              <label className="text-xs text-white/40 mb-2 block">ICP 备案号</label>
              <input
                type="text"
                value={icpNumber}
                onChange={(e) => setIcpNumber(e.target.value)}
                placeholder="闽 ICP 备 XXXXXXXX 号"
                className="w-full px-4 py-3 rounded-lg text-sm text-white focus:outline-none focus:ring-2"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
              />
            </div>
          </div>
        </div>

        {/* API Key 管理 */}
        <div className="p-6 rounded-xl" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-white/60 flex items-center gap-2">
              <Key size={16} />
              API Key 管理
            </h3>
            <button className="flex items-center gap-1 text-xs text-white/40 hover:text-white/60 transition-colors">
              <Plus size={14} />
              生成新 Key
            </button>
          </div>
          <div className="space-y-3">
            {apiKeys.map((apiKey) => (
              <div
                key={apiKey.id}
                className="p-3 rounded-lg"
                style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white font-medium">{apiKey.name}</span>
                  <button className="p-1 rounded hover:bg-white/5 transition-colors">
                    <Trash2 size={12} className="text-red-400/60" />
                  </button>
                </div>
                <code className="text-xs text-white/60 font-mono block mb-1">{apiKey.key}</code>
                <span className="text-xs text-white/30">创建于 {apiKey.created}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 管理员账号 */}
        <div className="p-6 rounded-xl" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <h3 className="text-sm font-medium text-white/60 mb-4">管理员账号</h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-white/40 mb-2 block">管理员邮箱</label>
              <input
                type="email"
                defaultValue="admin@270sports.com"
                className="w-full px-4 py-3 rounded-lg text-sm text-white focus:outline-none focus:ring-2"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
              />
            </div>
            <div>
              <label className="text-xs text-white/40 mb-2 block">修改密码</label>
              <input
                type="password"
                placeholder="输入新密码..."
                className="w-full px-4 py-3 rounded-lg text-sm text-white focus:outline-none focus:ring-2"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
