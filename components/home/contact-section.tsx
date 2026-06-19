"use client";

import "slot-text/style.css";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { FaDiscord } from "react-icons/fa";
import { SlotText } from "slot-text/react";
import { chromatic, type SlotOptions } from "slot-text";
import { handleSmoothScroll } from "@/lib/smooth-scroll";
import { Button } from "@/components/ui/button";
import { trackUmamiEvent } from "@/lib/analytics";

// @note rotating words for CTA
const rotatingWords = ["Together", "Better", "Amazing", "Creative", "Awesome"];

// @note slot-text roll: each glyph slides up, flashing a cyan-shifted spectrum before settling
const slotOptions: SlotOptions = {
  direction: "up",
  color: chromatic({ from: 190 }),
  skipUnchanged: false,
};

// @note cycles the CTA word, letting slot-text animate each transition
function RollingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <SlotText
      text={rotatingWords[index]}
      options={slotOptions}
      className="inline-flex text-primary"
    />
  );
}

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
    <section className="relative pb-10 pt-12 overflow-hidden bg-linear-to-b from-secondary/30 to-background">
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
            <motion.h2 className="text-3xl md:text-4xl font-bold mb-6" variants={itemVariants}>
              Let&apos;s Build Something <RollingWord />
            </motion.h2>
            <motion.p className="text-lg text-muted-foreground mb-8" variants={itemVariants}>
              I&apos;m always excited about new projects and collaborations. Feel free to reach out!
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              variants={itemVariants}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  size="lg"
                  className="rounded-full px-6 py-3 shadow-lg shadow-primary/25"
                >
                  <a
                    href="https://discord.com/users/798258457022046218"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackUmamiEvent("contact_cta_click", {
                        cta: "get_in_touch",
                        target: "discord",
                      })
                    }
                  >
                    Get in Touch
                    <FaDiscord className="h-4 w-4" />
                  </a>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild variant="outline" size="lg" className="rounded-full px-6 py-3">
                  <a
                    href="#about"
                    onClick={(e) => {
                      trackUmamiEvent("contact_cta_click", {
                        cta: "learn_more_about_me",
                        target: "about",
                      });
                      handleSmoothScroll(e, "#about");
                    }}
                  >
                    Learn More About Me
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
