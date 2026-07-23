"use client";

import { useParallax } from "@/hooks/useParallax";

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  direction?: "up" | "down";
  className?: string;
}

export function ParallaxSection({
  children,
  speed = 0.5,
  direction = "up",
  className = "",
}: ParallaxSectionProps) {
  const ref = useParallax({ speed, direction });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
