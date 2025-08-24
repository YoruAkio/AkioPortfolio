import SEO from '@/components/SEO';
import Navbar from '@/components/Navbar';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Footer from '@/components/Footer';
import { HeroBadge } from '@/components/ui/HeroBadge';

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

      const navbarHeight = 80;
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
          className="min-h-screen flex items-center justify-center pt-16"
        >
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <HeroBadge />
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">
              Hi, I'm <span className="text-primary">Yoru Akio</span>
            </h1>
            <p className="text-sm sm:text-lg lg:text-xl text-foreground/80 mb-12 sm:mb-18 max-w-3xl mx-auto leading-relaxed">
              Self-taught Full-Stack Developer from Indonesia showcasing web
              development projects. Specializing in front-end solutions and
              back-end development with Go and JavaScript.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
              <button
                onClick={e => scrollToSection('projects', e)}
                className="px-4 py-2 sm:px-6 sm:py-2.5 text-xs sm:text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                View My Work
              </button>
              <button
                onClick={e => scrollToSection('about', e)}
                className="px-4 py-2 sm:px-6 sm:py-2.5 text-xs sm:text-sm border border-border text-foreground rounded-lg hover:bg-secondary transition-colors font-medium"
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
