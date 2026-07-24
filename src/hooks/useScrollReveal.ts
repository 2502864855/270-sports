'use client';

import { useEffect, useRef, useState } from 'react';

export function useScrollReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // 如果元素已经在视口中，直接显示
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsVisible(true);
      return;
    }

    // 超时兜底：2秒后强制显示，避免内容永久隐藏
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          clearTimeout(timeout);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: '50px 0px 50px 0px' }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, [threshold]);

  return { ref, isVisible };
}
