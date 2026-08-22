// @note shared motion language — premium personality, one signature ease everywhere
import type { Variants } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE },
  },
} satisfies Variants;

export const stagger = (delayChildren = 0, step = 0.08): { variants: Variants } => ({
  variants: {
    hidden: {},
    visible: { transition: { staggerChildren: step, delayChildren } },
  },
});
