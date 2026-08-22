"use client";

import "slot-text/style.css";
import { IconArrowRight, IconMessageCircle } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaDiscord } from "react-icons/fa";
import { SlotText } from "slot-text/react";
import { chromatic, type SlotOptions } from "slot-text";
import { Button } from "@/components/ui/button";
import { trackUmamiEvent } from "@/lib/analytics";
import { handleSmoothScroll } from "@/lib/smooth-scroll";

const rotatingWords = ["Clean", "Fast", "Useful", "Calm"];

const slotOptions: SlotOptions = {
  direction: "up",
  color: chromatic({ from: 0 }),
  skipUnchanged: false,
};

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

const revealAnimation = {
  initial: { y: 56, opacity: 0, filter: "blur(10px)" },
  animate: { y: 0, opacity: 1, filter: "blur(0px)" },
  transition: {
    duration: 0.9,
    delay: 0.1,
    ease: [0.22, 1, 0.36, 1] as const,
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.25,
    },
  },
};

const itemVariants = {
  hidden: { y: 32, opacity: 0, filter: "blur(6px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function ContactSection() {
  return (
    <section id="contact" className="grid-section relative py-24 sm:py-32">
      <div className="stripe-band absolute inset-x-0 top-0 h-14 opacity-70" />
      <div className="relative z-10 mx-auto px-5 sm:px-8">
        <motion.div
          className="mx-auto max-w-3xl text-center"
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
            <motion.div
              variants={itemVariants}
              className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary"
            >
              <IconMessageCircle className="h-5 w-5" />
            </motion.div>
            <motion.h2
              className="text-balance text-[36px] font-bold leading-9 tracking-[-0.045em] md:text-[44px] md:leading-11"
              variants={itemVariants}
            >
              Have an idea? Let&apos;s keep it <RollingWord />.
            </motion.h2>
            <motion.p
              className="mx-auto mt-6 max-w-xl text-pretty text-base leading-7 text-muted-foreground md:text-lg"
              variants={itemVariants}
            >
              Send the rough version. I can help turn it into a clear interface, API, or full
              product.
            </motion.p>
            <motion.div
              className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
              variants={itemVariants}
            >
              <Button
                asChild
                size="lg"
                className="corner-squircle h-11 w-full min-w-36 rounded-[26px] sm:w-auto px-3.5 text-[0.95rem] transition-[padding] duration-300 ease-out hover:px-6"
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
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="corner-squircle h-11 w-full min-w-36 rounded-[26px] sm:w-auto px-3.5 text-[0.95rem] transition-[padding] duration-300 ease-out hover:px-6"
              >
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
                  Read More
                  <IconArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
