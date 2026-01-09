"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";
import { FaDiscord, FaXTwitter, FaGithub } from "react-icons/fa6";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { handleSmoothScroll } from "@/lib/smooth-scroll";

const socialLinks = [
  { href: "https://github.com/YoruAkio", icon: FaGithub, label: "GitHub" },
  { href: "https://discord.com/users/798258457022046218", icon: FaDiscord, label: "Discord" },
  { href: "https://x.com/YoruAkio", icon: FaXTwitter, label: "Twitter" },
  { href: "mailto:yoruakio@proton.me", icon: Mail, label: "Email" },
];

const footerLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
];

// @note footer with large background typography, social links and parallax person image
export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  // @note parallax: rotate from right (outside) to left (-30deg when fully visible)
  const rotateRaw = useTransform(scrollYProgress, [0, 1], [60, -30]);
  const xRaw = useTransform(scrollYProgress, [0, 1], [300, 0]);
  const opacityRaw = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  // @note smooth spring for less jitter
  const rotate = useSpring(rotateRaw, { stiffness: 100, damping: 30, mass: 1 });
  const x = useSpring(xRaw, { stiffness: 100, damping: 30, mass: 1 });
  const opacity = useSpring(opacityRaw, { stiffness: 100, damping: 30, mass: 1 });

  return (
    <footer ref={footerRef} className="relative overflow-hidden bg-background">
      {/* radial gradient background from bottom */}
      <div
        className="absolute inset-0 z-0 bg-[radial-gradient(120%_200%_at_50%_100%,var(--color-primary)_0%,transparent_50%)] opacity-20"
      />

      {/* big akio text as background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <h2 className="text-[8rem] sm:text-[12rem] md:text-[18rem] lg:text-[24rem] font-bold leading-none tracking-tighter text-background dark:text-background/30">
          akio
        </h2>
      </div>

      {/* akio person image - bottom right with parallax */}
      <motion.div
        className="absolute bottom-0 sm:-bottom-2 md:bottom-0 -right-12 sm:-right-8 md:-right-12 lg:-right-16 z-[15] origin-bottom-right"
        style={{ rotate, x, opacity }}
      >
        <motion.div
          initial={{ filter: "drop-shadow(0 0 0px rgba(90, 4, 147, 0))" }}
          whileHover={{ 
            scale: 1.1,
            filter: "drop-shadow(0 0 25px rgba(90, 4, 147, 0.85))",
          }}
          transition={{ duration: 0.3 }}
          className="cursor-pointer h-[150px] sm:h-[140px] md:h-[180px]"
        >
          <Image
            src="/akio_person.png"
            alt="Akio"
            width={200}
            height={250}
            className="h-full w-auto"
          />
        </motion.div>
      </motion.div>

      {/* content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-8 min-h-[240px] flex flex-col">
        {/* main content */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-6 flex-1">
          {/* left - logo and links */}
          <div className="flex flex-col gap-4">
            <a href="#home" onClick={(e) => handleSmoothScroll(e, '#home')}>
              <Image
                src="/logo.png"
                alt="Yoru Akio"
                width={160}
                height={64}
                className="h-16 w-auto"
              />
            </a>
            <div className="flex flex-wrap items-center gap-4">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* right - socials */}
          <div className="flex items-center gap-3 pb-4 md:pb-8 z-20 relative">
            {socialLinks.map((social) => (
              <Link
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200"
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>

        {/* copyright - bottom */}
        <div className="pt-6 mt-auto border-t border-border/50">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Yoru Akio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
