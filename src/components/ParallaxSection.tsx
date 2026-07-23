"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  direction?: "up" | "down";
  className?: string;
  scrub?: number | boolean;
  start?: string;
  end?: string;
  yPercent?: number;
  scale?: number;
  opacity?: number;
  x?: number;
  pin?: boolean;
}

export function ParallaxSection({
  children,
  speed = 0.5,
  direction = "up",
  className = "",
  scrub = 1,
  start = "top bottom",
  end = "bottom top",
  yPercent,
  scale,
  opacity,
  x,
  pin = false,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const isMobile = window.innerWidth < 768;
    if (isMobile && speed < 0.3) return;

    const element = ref.current;
    const directionFactor = direction === "up" ? -1 : 1;

    const vars: any = {
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start,
        end,
        scrub,
      },
    };

    if (yPercent !== undefined) {
      vars.yPercent = yPercent * directionFactor;
    } else {
      vars.y = () =>
        ScrollTrigger.maxScroll(window) * speed * 0.1 * directionFactor;
    }

    if (scale !== undefined) vars.scale = scale;
    if (opacity !== undefined) vars.opacity = opacity;
    if (x !== undefined) vars.x = x;

    if (pin) {
      vars.scrollTrigger.pin = true;
    }

    const tween = gsap.to(element, vars);

    return () => {
      tween.kill();
    };
  }, [speed, direction, scrub, start, end, yPercent, scale, opacity, x, pin]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
