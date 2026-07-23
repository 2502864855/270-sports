"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface ParallaxOptions {
  speed?: number;
  direction?: "up" | "down";
  enabled?: boolean;
}

export function useParallax(options: ParallaxOptions = {}) {
  const { speed = 0.5, direction = "up", enabled = true } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!enabled || !ref.current || isMobile) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const element = ref.current;
    const directionFactor = direction === "up" ? -1 : 1;

    const tween = gsap.to(element, {
      y: () => ScrollTrigger.maxScroll(window) * speed * 0.1 * directionFactor,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      tween.kill();
    };
  }, [speed, direction, enabled, isMobile]);

  return ref;
}

export function useScrollReveal(options: { delay?: number } = {}) {
  const { delay = 0 } = options;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      ref.current.style.opacity = "1";
      ref.current.style.transform = "none";
      return;
    }

    const element = ref.current;
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";

    const tween = gsap.to(element, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      tween.kill();
    };
  }, [delay]);

  return ref;
}

export function useCountUp(
  endValue: number,
  duration: number = 2,
  enabled: boolean = true
) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!enabled || !ref.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      setDisplayValue(endValue);
      return;
    }

    const element = ref.current;
    const obj = { value: 0 };

    ScrollTrigger.create({
      trigger: element,
      start: "top 80%",
      onEnter: () => {
        gsap.to(obj, {
          value: endValue,
          duration,
          ease: "power2.out",
          onUpdate: () => {
            setDisplayValue(Math.round(obj.value));
          },
        });
      },
      once: true,
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [endValue, duration, enabled]);

  return { ref, displayValue };
}
