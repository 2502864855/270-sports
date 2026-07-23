'use client';

import { useState } from 'react';
import { Save, Plus, Trash2, Edit3, GripVertical } from 'lucide-react';

// 首页板块数据
const initialSections = [
  { id: 1, name: 'Hero 主视觉', visible: true, order: 1 },
  { id: 2, name: '品牌使命与价值观', visible: true, order: 2 },
  { id: 3, name: '核心数据', visible: true, order: 3 },
  { id: 4, name: '品牌故事 / 发展历程', visible: true, order: 4 },
  { id: 5, name: '创始人介绍', visible: true, order: 5 },
  { id: 6, name: '门店信息', visible: true, order: 6 },
  { id: 7, name: '媒体报道 / 品牌荣誉', visible: true, order: 7 },
  { id: 8, name: 'CTA 行动召唤', visible: true, order: 8 },
  { id: 9, name: 'Footer', visible: true, order: 9 },
];

// 品牌故事时间线
const initialTimeline = [
  { year: '2022', title: '品牌创立', desc: '270 运动馆于福州成立，创始人徐宁' },
  { year: '2023', title: '首家门店', desc: '首家门店落地，积累首批 500 名会员' },
  { year: '2024', title: '体系迭代', desc: '课程体系迭代，会员突破 1000 人' },
  { year: '2025', title: '荣誉收获', desc: '创始人徐宁获「年度女性影响力人物」，品牌获「最具投资价值项目奖」' },
  { year: '2026', title: '规模化发展', desc: '完成种子轮融资，投后估值 500 万，开启规模化发展' },
];

// 媒体报道
const initialNews = [
  { id: 1, title: '深耕"她力量"健身赛道', source: '凤凰网', date: '2025-03-15' },
  { id: 2, title: '2025 最具投资价值项目', source: '华商创新论坛', date: '2025-06-20' },
  { id: 3, title: 'ABEC 亚洲影响力创新奖', source: 'ABEC', date: '2025-09-10' },
];

export default function ContentManagementPage() {
  const [sections, setSections] = useState(initialSections);
  const [timeline, setTimeline] = useState(initialTimeline);
  const [news, setNews] = useState(initialNews);
  const [activeTab, setActiveTab] = useState<'sections' | 'timeline' | 'news' | 'store'>('sections');

  const toggleSectionVisibility = (id: number) => {
    setSections(sections.map(s => s.id === id ? { ...s, visible: !s.visible } : s));
  };

  return (
    <div className="p-8">
      {/* 页面标题 */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">内容管理</h1>
          <p className="text-sm text-white/40">可视化编辑首页各板块内容</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all" style={{ background: 'linear-gradient(180deg, #D97A4A, #C45A2C, #A84A22)' }}>
          <Save size={16} />
          保存更改
        </button>
      </div>

      {/* Tab 切换 */}
      <div className="flex gap-1 mb-6 p-1 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
        {[
          { key: 'sections', label: '首页板块' },
          { key: 'timeline', label: '品牌故事' },
          { key: 'news', label: '媒体报道' },
          { key: 'store', label: '门店信息' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`flex-1 py-2 px-4 rounded-md text-sm transition-all ${
              activeTab === tab.key
                ? 'text-white font-medium'
                : 'text-white/40 hover:text-white/60'
            }`}
            style={activeTab === tab.key ? { backgroundColor: 'rgba(196,90,44,0.15)' } : {}}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 首页板块管理 */}
      {activeTab === 'sections' && (
        <div className="space-y-2">
          {sections.map((section) => (
            <div
              key={section.id}
              className="flex items-center justify-between p-4 rounded-lg transition-colors"
              style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-center gap-3">
                <GripVertical size={16} className="text-white/20 cursor-move" />
                <span className="text-sm text-white/80">{section.order}</span>
                <span className="text-sm text-white font-medium">{section.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleSectionVisibility(section.id)}
                  className={`px-3 py-1 rounded text-xs transition-colors ${
                    section.visible
                      ? 'text-green-400 bg-green-400/10'
                      : 'text-white/30 bg-white/5'
                  }`}
                >
                  {section.visible ? '已显示' : '已隐藏'}
                </button>
                <button className="p-2 rounded hover:bg-white/5 transition-colors">
                  <Edit3 size={14} className="text-white/40" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 品牌故事时间线 */}
      {activeTab === 'timeline' && (
        <div className="space-y-4">
          {timeline.map((item, index) => (
            <div
              key={index}
              className="p-4 rounded-lg"
              style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded text-xs font-medium" style={{ backgroundColor: 'rgba(196,90,44,0.15)', color: '#C45A2C' }}>
                    {item.year}
                  </span>
                  <span className="text-sm text-white font-medium">{item.title}</span>
                </div>
                <button className="p-2 rounded hover:bg-white/5 transition-colors">
                  <Trash2 size={14} className="text-red-400/60" />
                </button>
              </div>
              <p className="text-sm text-white/50 pl-16">{item.desc}</p>
            </div>
          ))}
          <button className="w-full py-3 rounded-lg text-sm text-white/40 border border-dashed border-white/10 hover:border-white/20 hover:text-white/60 transition-colors flex items-center justify-center gap-2">
            <Plus size={16} />
            添加时间节点
          </button>
        </div>
      )}

      {/* 媒体报道 */}
      {activeTab === 'news' && (
        <div className="space-y-3">
          {news.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 rounded-lg"
              style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div>
                <p className="text-sm text-white font-medium mb-1">{item.title}</p>
                <p className="text-xs text-white/30">{item.source} · {item.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded hover:bg-white/5 transition-colors">
                  <Edit3 size={14} className="text-white/40" />
                </button>
                <button className="p-2 rounded hover:bg-white/5 transition-colors">
                  <Trash2 size={14} className="text-red-400/60" />
                </button>
              </div>
            </div>
          ))}
          <button className="w-full py-3 rounded-lg text-sm text-white/40 border border-dashed border-white/10 hover:border-white/20 hover:text-white/60 transition-colors flex items-center justify-center gap-2">
            <Plus size={16} />
            添加报道
          </button>
        </div>
      )}

      {/* 门店信息 */}
      {activeTab === 'store' && (
        <div className="p-6 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-white/40 mb-2 block">门店名称</label>
              <input
                type="text"
                defaultValue="Beauty cycle 女子运动美学馆（晓康苑店）"
                className="w-full px-4 py-3 rounded-lg text-sm text-white focus:outline-none focus:ring-2"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
              />
            </div>
            <div>
              <label className="text-xs text-white/40 mb-2 block">地址</label>
              <input
                type="text"
                defaultValue="福建福州鼓楼区湖东路 208 号晓康苑南楼 1303"
                className="w-full px-4 py-3 rounded-lg text-sm text-white focus:outline-none focus:ring-2"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
              />
            </div>
            <div>
              <label className="text-xs text-white/40 mb-2 block">联系电话</label>
              <input
                type="text"
                defaultValue="13950306600"
                className="w-full px-4 py-3 rounded-lg text-sm text-white focus:outline-none focus:ring-2"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
              />
            </div>
            <div>
              <label className="text-xs text-white/40 mb-2 block">营业时间</label>
              <input
                type="text"
                defaultValue="周一至周日 09:00-21:00"
                className="w-full px-4 py-3 rounded-lg text-sm text-white focus:outline-none focus:ring-2"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
