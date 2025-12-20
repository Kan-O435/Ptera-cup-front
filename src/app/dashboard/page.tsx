"use client";

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow } from 'swiper/modules';
import { useRouter } from 'next/navigation';

import 'swiper/css';
import 'swiper/css/effect-coverflow';

const ROOMS = [
  { id: 496668, name: "あわわ(◍꒪꒳​꒪◍)՞", image: "https://static.showroom-live.com/image/room/cover/d6a4ecc6edcfb03368d5f5d04c2f72a77a210d668449694f880ef5d5f747d549_m.jpeg" },
  { id: 554312, name: "はおんはここです！", image: "https://static.showroom-live.com/image/room/cover/86f339b9a13c94b2170e0c731731efbc20bacf528187288a18122c5c010ba274_m.png" },
  { id: 403154, name: "磯部 瑠紅（NGT48）", image: "https://static.showroom-live.com/image/room/cover/a9c23575b74422595fbfe01e904998124fb9c0db91166ca56730fc532b4f5638_m.png" },
];

export default function RoomsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="relative h-screen bg-[#080808] text-white overflow-hidden font-sans selection:bg-pink-500">
      
      {/* 操作ボタン */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-8 right-8 z-50 p-3 bg-white/5 backdrop-blur-xl rounded-2xl hover:bg-white/10 transition-all border border-white/10 group"
      >
        <div className="w-6 h-6 flex flex-col justify-center items-end gap-1.5">
          <span className={`h-0.5 bg-gray-200 transition-all ${isOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`} />
          <span className={`h-0.5 bg-gray-200 transition-all ${isOpen ? 'opacity-0' : 'w-4'}`} />
          <span className={`h-0.5 bg-gray-200 transition-all ${isOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-5'}`} />
        </div>
      </button>

      {/* メインのスライド（中間サイズ調整版） */}
      <main className={`flex-1 flex flex-col items-center justify-center transition-all duration-1000 h-full ${isOpen ? 'pr-64 blur-md opacity-30' : 'pr-0'}`}>
        
        {/* max-w-6xl でちょうど良いサイズ感に */}
        <div className="w-full max-w-6xl px-4"> 
          <Swiper
            effect={'coverflow'}
            centeredSlides={true}
            slidesPerView={1.5}  // 中間の 1.5。左右もしっかり見えつつ真ん中も大きい
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            modules={[EffectCoverflow, Autoplay]}
            coverflowEffect={{ 
              rotate: 0, 
              stretch: -20,    // 少し重ねることで密度をアップ
              depth: 200, 
              modifier: 1, 
              slideShadows: false 
            }}
            className="room-swiper"
          >
            {ROOMS.map((room) => (
              <SwiperSlide key={room.id} className="py-20 flex items-center justify-center">
                {({ isActive }) => (
                  <div className={`
                    relative aspect-video rounded-[2.5rem] overflow-hidden transition-all duration-1000 ease-out shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)]
                    ${isActive ? 'scale-100 opacity-100 ring-1 ring-white/10' : 'scale-[0.75] opacity-25 grayscale-[0.5]'}
                  `}>
                    <img src={room.image} className="w-full h-full object-cover" alt={room.name} />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/10 to-transparent flex flex-col items-center justify-end pb-12">
                      {isActive && (
                        <button 
                          onClick={() => router.push(`/rooms/${room.id}`)}
                          className="mb-8 bg-pink-600 hover:bg-pink-500 text-white px-14 py-3.5 rounded-full font-bold text-base tracking-widest shadow-lg shadow-pink-500/20 transform hover:scale-105 active:scale-95 transition-all"
                        >
                          入室する
                        </button>
                      )}
                      <p className={`font-bold tracking-tight transition-all duration-1000 ${isActive ? 'text-2xl opacity-100 translate-y-0' : 'text-lg opacity-0 translate-y-10'}`}>
                        {room.name}
                      </p>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </main>

      {/* 右側メニュー（ドロワー） */}
      <aside className={`fixed top-0 right-0 h-full w-80 bg-black/40 backdrop-blur-3xl border-l border-white/5 z-40 transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1) ${isOpen ? 'translate-x-0' : 'translate-x-full'} p-12 flex flex-col`}>
        <div className="mt-24 space-y-12">
          <div className="space-y-2">
            <h2 className="text-white text-3xl font-black italic tracking-tighter">CALL APP</h2>
            <div className="h-1 w-12 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full"></div>
          </div>
          
          <nav className="space-y-8">
            <button onClick={() => router.push('/rooms/create')} className="group flex items-center gap-5 text-gray-400 hover:text-white transition-all">
              <span className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-pink-600 group-hover:text-white group-hover:rotate-90 transition-all text-xl font-light">+</span>
              <span className="font-bold text-lg">ルーム作成</span>
            </button>
            <button className="flex items-center gap-5 text-gray-400 hover:text-white transition-all group">
              <span className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-lg group-hover:bg-violet-600 group-hover:text-white transition-all">👤</span>
              <span className="font-bold text-lg">プロフィール</span>
            </button>
          </nav>
        </div>
      </aside>

      

      {/* 背景の装飾（薄いグラデーションの光） */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-500/10 blur-[120px] rounded-full pointer-events-none" />
    </div>
  );
}