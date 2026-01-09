"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import Image from "next/image";
import { useLoading } from "@/lib/loading-context";

// @note custom easing with overshoot effect (bottom > above default > default)
const entranceEasing = [0.46, -0.01, 0.08, 1.48] as const;

// @note rotating orbit backgrounds with constant rotation speed
export function OrbitBackground() {
  const { scrollY } = useScroll();
  const { isLoadingComplete } = useLoading();
  const [isMounted, setIsMounted] = useState(false);

  // @note base rotation values for continuous animation
  const outerRotation = useMotionValue(0);
  const innerRotation = useMotionValue(0);

  // @note continuous rotation at constant speed
  useEffect(() => {
    setIsMounted(true);
    let animationId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      // @note constant rotation speed
      outerRotation.set(outerRotation.get() - deltaTime * 8);
      innerRotation.set(innerRotation.get() + deltaTime * 6);

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [outerRotation, innerRotation]);

  // @note parallax transforms for orbit elements
  const outerY = useTransform(scrollY, [0, 800], [0, -100]);
  const outerScale = useTransform(scrollY, [0, 800], [1, 1.2]);
  const outerOpacity = useTransform(scrollY, [0, 700], [0.55, 0]);

  const innerY = useTransform(scrollY, [0, 800], [0, -50]);
  const innerScale = useTransform(scrollY, [0, 800], [1, 0.8]);
  const innerOpacity = useTransform(scrollY, [0, 700], [0.55, 0]);

  if (!isMounted) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible">
      {/* outer orbit with entrance animation */}
      <motion.div
        initial={{ y: 200, opacity: 0.2 }}
        animate={isLoadingComplete ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 1.4, ease: entranceEasing, delay: 0.15 }}
        className="absolute"
      >
        <motion.div
          style={{
            y: outerY,
            scale: outerScale,
            opacity: outerOpacity,
            rotate: outerRotation,
          }}
        >
          <Image
            src="/orbit-outer.svg"
            alt=""
            width={2604}
            height={2595}
            className="w-[700px] md:w-[1250px] max-w-none h-auto"
            priority
          />
        </motion.div>
      </motion.div>
      {/* inner orbit with entrance animation */}
      <motion.div
        initial={{ y: 200, opacity: 0.2 }}
        animate={isLoadingComplete ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 1.4, ease: entranceEasing, delay: 0.1 }}
        className="absolute"
      >
        <motion.div
          style={{
            y: innerY,
            scale: innerScale,
            opacity: innerOpacity,
            rotate: innerRotation,
          }}
        >
          <Image
            src="/orbit-inner.svg"
            alt=""
            width={1856}
            height={1856}
            className="w-[750px] md:w-[1150px] max-w-none h-auto"
            priority
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
