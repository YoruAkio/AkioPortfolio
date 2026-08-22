"use client";

import { AnimatePresence, motion } from "framer-motion";
import { IconMenu, IconX } from "@tabler/icons-react";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { trackUmamiEvent } from "@/lib/analytics";
import { handleInitialHash, handleSmoothScroll } from "@/lib/smooth-scroll";
import { ThemeToggle } from "./theme-toggle";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    handleInitialHash();

    // @note scroll-spy: highlight the nav link whose section is centered in view
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    for (const { href } of navLinks) {
      const el = document.getElementById(href.slice(1));
      if (el) observer.observe(el);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    trackUmamiEvent("navbar_click", {
      target: href.replace("#", "") || "home",
    });
    handleSmoothScroll(e, href);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      {/* @note floating pill bar; narrows once the page is scrolled */}
      <nav
        className={`relative flex w-full items-center justify-between gap-3 transition-[max-width] duration-500 ease-out ${
          isScrolled ? "max-w-3xl" : "max-w-5xl"
        }`}
      >
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className="inline-flex h-12 items-center gap-2 rounded-full bg-card/90 pr-4 pl-3 shadow-lg shadow-black/10 inset-shadow-[0_1px_0_rgba(255,255,255,0.25)] backdrop-blur-xl transition-colors duration-200 hover:bg-card focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          <Image src="/logo.png" alt="Yoru Akio" width={36} height={36} className="h-9 w-auto" />
          <span className="text-sm font-semibold">Yoru Akio</span>
        </a>

        <div className="absolute top-1/2 left-1/2 hidden h-12 -translate-x-1/2 -translate-y-1/2 items-center rounded-full bg-card/90 px-2 shadow-lg shadow-black/10 inset-shadow-[0_1px_0_rgba(255,255,255,0.25)] backdrop-blur-xl md:flex">
          {navLinks.map((link, index) => (
            <Fragment key={link.href}>
              {index > 0 && <span className="h-4 w-px bg-foreground/15" />}
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`rounded-full px-3.5 py-2 text-sm transition-colors duration-150 ${
                  activeSection === link.href.slice(1)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </a>
            </Fragment>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-card/90 text-muted-foreground shadow-lg shadow-black/10 inset-shadow-[0_1px_0_rgba(255,255,255,0.25)] backdrop-blur-xl transition-colors duration-200 hover:bg-card hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 md:hidden"
          >
            {isMobileMenuOpen ? <IconX className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="absolute top-full mt-2 w-[calc(100%-2rem)] md:hidden"
          >
            <div className="rounded-2xl bg-card/95 p-2 shadow-xl shadow-black/10 backdrop-blur-xl">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`rounded-full px-4 py-2.5 text-sm transition-colors duration-200 ${
                      activeSection === link.href.slice(1)
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
