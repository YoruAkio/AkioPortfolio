'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './theme-toggle';
import { cn } from '@/lib/utils';
import { handleSmoothScroll, handleInitialHash } from '@/lib/smooth-scroll';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
];

// @note navbar with smooth floating transition and logo animation on scroll
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  // @note logo transforms - appears when scrolled past hero logo
  const logoOpacity = useTransform(scrollY, [150, 250], [0, 1]);
  const logoScale = useTransform(scrollY, [150, 250], [0.5, 1]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    
    // @note handle initial hash on page load
    handleInitialHash();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // @note wrap smooth scroll to also close mobile menu
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    handleSmoothScroll(e, href);
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={false}
      animate={{
        top: isScrolled ? 16 : 0,
      }}
      transition={{
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      }}
      className="fixed left-0 right-0 z-50"
    >
      {/* full width blur background - only visible when not scrolled */}
      <motion.div
        initial={false}
        animate={{
          opacity: isScrolled ? 0 : 1,
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0, 0.2, 1],
        }}
        className="absolute inset-0 backdrop-blur-xl bg-background/30 pointer-events-none"
      />

      {/* navbar container */}
      <motion.div
        initial={false}
        animate={{
          maxWidth: isScrolled ? 768 : 1200,
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: isScrolled ? 0 : 24,
          paddingRight: isScrolled ? 0 : 24,
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0, 0.2, 1],
        }}
        className="relative"
      >
        <motion.div
          initial={false}
          animate={{
            borderRadius: isScrolled ? 9999 : 0,
            backgroundColor: isScrolled ? 'var(--color-card)' : 'transparent',
            borderColor: isScrolled ? 'var(--color-border)' : 'transparent',
            boxShadow: isScrolled 
              ? '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' 
              : '0 0 0 0 transparent',
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1],
          }}
          className={cn(
            'border',
            isScrolled && 'backdrop-blur-xl',
          )}
          style={{
            opacity: isScrolled ? 0.9 : 1,
          }}
        >
          <motion.nav
            initial={false}
            animate={{
              paddingTop: isScrolled ? 12 : 16,
              paddingBottom: isScrolled ? 12 : 16,
            }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="flex items-center justify-between px-6"
          >
            <a 
              href="#home" 
              onClick={(e) => handleNavClick(e, '#home')}
              className="relative h-8 flex items-center"
            >
              {/* text logo - visible when not scrolled */}
              <motion.span
                style={{ opacity: useTransform(scrollY, [100, 200], [1, 0]) }}
                className={cn(
                  'font-bold tracking-tight text-xl',
                  'bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent',
                )}
              >
                akio
              </motion.span>

              {/* image logo - appears when scrolled */}
              <motion.div
                style={{ opacity: logoOpacity, scale: logoScale }}
                className="absolute left-0"
              >
                <Image
                  src="/logo.png"
                  alt="Yoru Akio"
                  width={256}
                  height={256}
                  className="h-22 w-auto object-contain"
                />
              </motion.div>
            </a>

            {/* desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-3 py-1.5 text-sm text-muted-foreground hover:text-primary rounded-full hover:bg-primary/10 transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
              <div className="ml-2">
                <ThemeToggle />
              </div>
            </div>

            {/* mobile menu button */}
            <div className="flex md:hidden items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-all duration-200"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </motion.nav>
        </motion.div>
      </motion.div>

      {/* mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden absolute top-full left-0 right-0 mt-2 mx-2 sm:mx-4"
          >
            <div className="p-4 rounded-2xl bg-card/95 backdrop-blur-xl border border-border shadow-lg">
              <div className="flex flex-col gap-1">
                {navLinks.map(link => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="px-4 py-2.5 text-sm text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-xl transition-all duration-200"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
