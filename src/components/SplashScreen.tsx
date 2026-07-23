'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Start exit after hold
        setTimeout(() => {
          setExiting(true);
          // Fade out animation
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.inOut',
            onComplete: onFinish,
          });
        }, 800);
      },
    });

    // Initial state
    gsap.set(containerRef.current, { opacity: 1 });
    gsap.set(logoRef.current, { opacity: 0, scale: 0.6, y: 20 });
    gsap.set(textRef.current, { opacity: 0, y: 15 });
    gsap.set(lineRef.current, { scaleX: 0 });

    // Phase 1: Logo entrance - dramatic scale up
    tl.to(logoRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 1.0,
      ease: 'power3.out',
    });

    // Phase 2: Decorative line expands
    tl.to(
      lineRef.current,
      {
        scaleX: 1,
        duration: 0.6,
        ease: 'power2.inOut',
      },
      '-=0.3'
    );

    // Phase 3: Subtitle fades in
    tl.to(
      textRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      },
      '-=0.2'
    );

    return () => {
      tl.kill();
    };
  }, [onFinish]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{
        background: '#0a0a0a',
      }}
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(196,90,44,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Logo */}
      <div ref={logoRef} className="relative flex items-center gap-1">
        <span
          className="text-[80px] sm:text-[120px] font-black leading-none tracking-tighter"
          style={{
            fontFamily: 'Inter, sans-serif',
            color: '#C45A2C',
            textShadow: '0 0 60px rgba(196,90,44,0.3), 0 0 120px rgba(196,90,44,0.1)',
          }}
        >
          270
        </span>
      </div>

      {/* Decorative line */}
      <div
        ref={lineRef}
        className="h-[1px] w-[60px] sm:w-[80px] my-4 sm:my-5 origin-center"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(196,90,44,0.6), transparent)',
        }}
      />

      {/* Subtitle */}
      <p
        ref={textRef}
        className="text-[11px] sm:text-[13px] font-medium tracking-[0.35em] uppercase"
        style={{
          color: 'rgba(255,255,255,0.5)',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        Beauty Cycle 270
      </p>

      {/* Bottom tagline */}
      <p
        className="absolute bottom-8 sm:bottom-12 text-[10px] sm:text-[11px] tracking-[0.2em]"
        style={{
          color: 'rgba(255,255,255,0.2)',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        HER MOVEMENT AESTHETICS
      </p>
    </div>
  );
}
