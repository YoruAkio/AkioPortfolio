import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  const scrollToSection = sectionId => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 64; // Height of fixed navbar (h-16 = 64px)
      const elementTop = element.offsetTop;
      const elementHeight = element.offsetHeight;
      const windowHeight = window.innerHeight;

      // Calculate position to center the section
      const centerPosition =
        elementTop - windowHeight / 2 + elementHeight / 2 - (navbarHeight / 2);

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

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
