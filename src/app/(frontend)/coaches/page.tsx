'use client';

import { useEffect, useState } from 'react';

interface Coach {
  id: number;
  name: string;
  title: string;
  avatar: string;
  bio: string;
  specialties: string[];
  certifications: string[];
  experience_years: number;
}

export default function CoachesPage() {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCoaches() {
      try {
        const res = await fetch('/api/public/coaches');
        const json = await res.json();
        if (json.code === 200) {
          setCoaches(json.data || []);
        }
      } catch (e) {
        console.error('Failed to fetch coaches:', e);
      } finally {
        setLoading(false);
      }
    }
    fetchCoaches();
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
            backgroundImage: 'url(https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&q=80)',
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center px-5">
          <p className="text-[13px] font-medium tracking-[0.2em] text-white/60 uppercase mb-4">
            Our Team
          </p>
          <h1 className="text-[40px] md:text-[56px] font-black leading-[1.1] text-white tracking-tight">
            教练团队
          </h1>
          <p className="mt-4 text-[16px] text-white/70 max-w-[500px] mx-auto">
            每一位教练都经过严格筛选和专业认证，只为给你最好的指导
          </p>
        </div>
      </section>

      {/* Coaches Grid */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1240px] px-5 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coaches.map((coach) => (
              <div
                key={coach.id}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 transition-all duration-300"
              >
                {/* Avatar */}
                <div className="relative h-[280px] overflow-hidden bg-gray-100">
                  <img
                    src={coach.avatar || 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80'}
                    alt={coach.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-[20px] font-bold text-gray-900 mb-1">
                    {coach.name}
                  </h2>
                  <p className="text-[14px] text-gray-500 mb-4">
                    {coach.title}
                  </p>
                  <p className="text-[14px] text-gray-600 leading-relaxed mb-4 line-clamp-3">
                    {coach.bio}
                  </p>

                  {/* Experience */}
                  <div className="flex items-center gap-2 text-[13px] text-gray-500 mb-4">
                    <span className="font-medium text-gray-700">{coach.experience_years}年</span>
                    <span>教学经验</span>
                  </div>

                  {/* Specialties */}
                  {coach.specialties && coach.specialties.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {coach.specialties.map((s, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-gray-50 text-gray-600 text-[12px] rounded-full"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Certifications */}
                  {coach.certifications && coach.certifications.length > 0 && (
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-2">
                        专业认证
                      </p>
                      <div className="space-y-1">
                        {coach.certifications.map((c, i) => (
                          <p key={i} className="text-[12px] text-gray-500">
                            • {c}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {coaches.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400">暂无教练信息</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
