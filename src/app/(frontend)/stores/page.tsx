'use client';

import { useEffect, useState } from 'react';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';

interface Store {
  id: number;
  name: string;
  address: string;
  city: string;
  district: string;
  phone: string;
  business_hours: string;
  cover_image: string;
  description: string;
  facilities: string[];
}

export default function StoresPage() {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStores() {
      try {
        const res = await fetch('/api/public/stores');
        const json = await res.json();
        if (json.code === 200) {
          setStores(json.data || []);
        }
      } catch (e) {
        console.error('Failed to fetch stores:', e);
      } finally {
        setLoading(false);
      }
    }
    fetchStores();
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
            backgroundImage: 'url(https://images.unsplash.com/photo-1540497077202-4c8a5772063c?w=1200&q=80)',
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center px-5">
          <p className="text-[13px] font-medium tracking-[0.2em] text-white/60 uppercase mb-4">
            Our Studios
          </p>
          <h1 className="text-[40px] md:text-[56px] font-black leading-[1.1] text-white tracking-tight">
            门店信息
          </h1>
        </div>
      </section>

      {/* Stores Grid */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1240px] px-5 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {stores.map((store) => (
              <div
                key={store.id}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 transition-all duration-300"
              >
                {/* Cover Image */}
                <div className="relative h-[240px] overflow-hidden">
                  <img
                    src={store.cover_image || 'https://images.unsplash.com/photo-1540497077202-4c8a5772063c?w=600&q=80'}
                    alt={store.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[12px] font-medium text-gray-700">
                    {store.city} · {store.district}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <h2 className="text-[24px] font-bold text-gray-900 mb-3">
                    {store.name}
                  </h2>
                  <p className="text-[15px] text-gray-500 leading-relaxed mb-6">
                    {store.description}
                  </p>

                  {/* Info */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 text-[14px]">
                      <MapPin size={16} className="text-gray-400 mt-0.5 shrink-0" />
                      <span className="text-gray-600">{store.address}</span>
                    </div>
                    {store.phone && (
                      <div className="flex items-center gap-3 text-[14px]">
                        <Phone size={16} className="text-gray-400 shrink-0" />
                        <span className="text-gray-600">{store.phone}</span>
                      </div>
                    )}
                    {store.business_hours && (
                      <div className="flex items-center gap-3 text-[14px]">
                        <Clock size={16} className="text-gray-400 shrink-0" />
                        <span className="text-gray-600">{store.business_hours}</span>
                      </div>
                    )}
                  </div>

                  {/* Facilities */}
                  {store.facilities && store.facilities.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <p className="text-[12px] font-medium text-gray-400 uppercase tracking-wider mb-3">
                        设施服务
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {store.facilities.map((f, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-gray-50 text-gray-600 text-[13px] rounded-full"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CTA */}
                  <div className="mt-6 flex gap-3">
                    <a
                      href={`https://maps.apple.com/?q=${encodeURIComponent(store.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 h-11 bg-gray-900 text-white text-[14px] font-medium rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      <Navigation size={14} />
                      导航前往
                    </a>
                    {store.phone && (
                      <a
                        href={`tel:${store.phone}`}
                        className="flex items-center justify-center gap-2 h-11 px-5 border border-gray-200 text-gray-700 text-[14px] font-medium rounded-lg hover:border-gray-300 transition-colors"
                      >
                        <Phone size={14} />
                        电话咨询
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {stores.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400">暂无门店信息</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
