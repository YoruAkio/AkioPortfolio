"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Code2, FolderGit2, Home, Mail, Menu, User, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { trackUmamiEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { handleInitialHash, handleSmoothScroll } from "@/lib/smooth-scroll";
import { ThemeToggle } from "./theme-toggle";

const navLinks = [
  { href: "#home", label: "Home", icon: Home },
  { href: "#about", label: "About", icon: User },
  { href: "#skills", label: "Skills", icon: Code2 },
  { href: "#projects", label: "Projects", icon: FolderGit2 },
  { href: "#contact", label: "Contact", icon: Mail },
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
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`absolute inset-0 border-b border-border bg-background/90 backdrop-blur-xl transition-opacity duration-300 ${
          isScrolled ? "opacity-100" : "opacity-95"
        }`}
      />

      <div className="relative mx-auto max-w-[1010px] border-x border-border">
        <nav className="flex h-14 items-center justify-between px-4 sm:px-6 md:h-17">
          <div className="flex items-center gap-4">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, "#home")}
              className="inline-flex items-center rounded-xl transition-colors duration-200 focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              <span className="grid h-12 w-12 place-items-center">
                <Image
                  src="/logo.png"
                  alt="Yoru Akio"
                  width={48}
                  height={48}
                  className="h-12 w-auto"
                />
              </span>
            </a>

            <div className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm transition-colors duration-200 ${
                      activeSection === link.href.slice(1)
                        ? "bg-secondary text-foreground shadow-[inset_0_1px_0_color-mix(in_oklab,currentColor_25%,transparent)]"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {link.label}
                  </a>
                );
              })}
            </div>
          </div>

          <div className="hidden md:flex">
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-muted-foreground hover:bg-primary hover:text-primary-foreground"
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="absolute left-2 right-2 top-full mt-2 md:hidden"
          >
            <div className="rounded-xl border border-border bg-card p-3 shadow-[0_12px_40px_rgba(26,26,26,0.04)]">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`rounded-lg px-4 py-2.5 text-sm transition-colors duration-200 ${
                      activeSection === link.href.slice(1)
                        ? "bg-secondary text-foreground shadow-[inset_0_1px_0_color-mix(in_oklab,currentColor_25%,transparent)]"
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
