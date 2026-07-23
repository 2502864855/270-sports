'use client';

import { useState } from 'react';
import { Copy, Check, Key, ExternalLink, Code2 } from 'lucide-react';

// API 接口列表
const apiEndpoints = [
  {
    method: 'GET',
    path: '/api/brand',
    desc: '品牌基本信息',
    params: [],
  },
  {
    method: 'GET',
    path: '/api/courses',
    desc: '课程列表（支持分页、筛选）',
    params: ['page', 'limit', 'category'],
  },
  {
    method: 'GET',
    path: '/api/courses/:id',
    desc: '单课程详情',
    params: ['id'],
  },
  {
    method: 'GET',
    path: '/api/members/stats',
    desc: '会员统计数据',
    params: [],
  },
  {
    method: 'GET',
    path: '/api/coaches',
    desc: '教练列表',
    params: [],
  },
  {
    method: 'GET',
    path: '/api/stores',
    desc: '门店信息',
    params: [],
  },
  {
    method: 'GET',
    path: '/api/news',
    desc: '媒体报道列表',
    params: [],
  },
];

// 示例响应
const exampleResponse = {
  code: 200,
  message: 'success',
  data: {
    brandName: '270 运动馆',
    brandNameEn: 'BEAUTY CYCLE 270',
    founder: '徐宁',
    foundedYear: 2022,
    mission: '让每位女性，平等享有运动健身的权利',
    coreValues: ['安全私密', '专业适配', '高粘性社群'],
    stats: {
      totalMembers: '1000+',
      renewalRate: '68%',
      totalServed: '10W+',
    },
  },
};

export default function ApiManagementPage() {
  const [copied, setCopied] = useState(false);
  const [activeEndpoint, setActiveEndpoint] = useState(0);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(exampleResponse, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-8">
      {/* 页面标题 */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">API 接口</h1>
        <p className="text-sm text-white/40">标准化 RESTful API，供 AI 系统调用</p>
      </div>

      {/* API Key 管理 */}
      <div className="p-6 rounded-xl mb-6" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-white/60 flex items-center gap-2">
            <Key size={16} />
            API Key
          </h3>
          <button className="text-xs text-white/40 hover:text-white/60 transition-colors">
            重新生成
          </button>
        </div>
        <div className="flex items-center gap-3">
          <code className="flex-1 px-4 py-3 rounded-lg text-sm font-mono text-white/80" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
            sk_270_a1b2c3d4e5f6g7h8i9j0
          </code>
          <button
            onClick={handleCopy}
            className="p-3 rounded-lg transition-colors"
            style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
          >
            {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} className="text-white/40" />}
          </button>
        </div>
        <p className="text-xs text-white/30 mt-3">
          请在请求头中携带：Authorization: Bearer sk_270_a1b2c3d4e5f6g7h8i9j0
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* 接口列表 */}
        <div className="col-span-1">
          <h3 className="text-sm font-medium text-white/60 mb-4 flex items-center gap-2">
            <Code2 size={16} />
            接口列表
          </h3>
          <div className="space-y-2">
            {apiEndpoints.map((endpoint, index) => (
              <button
                key={endpoint.path}
                onClick={() => setActiveEndpoint(index)}
                className={`w-full text-left p-3 rounded-lg transition-all ${
                  activeEndpoint === index
                    ? 'ring-1'
                    : 'hover:bg-white/[0.02]'
                }`}
                style={
                  activeEndpoint === index
                    ? { backgroundColor: 'rgba(196,90,44,0.08)', borderColor: 'rgba(196,90,44,0.2)' }
                    : { backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }
                }
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-medium" style={{ backgroundColor: 'rgba(34,197,94,0.15)', color: '#22C55E' }}>
                    {endpoint.method}
                  </span>
                  <code className="text-xs text-white/80 font-mono">{endpoint.path}</code>
                </div>
                <p className="text-xs text-white/40">{endpoint.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* 接口详情 */}
        <div className="col-span-2">
          <div className="p-6 rounded-xl" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 rounded text-xs font-mono font-medium" style={{ backgroundColor: 'rgba(34,197,94,0.15)', color: '#22C55E' }}>
                  {apiEndpoints[activeEndpoint].method}
                </span>
                <code className="text-sm text-white font-mono">{apiEndpoints[activeEndpoint].path}</code>
              </div>
              <a href="#" className="text-xs text-white/40 hover:text-white/60 flex items-center gap-1 transition-colors">
                <ExternalLink size={12} />
                在线测试
              </a>
            </div>

            <div className="mb-6">
              <h4 className="text-xs text-white/40 mb-2">接口描述</h4>
              <p className="text-sm text-white/70">{apiEndpoints[activeEndpoint].desc}</p>
            </div>

            {apiEndpoints[activeEndpoint].params.length > 0 && (
              <div className="mb-6">
                <h4 className="text-xs text-white/40 mb-2">请求参数</h4>
                <div className="space-y-2">
                  {apiEndpoints[activeEndpoint].params.map(param => (
                    <div key={param} className="flex items-center gap-3 text-sm">
                      <code className="text-xs text-white/60 font-mono px-2 py-1 rounded" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                        {param}
                      </code>
                      <span className="text-xs text-white/30">query parameter</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs text-white/40">响应示例</h4>
                <button
                  onClick={handleCopy}
                  className="text-xs text-white/40 hover:text-white/60 flex items-center gap-1 transition-colors"
                >
                  {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                  复制
                </button>
              </div>
              <pre className="p-4 rounded-lg text-xs font-mono text-white/70 overflow-auto" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
                {JSON.stringify(exampleResponse, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
