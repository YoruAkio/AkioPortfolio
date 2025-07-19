import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon, Menu, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = sectionId => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 64; // Height of fixed navbar (h-16 = 64px)
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
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b border-border z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
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

          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
            <div className="flex items-baseline space-x-8">
              <button
                onClick={() => scrollToSection('home')}
                className="text-foreground hover:text-primary transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-foreground hover:text-primary transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('skills')}
                className="text-foreground hover:text-primary transition-colors"
              >
                Skills
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className="text-foreground hover:text-primary transition-colors"
              >
                Projects
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {isMobileMenuOpen && (
          <>
            {/* Backdrop overlay for click outside to close */}
            <div
              className="md:hidden fixed inset-0 z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Dropdown menu */}
            <div className="md:hidden absolute top-full left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-lg animate-in slide-in-from-top-2 duration-200">
              <div className="max-w-6xl mx-auto px-4 py-4">
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      scrollToSection('home');
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 text-foreground hover:text-primary hover:bg-secondary/50 rounded-lg transition-colors font-medium"
                  >
                    🏠 Home
                  </button>
                  <button
                    onClick={() => {
                      scrollToSection('about');
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 text-foreground hover:text-primary hover:bg-secondary/50 rounded-lg transition-colors font-medium"
                  >
                    👨‍💻 About
                  </button>
                  <button
                    onClick={() => {
                      scrollToSection('skills');
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 text-foreground hover:text-primary hover:bg-secondary/50 rounded-lg transition-colors font-medium"
                  >
                    🛠️ Skills
                  </button>
                  <button
                    onClick={() => {
                      scrollToSection('projects');
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 text-foreground hover:text-primary hover:bg-secondary/50 rounded-lg transition-colors font-medium"
                  >
                    📁 Projects
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
