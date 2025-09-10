import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon, Monitor, Menu, X, Home, User, Wrench, FolderOpen } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { theme, resolvedTheme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // @note check if screen is mobile to conditionally apply background
  useEffect(() => {
    const checkScreenSize = () => {
      const currentIsMobile = window.innerWidth < 768;
      setIsMobile(currentIsMobile);
      
      // @note close mobile menu when switching to desktop view
      if (!currentIsMobile && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [isMobileMenuOpen]);

  const scrollToSection = sectionId => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 88; // Height of floating navbar + margins (h-16 + top-4 + spacing)
      const elementTop = element.offsetTop;
      const elementHeight = element.offsetHeight;
      const windowHeight = window.innerHeight;

      // Calculate position to center the section
      const centerPosition =
        elementTop - windowHeight / 2 + elementHeight / 2 - navbarHeight / 2;

      window.scrollTo({
        top: Math.max(0, centerPosition),
        behavior: 'smooth',
      });
    }
  };

  return (
    <div
      className="fixed md:top-4 top-0 md:left-2 left-0 md:right-2 right-0 md:bg-transparent bg-background/90 md:backdrop-blur-none backdrop-blur-md md:border-none border-b border-border z-50"
      style={isMobile ? {
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        backgroundColor: 'var(--background)',
        opacity: '0.8'
      } : {
        backgroundColor: 'transparent'
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 md:py-0 py-2">
          <div className="flex justify-between items-center md:h-16 h-14">
            {/* Logo */}
            <div className="flex-shrink-0 relative w-14 h-10 rounded-full overflow-hidden">
              <Image
                src="https://raw.githubusercontent.com/YoruAkio/ProjectAssets/refs/heads/main/akio/akio/yoruakio.png"
                alt="Yoru Akio"
                fill
                sizes="40px"
                className="object-contain"
                priority
              />
            </div>

            {/* Floating Navigation Links */}
            <nav className="hidden md:block">
              <div className="bg-background/70 backdrop-blur-md border border-border rounded-full shadow-lg px-8 py-4 h-14" style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
                <div className="flex items-center justify-center space-x-8 h-full">
                  <button
                    onClick={() => scrollToSection('home')}
                    className="text-foreground hover:text-primary transition-colors focus:outline-none text-base font-medium"
                  >
                    Home
                  </button>
                  <button
                    onClick={() => scrollToSection('about')}
                    className="text-foreground hover:text-primary transition-colors focus:outline-none text-base font-medium"
                  >
                    About
                  </button>
                  <button
                    onClick={() => scrollToSection('skills')}
                    className="text-foreground hover:text-primary transition-colors focus:outline-none text-base font-medium"
                  >
                    Skills
                  </button>
                  <button
                    onClick={() => scrollToSection('projects')}
                    className="text-foreground hover:text-primary transition-colors focus:outline-none text-base font-medium"
                  >
                    Projects
                  </button>
                </div>
              </div>
            </nav>

            {/* Theme Switcher and Mobile Menu */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors focus:outline-none"
                aria-label={`Current theme: ${theme}. Click to toggle.`}
                title={`Theme: ${theme.charAt(0).toUpperCase() + theme.slice(1)}`}
              >
                {theme === 'system' ? (
                  <Monitor size={20} />
                ) : theme === 'dark' ? (
                  <Moon size={20} />
                ) : (
                  <Sun size={20} />
                )}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors focus:outline-none"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <>
              {/* Backdrop overlay for click outside to close */}
              <div
                className="md:hidden fixed inset-0 z-40"
                onClick={() => setIsMobileMenuOpen(false)}
              />

              {/* Dropdown menu */}
              <div className="md:hidden absolute top-full left-2 right-2 z-50 bg-background/70 backdrop-blur-md border border-border rounded-lg shadow-lg animate-in slide-in-from-top-2 duration-200 mt-2" style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
                <div className="px-6 py-6">
                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        scrollToSection('home');
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-4 w-full text-left px-6 py-4 text-foreground hover:text-primary hover:bg-secondary/50 rounded-lg transition-colors font-medium focus:outline-none"
                    >
                      <Home size={20} />
                      Home
                    </button>
                    <button
                      onClick={() => {
                        scrollToSection('about');
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-4 w-full text-left px-6 py-4 text-foreground hover:text-primary hover:bg-secondary/50 rounded-lg transition-colors font-medium focus:outline-none"
                    >
                      <User size={20} />
                      About
                    </button>
                    <button
                      onClick={() => {
                        scrollToSection('skills');
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-4 w-full text-left px-6 py-4 text-foreground hover:text-primary hover:bg-secondary/50 rounded-lg transition-colors font-medium focus:outline-none"
                    >
                      <Wrench size={20} />
                      Skills
                    </button>
                    <button
                      onClick={() => {
                        scrollToSection('projects');
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-4 w-full text-left px-6 py-4 text-foreground hover:text-primary hover:bg-secondary/50 rounded-lg transition-colors font-medium focus:outline-none"
                    >
                      <FolderOpen size={20} />
                      Projects
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
  );
}
