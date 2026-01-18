"use client";

import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { handleSmoothScroll } from "@/lib/smooth-scroll";
import RotatingText from "@/components/ui/rotating-text";

// @note rotating words for CTA
const rotatingWords = ["Together", "Better", "Amazing", "Creative", "Awesome"];

// @note reveal animation config
const revealAnimation = {
  initial: { y: -180, opacity: 0, filter: "blur(10px)" },
  animate: { y: 0, opacity: 1, filter: "blur(0px)" },
  transition: { 
    duration: 1.4, 
    delay: 0.5, 
    ease: [0.22, 1, 0.36, 1] as const,
  },
};

// @note staggered children animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.8,
    },
  },
};

const itemVariants = {
  hidden: { y: -60, opacity: 0, filter: "blur(6px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

// @note call to action section with reveal animation
export function ContactSection() {
  return (
    <section
      className="relative pb-10 pt-12 overflow-hidden bg-linear-to-b from-secondary/30 to-background"
    >
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={revealAnimation.initial}
          whileInView={revealAnimation.animate}
          viewport={{ once: true }}
          transition={revealAnimation.transition}
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-6"
              variants={itemVariants}
            >
              Let&apos;s Build Something{" "}
              <RotatingText
                texts={rotatingWords}
                mainClassName="inline-flex overflow-hidden text-primary"
                rotationInterval={2500}
                transition={{ type: "spring", damping: 20, stiffness: 200 }}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
              />
            </motion.h2>
            <motion.p
              className="text-lg text-muted-foreground mb-8"
              variants={itemVariants}
            >
              I&apos;m always excited about new projects and collaborations. Feel
              free to reach out!
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              variants={itemVariants}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="mailto:yoruakio@proton.me"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
                >
                  <Mail className="h-4 w-4" />
                  Get in Touch
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a
                  href="#about"
                  onClick={(e) => handleSmoothScroll(e, '#about')}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-full border border-border hover:border-primary/30 hover:bg-primary/10 hover:text-primary transition-all duration-300"
                >
                  Learn More About Me
                  <ArrowRight className="h-4 w-4" />
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
