'use client';

import { ReactNode } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface RevealProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'left' | 'right' | 'scale' | 'spring';
  delay?: number;
  threshold?: number;
}

export default function Reveal({
  children,
  className = '',
  variant = 'default',
  delay = 0,
  threshold,
}: RevealProps) {
  const { ref, isVisible } = useScrollReveal({ threshold });

  const variantClass = {
    default: 'reveal',
    left: 'reveal-left',
    right: 'reveal-right',
    scale: 'reveal-scale',
    spring: 'reveal-spring',
  }[variant];

  return (
    <div
      ref={ref}
      className={`${variantClass} ${isVisible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}