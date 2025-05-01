import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaGithub } from 'react-icons/fa';
import Link from 'next/link';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollStep, setScrollStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if mobile on mount and when window is resized
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Track scroll position for step-based transitions
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY < 100) {
        setScrollStep(0); // Initial state - full width
      } else if (scrollY < 200) {
        setScrollStep(1); // Step 1 - 90% width
      } else if (scrollY < 300) {
        setScrollStep(2); // Step 2 - 80% width
      } else {
        setScrollStep(3); // Step 3 - 75% width (final)
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Define width percentages based on scroll step and screen size
  const desktopWidths = [100, 90, 80, 75];
  const mobileWidths = [95, 90, 85, 80]; // Wider on mobile
  
  const widthPercentages = isMobile ? mobileWidths : desktopWidths;
  const currentWidth = widthPercentages[scrollStep];

  // Calculate other styles based on scroll step
  const marginTop = Math.min(scrollStep * 2, 4); // Max 4px margin
  const borderRadius = 16 + scrollStep * 4; // Smoother radius increase
  const opacity = 0.8; // Slightly increased opacity for better visibility on mobile

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 transition-all duration-300 flex justify-center px-4">
      <div
        style={{
          width: `${currentWidth}%`,
          marginTop: `${marginTop}px`,
          borderRadius: `${borderRadius}px`,
          backgroundColor: `rgba(13, 17, 23, ${opacity})`,
          backdropFilter: 'blur(8px)',
          boxShadow:
            scrollStep > 0
              ? '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
              : 'none',
        }}
        className="transition-all duration-300 ease-out py-3 max-w-6xl"
      >
        <nav className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/">
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-400">
                  Yoru<span className="text-purple-400">Akio</span>
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="hidden md:flex items-center space-x-8"
            >
              <ul className="flex space-x-6">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <a
                      href={link.href}
                      className="text-zinc-300 hover:text-purple-400 transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <motion.a
                href="https://github.com/YoruAkio"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-zinc-800/80 hover:bg-purple-900/40 transition-colors duration-300 backdrop-blur-sm border border-zinc-700/70"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGithub className="text-zinc-100" />
              </motion.a>
            </motion.div>

            {/* Mobile menu button */}
            <motion.div
              className="md:hidden"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg bg-zinc-800/80 text-zinc-100 backdrop-blur-sm border border-zinc-700/50"
              >
                {isMobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
              </button>
            </motion.div>
          </div>
        </nav>
      </div>

      {/* Floating Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-full mt-2 mx-auto w-[90%] left-0 right-0"
            style={{
              borderRadius: "16px",
              backgroundColor: "rgba(13, 17, 23, 0.9)",
              backdropFilter: "blur(8px)",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.05)"
            }}
          >
            <div className="py-3 px-4">
              <ul className="grid grid-cols-2 gap-x-2 gap-y-0.5">
                {navLinks.map(link => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-zinc-300 hover:text-purple-400 transition-colors flex items-center py-2 px-3 rounded-lg hover:bg-zinc-800/50"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
              
              <div className="mt-2 pt-2 border-t border-zinc-800">
                <a
                  href="https://github.com/YoruAkio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-zinc-300 hover:text-purple-400 bg-zinc-800/50 hover:bg-zinc-800 transition-colors py-2 px-4 rounded-lg w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaGithub /> GitHub Profile
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}