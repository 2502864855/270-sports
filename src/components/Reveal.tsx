'use client';

import { ReactNode } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: 'up' | 'scale';
}

export function Reveal({ children, className = '', delay = 0, variant = 'up' }: RevealProps) {
  const { ref, isVisible } = useScrollReveal();

  const baseClass = variant === 'scale' ? 'reveal-scale' : 'reveal';
  const delayClass = delay > 0 ? `stagger-${Math.min(delay, 6)}` : '';

  return (
    <div
      ref={ref}
      className={`${baseClass} ${isVisible ? 'visible' : ''} ${delayClass} ${className}`}
    >
      {children}
    </div>
  );
}
