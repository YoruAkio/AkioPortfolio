"use client";

import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { FaGithub } from "react-icons/fa6";
import PixelBlast from "@/components/ui/pixel-blast";
import { Button } from "@/components/ui/button";
import ShinyText from "@/components/ui/shiny-text";
import { trackUmamiEvent } from "@/lib/analytics";
import { handleSmoothScroll } from "@/lib/smooth-scroll";

const springConfig = { stiffness: 50, damping: 30, mass: 1 };
const entranceEasing = [0.74, 0.01, 0.16, 0.87] as const;

export function HeroSection() {
  const { scrollY } = useScroll();

  useEffect(() => {
    trackUmamiEvent("website_opened", {
      page: "home",
    });
  }, []);

  const heroYRaw = useTransform(scrollY, [0, 600], [0, -90]);
  const heroOpacityRaw = useTransform(scrollY, [0, 420], [1, 0]);
  const heroY = useSpring(heroYRaw, springConfig);
  const heroOpacity = useSpring(heroOpacityRaw, springConfig);

  return (
    <section
      id="home"
      className="grid-section relative min-h-[60dvh] overflow-hidden border-b-0 pt-12 md:pt-16"
    >
      <PixelBlast
        variant="square"
        pixelSize={5}
        color="#898989"
        patternScale={2.5}
        patternDensity={1.8}
        pixelSizeJitter={0}
        enableRipples
        rippleSpeed={0.4}
        rippleThickness={0.12}
        rippleIntensityScale={1.5}
        liquid={false}
        liquidStrength={0.12}
        liquidRadius={1.2}
        liquidWobbleSpeed={5}
        speed={0.75}
        edgeFade={0.25}
        transparent
        className="!absolute inset-0 z-0"
      />

      {/* @note radial scrim — larger ellipse with a wider solid core masks pixels behind the text, fades to transparent at the edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 90% 100% at 50% 50%, color-mix(in oklab, var(--background) 75%, transparent) 25%, color-mix(in oklab, var(--background) 55%, transparent) 65%, transparent 95%)",
        }}
      />

      <div className="relative z-10 grid min-h-[calc(60dvh-9.5rem)] place-items-center px-5 py-10 sm:px-8 md:py-14">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
          <motion.div
            initial={{ y: 24, opacity: 0, filter: "blur(8px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: entranceEasing }}
            className="mb-2.5 inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-muted-foreground"
          >
            <Sparkles className="h-3.5 w-3.5 text-foreground" />
            <ShinyText
              text="Full-stack Developer"
              color="var(--muted-foreground)"
              shineColor="var(--foreground)"
              speed={4}
            />
            <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] text-primary-foreground">
              2026
            </span>
          </motion.div>

          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: entranceEasing, delay: 0.05 }}
            style={{ y: heroY, opacity: heroOpacity }}
            className="relative"
          >
            <div className="pointer-events-none absolute -inset-24 rounded-full bg-primary/6 blur-3xl" />
            <Image
              src="/logo.png"
              alt="Yoru Akio"
              width={820}
              height={328}
              className="relative mx-auto h-24 w-auto opacity-95 sm:h-36 md:h-44 lg:h-52"
              priority
            />
          </motion.div>

          <motion.h1
            initial={{ y: 34, opacity: 0, filter: "blur(8px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: entranceEasing, delay: 0.14 }}
            className="mt-2.5 max-w-3xl text-balance text-[36px] font-bold leading-9 tracking-[-0.045em] sm:text-[44px] sm:leading-11 md:text-[52px] md:leading-[52px]"
          >
            Self-taught fullstack developer, just tryna make a livin.
          </motion.h1>

          <motion.p
            initial={{ y: 34, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: entranceEasing, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-6"
          >
            <ShinyText
              text="I build web products with TypeScript, Go, and Next.js — focused on speed, clear UI, and systems that stay easy to change."
              color="var(--muted-foreground)"
              shineColor="var(--foreground)"
              speed={4}
            />
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: entranceEasing, delay: 0.3 }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button asChild size="lg" className="rounded-lg">
              <a
                href="#projects"
                onClick={(e) => {
                  trackUmamiEvent("hero_cta_click", {
                    cta: "view_my_work",
                    target: "projects",
                  });
                  handleSmoothScroll(e, "#projects");
                }}
              >
                View Projects
                <FaGithub className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="secondary" size="lg" className="rounded-lg">
              <a
                href="#about"
                onClick={(e) => {
                  trackUmamiEvent("hero_cta_click", {
                    cta: "about_me",
                    target: "about",
                  });
                  handleSmoothScroll(e, "#about");
                }}
              >
                About Me
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
