"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface ParallaxOptions {
  speed?: number;
  direction?: "up" | "down";
  enabled?: boolean;
  scrub?: number | boolean;
  yPercent?: number;
  scale?: number;
  opacity?: number;
  x?: number;
  rotation?: number;
  start?: string;
  end?: string;
}

export function useParallax(options: ParallaxOptions = {}) {
  const {
    speed = 0.5,
    direction = "up",
    enabled = true,
    scrub = 1,
    yPercent,
    scale,
    opacity,
    x,
    rotation,
    start = "top bottom",
    end = "bottom top",
  } = options;

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
    if (rotation !== undefined) vars.rotation = rotation;

    const tween = gsap.to(element, vars);

    return () => {
      tween.kill();
    };
  }, [
    speed,
    direction,
    enabled,
    isMobile,
    scrub,
    yPercent,
    scale,
    opacity,
    x,
    rotation,
    start,
    end,
  ]);

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

export function useCountUp(target: number, duration = 1.2) {
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!ref.current || started) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started || !ref.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      ref.current.textContent = target.toLocaleString();
      return;
    }

    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration,
      ease: "power2.out",
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = Math.ceil(obj.val).toLocaleString();
        }
      },
    });
  }, [started, target, duration]);

  return ref;
}
