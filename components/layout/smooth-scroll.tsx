"use client";

import Lenis from "lenis";
import { useEffect } from "react";

declare global {
  interface Window {
    lenis?: Lenis;
  }
}

// @note provides smooth scrolling using lenis library
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    if (typeof window !== "undefined") {
      window.lenis = lenis;
    }

    return () => {
      lenis.destroy();
      if (typeof window !== "undefined") {
        delete window.lenis;
      }
    };
  }, []);

  return <>{children}</>;
}
