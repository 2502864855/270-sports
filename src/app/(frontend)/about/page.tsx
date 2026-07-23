'use client';

import { useEffect, useState } from 'react';
import { Reveal } from '@/components/Reveal';
import { MapPin, Phone, Clock } from 'lucide-react';

const stats = [
  { value: '1000+', label: '核心会员' },
  { value: '68%', label: '月度续费率' },
  { value: '10W+', label: '服务人次' },
  { value: '2022', label: '创立至今' },
];

interface TeamMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

const defaultTeam: TeamMember[] = [
  { id: 1, name: '徐宁', role: '创始人 / 总教练', avatar: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80', bio: '10年健身行业经验，2022年创立270运动馆' },
  { id: 2, name: '林悦', role: '普拉提总监', avatar: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&q=80', bio: '国际普拉提认证教练，专注核心床训练' },
  { id: 3, name: '陈雨桐', role: '瑜伽教学总监', avatar: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80', bio: 'RYT-500认证，8年女性瑜伽教学经验' },
];

export default function AboutPage() {
  const [team, setTeam] = useState<TeamMember[]>(defaultTeam);

  useEffect(() => {
    fetch('/api/public/team')
      .then(r => r.json())
      .then(res => { if (res.code === 200 && res.data?.length) setTeam(res.data); })
      .catch(() => {});
  }, []);
  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden noise-overlay px-5 md:px-10 py-20 md:py-28"
        style={{ background: 'linear-gradient(180deg, #1F1E1C 0%, #181817 100%)' }}
      >
        <div className="absolute top-0 left-[20%] w-[400px] h-[300px] opacity-15 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(196,90,44,0.3), transparent 60%)' }}
        />
        <div className="relative z-10 mx-auto max-w-[1240px]">
          <Reveal>
            <p className="text-[12px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-4">About Us</p>
            <h1 className="text-[30px] md:text-[56px] font-bold text-white leading-[1.05] tracking-[-0.02em] mb-6">关于270运动馆</h1>
            <p className="text-[17px] text-gray-400 max-w-2xl leading-[1.7]">
              270运动馆（BEAUTY CYCLE 270）由徐宁于2022年在福州创立，是一家专注于女性健身服务的品牌。
              我们相信，每一位女性都值得拥有一个安全、私密、无评判的运动空间。
            </p>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="px-5 md:px-10 py-20 md:py-28 bg-cream">
        <div className="mx-auto max-w-[1240px] grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <Reveal>
            <div>
              <p className="text-[12px] font-semibold tracking-[0.2em] uppercase text-gray-400 mb-4">Our Story</p>
              <h2 className="text-[24px] md:text-[40px] font-bold text-gray-900 leading-[1.15] mb-6">
                她的运动美学
              </h2>
              <div className="space-y-4 text-[17px] text-gray-600 leading-[1.75]">
                <p>
                  2022年，创始人徐宁在福州开设了第一家270运动馆。她发现，很多女性对传统健身房感到不适——
                  器械区的目光、拥挤的环境、缺乏针对性的课程。
                </p>
                <p>
                  270运动馆的诞生，就是为了解决这个问题。我们打造了一个专为女性设计的运动空间，
                  提供普拉提、瑜伽、女性力量训练等课程，让每一位会员都能自在、自信地运动。
                </p>
                <p>
                  2026年初，270完成种子轮融资，投后估值500万。计划在福州核心商圈及社区新增3-5家门店。
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={2}>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80" alt="studio" className="w-full h-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="px-5 md:px-10 py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-[1240px]">
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {stats.map(stat => (
                <div key={stat.label} className="text-center">
                  <p className="text-[28px] md:text-[48px] font-bold text-gray-900" style={{ fontFamily: 'Inter' }}>
                    {stat.value}
                  </p>
                  <p className="text-[13px] text-gray-500 mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Team */}
      <section className="px-5 md:px-10 py-20 md:py-28 bg-cream">
        <div className="mx-auto max-w-[1240px]">
          <Reveal>
            <p className="text-[12px] font-semibold tracking-[0.2em] uppercase text-gray-400 mb-4">Our Team</p>
            <h2 className="text-[24px] md:text-[40px] font-bold text-gray-900 mb-12">专业教练团队</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <Reveal key={member.name} delay={i + 1}>
                <div className="card overflow-hidden">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img src={member.avatar} alt={member.name} className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-[18px] font-semibold text-gray-900 truncate">{member.name}</h3>
                    <p className="text-[13px] font-medium mt-1 truncate" style={{ color: '#403E3B' }}>{member.role}</p>
                    <p className="text-[14px] text-gray-500 mt-2 line-clamp-2">{member.bio}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stores */}
      <section id="stores" className="px-5 md:px-10 py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-[1240px]">
          <Reveal>
            <p className="text-[12px] font-semibold tracking-[0.2em] uppercase text-gray-400 mb-4">Our Store</p>
            <h2 className="text-[24px] md:text-[40px] font-bold text-gray-900 mb-12">门店信息</h2>
          </Reveal>
          <div className="max-w-2xl">
            <Reveal>
              <div className="card p-8">
                <h3 className="text-[20px] font-bold text-gray-900 mb-6">Beauty Cycle 女子运动美学馆（晓康苑店）</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <MapPin size={20} className="mt-0.5 flex-shrink-0 text-gray-500" />
                    <div>
                      <p className="text-[14px] font-medium text-gray-900 mb-1">地址</p>
                      <p className="text-[14px] text-gray-500">福建福州鼓楼区湖东路 208 号晓康苑南楼 1303</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone size={20} className="mt-0.5 flex-shrink-0 text-gray-500" />
                    <div>
                      <p className="text-[14px] font-medium text-gray-900 mb-1">联系电话</p>
                      <p className="text-[14px] text-gray-500">13950306600</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock size={20} className="mt-0.5 flex-shrink-0 text-gray-500" />
                    <div>
                      <p className="text-[14px] font-medium text-gray-900 mb-1">营业时间</p>
                      <p className="text-[14px] text-gray-500">周一至周六 09:00 - 21:00 / 周日 10:00 - 18:00</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-[14px] text-gray-500">女性专属空间，安全私密舒适。欢迎预约参观体验。</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-5 md:px-10 py-20 md:py-28" style={{ backgroundColor: '#181817' }}>
        <div className="mx-auto max-w-[1240px] text-center">
          <Reveal>
            <p className="text-[12px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-4">Contact Us</p>
            <h2 className="text-[24px] md:text-[40px] font-bold text-white mb-6">联系我们</h2>
            <p className="text-[17px] text-gray-400 max-w-lg mx-auto mb-10">
              欢迎咨询预约，我们期待为您服务
            </p>
            <div className="grid sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="p-6 rounded-xl" style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Phone size={24} className="mx-auto mb-3 text-gray-400" />
                <p className="text-[14px] font-medium text-white mb-1">电话</p>
                <p className="text-[14px] text-gray-400">13950306600</p>
              </div>
              <div className="p-6 rounded-xl" style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <MapPin size={24} className="mx-auto mb-3 text-gray-400" />
                <p className="text-[14px] font-medium text-white mb-1">地址</p>
                <p className="text-[13px] text-gray-400">福州鼓楼区湖东路 208 号</p>
              </div>
              <div className="p-6 rounded-xl" style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Clock size={24} className="mx-auto mb-3 text-gray-400" />
                <p className="text-[14px] font-medium text-white mb-1">营业时间</p>
                <p className="text-[13px] text-gray-400">周一至六 09:00-21:00</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
