'use client';

import Image from 'next/image';
import { ArrowDown } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { OrbitBackground } from '@/components/home/orbit-background';
import { AboutSection } from '@/components/home/about-section';
import { SkillsSection } from '@/components/home/skills-section';
import { ProjectsSection } from '@/components/home/projects-section';
import { ContactSection } from '@/components/home/contact-section';
import { Button } from '@/components/ui/button';
import { handleSmoothScroll } from '@/lib/smooth-scroll';
import { useLoading } from '@/lib/loading-context';
import { useTheme } from 'next-themes';
import { LightRaysBackground } from '@/components/home/light-rays-background';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { useEffect, useState } from 'react';

// @note spring config for smooth parallax
const springConfig = { stiffness: 50, damping: 30, mass: 1 };

// @note custom easing for entrance animation
const entranceEasing = [0.74, 0.01, 0.16, 0.87] as const;

export default function Page() {
  const { scrollY } = useScroll();
  const { isLoadingComplete } = useLoading();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // @note parallax transforms for hero elements (slower movement)
  const heroYRaw = useTransform(scrollY, [0, 600], [0, -80]);
  const heroOpacityRaw = useTransform(scrollY, [0, 400], [1, 0]);
  const heroBlurRaw = useTransform(scrollY, [0, 300], [0, 6]);

  const logoScaleRaw = useTransform(scrollY, [0, 400], [1, 0.5]);
  const logoYRaw = useTransform(scrollY, [0, 400], [0, -180]);
  const logoOpacityRaw = useTransform(scrollY, [200, 350], [1, 0]);

  // @note apply springs for smooth response
  const heroY = useSpring(heroYRaw, springConfig);
  const heroOpacity = useSpring(heroOpacityRaw, springConfig);
  const heroBlur = useSpring(heroBlurRaw, springConfig);

  const logoScale = useSpring(logoScaleRaw, springConfig);
  const logoY = useSpring(logoYRaw, springConfig);
  const logoOpacity = useSpring(logoOpacityRaw, springConfig);

  return (
    <>
      <Navbar />
      {/* hero section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-clip bg-linear-to-b from-secondary/60 to-background"
      >
        {resolvedTheme === 'light' && mounted && (
          <motion.div
            className="absolute inset-0 z-0"
            initial={{ opacity: 0, y: -50 }}
            animate={isLoadingComplete ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 1.3,
              delay: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              backgroundImage: `
                      linear-gradient(to right, #ce9cf0 1px, transparent 1px),
                      linear-gradient(to bottom, #ce9cf0 1px, transparent 1px)
                    `,
              backgroundSize: '20px 30px',
              WebkitMaskImage:
                'radial-gradient(ellipse 70% 45% at 50% 0%, #000 60%, transparent 100%)',
              maskImage:
                'radial-gradient(ellipse 70% 45% at 50% 0%, #000 60%, transparent 100%)',
            }}
          />
        )}

        {/* Light Rays Background Only Dark Mode */}
        {resolvedTheme === 'dark' && mounted && (
          <>
            <OrbitBackground />
            <motion.div
              className="absolute inset-0 z-0"
              initial={{ opacity: 0, y: 0 }}
              animate={isLoadingComplete ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 5.51,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <LightRaysBackground
                raysOrigin="top-center"
                raysColor="#c38be8"
                className="absolute inset-0 z-1"
              />
            </motion.div>
          </>
        )}

        {/* logo - animated with parallax + entrance animation */}
        <motion.div
          initial={{ y: 250, opacity: 0 }}
          animate={isLoadingComplete ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: entranceEasing }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-[5] -translate-y-36 sm:-translate-y-24 md:-translate-y-28"
        >
          <motion.div
            style={{ scale: logoScale, y: logoY, opacity: logoOpacity }}
          >
            <Image
              src="/logo.png"
              alt="Yoru Akio"
              width={800}
              height={320}
              className="h-36 sm:h-56 md:h-72 lg:h-80 w-auto opacity-90"
              priority
            />
          </motion.div>
        </motion.div>

        <motion.div
          style={{
            y: heroY,
            opacity: heroOpacity,
            filter: useTransform(heroBlur, v => `blur(${v}px)`),
          }}
          className="container mx-auto px-6 py-24 relative z-10"
        >
          <div className="max-w-4xl mx-auto text-center">
            {/* spacer for logo */}
            <div className="h-28 sm:h-32 md:h-40 lg:h-48 mb-4 md:mb-6" />

            {/* description with entrance animation */}
            <motion.p
              initial={{ y: 80, opacity: 0 }}
              animate={isLoadingComplete ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, ease: entranceEasing, delay: 0.15 }}
              className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 md:mb-12 px-2"
            >
              Crafting modern web experiences with clean code and creative
              solutions. Full-stack developer passionate about building
              performant applications with Go, TypeScript, and modern
              frameworks.
            </motion.p>

            {/* buttons with entrance animation */}
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={isLoadingComplete ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, ease: entranceEasing, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                asChild
                size="lg"
                className="rounded-full px-6 py-3 shadow-lg shadow-primary/25"
              >
                <a
                  href="#projects"
                  onClick={e => handleSmoothScroll(e, '#projects')}
                >
                  View My Work
                  <ArrowDown className="h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-6 py-3"
              >
                <a href="#about" onClick={e => handleSmoothScroll(e, '#about')}>
                  About Me
                </a>
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* scroll indicator with entrance animation */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isLoadingComplete ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: entranceEasing, delay: 0.45 }}
          style={{ opacity: heroOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10"
        >
          <ArrowDown className="h-5 w-5 text-primary/60" />
        </motion.div>
      </section>

      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </>
  );
}
