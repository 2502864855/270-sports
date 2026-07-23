'use client';

import { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';

interface NewsItem {
  id: number;
  title: string;
  source: string;
  source_url: string;
  cover_image: string;
  summary: string;
  type: string;
  published_at: string;
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch('/api/public/news');
        const json = await res.json();
        if (json.code === 200) {
          setNews(json.data?.list || json.data || []);
        }
      } catch (e) {
        console.error('Failed to fetch news:', e);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-gray-400">加载中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pt-[68px]">
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80)',
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center px-5">
          <p className="text-[13px] font-medium tracking-[0.2em] text-white/60 uppercase mb-4">
            Media Coverage
          </p>
          <h1 className="text-[40px] md:text-[56px] font-black leading-[1.1] text-white tracking-tight">
            媒体报道
          </h1>
        </div>
      </section>

      {/* News List */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1240px] px-5 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
              <a
                key={item.id}
                href={item.source_url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:scale-[1.01]"
              >
                {/* Cover */}
                <div className="relative h-[180px] overflow-hidden bg-gray-100">
                  <img
                    src={item.cover_image || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80'}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {item.type && (
                    <div className="absolute top-3 left-3 px-2 py-0.5 bg-white/90 backdrop-blur-sm rounded text-[11px] font-medium text-gray-600">
                      {item.type}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h2 className="text-[16px] font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-gray-700 transition-colors">
                    {item.title}
                  </h2>
                  <p className="text-[13px] text-gray-500 line-clamp-2 mb-4">
                    {item.summary}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-gray-400">{item.source}</span>
                    <ExternalLink size={14} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </div>
                </div>
              </a>
            ))}
          </div>

          {news.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400">暂无媒体报道</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
