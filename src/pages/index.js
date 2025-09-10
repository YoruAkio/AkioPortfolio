import SEO from '@/components/SEO';
import Navbar from '@/components/Navbar';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Footer from '@/components/Footer';
import { HeroBadge } from '@/components/ui/HeroBadge';
import { motion } from 'motion/react';

export default function Home() {
  const scrollToSection = (sectionId, event) => {
    // Prevent any default behavior
    if (event) {
      event.preventDefault();
    }

    const element = document.getElementById(sectionId);
    if (element) {
      // Temporarily disable CSS smooth scrolling to prevent conflicts
      const originalScrollBehavior =
        document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = 'auto';

      const navbarHeight = 88; // Account for floating navbar height + top margin
      const elementTop =
        element.getBoundingClientRect().top + window.pageYOffset;
      const targetPosition = elementTop - navbarHeight;

      // Use smooth scrolling with animation
      window.scrollTo({
        top: Math.max(0, targetPosition),
        behavior: 'smooth',
      });

      // Restore original scroll behavior after a delay
      setTimeout(() => {
        document.documentElement.style.scrollBehavior = originalScrollBehavior;
      }, 1000);
    }
  };

  return (
    <>
      <SEO
        title="Yoru Akio - Full-Stack Developer"
        description="Self-taught Full-Stack Developer from Indonesia showcasing web development projects. Specializing in front-end solutions and back-end development with Go and JavaScript."
      />
      <div className="min-h-screen bg-background">
        <Navbar />

        {/* Hero Section */}
        <section
          id="home"
          className="min-h-screen w-full relative flex items-center justify-center pt-24"
        >
          {/* Background Pattern */}
          <div
            className="absolute inset-0 z-0 bg-background"
            style={{
              background: "radial-gradient(125% 180% at 50% 100%, var(--background) 40%, var(--primary) 100%)",
            }}
          />
          
          {/* Hero Content */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <HeroBadge />
            <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6">
              Hi, I'm <span className="text-primary">Yoru Akio</span>
            </h1>
            <p className="text-base sm:text-xl lg:text-2xl text-foreground/80 mb-16 sm:mb-20 max-w-4xl mx-auto leading-relaxed">
              Self-taught Full-Stack Developer from Indonesia showcasing web
              development projects. Specializing in front-end solutions and
              back-end development with Go and JavaScript.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button
                onClick={e => scrollToSection('projects', e)}
                className="px-6 py-3 sm:px-8 sm:py-3.5 text-sm sm:text-base bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                View My Work
              </button>
              <button
                onClick={e => scrollToSection('about', e)}
                className="px-6 py-3 sm:px-8 sm:py-3.5 text-sm sm:text-base border border-border text-foreground rounded-lg hover:bg-secondary transition-colors font-medium"
              >
                About Me
              </button>
            </div>
          </div>
        </section>

        <About />
        <Skills />
        <Projects />

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
