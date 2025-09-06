import SEO from '@/components/SEO';
import Navbar from '@/components/Navbar';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Footer from '@/components/Footer';
import { HeroBadge } from '@/components/ui/HeroBadge';
import ScrollMorph, { ScrollMorphContainer } from '@/components/ui/ScrollMorph';

export default function Home() {
  const scrollToSection = (sectionId, event) => {
    if (event) {
      event.preventDefault();
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const originalScrollBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = 'auto';

      const navbarHeight = 80;
      const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
      const targetPosition = elementTop - navbarHeight;

      window.scrollTo({
        top: Math.max(0, targetPosition),
        behavior: 'smooth',
      });

      setTimeout(() => {
        document.documentElement.style.scrollBehavior = originalScrollBehavior;
      }, 1000);
    }
  };

  return (
    <>
      <SEO
        title="Raol Mukarrozi - Full-Stack Developer"
        description="Self-taught Full-Stack Developer from Indonesia showcasing web development projects. Specializing in front-end solutions and back-end development with JavaScript and modern web technologies."
      />
      <div className="min-h-screen bg-background">
        <Navbar />

        <section
          id="home"
          className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="mb-8">
              <HeroBadge />
            </div>
            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary animate-pulse">Raol Mukarrozi</span>
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-foreground/70 mb-12 max-w-4xl mx-auto leading-relaxed">
              Self-taught Full-Stack Developer from Indonesia showcasing web
              development projects. Specializing in front-end solutions and
              back-end development with JavaScript and modern web technologies.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={e => scrollToSection('projects', e)}
                className="group px-8 py-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-xl hover:from-primary/90 hover:to-primary/70 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span className="flex items-center gap-2">
                  View My Work
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
              
              <button
                onClick={e => scrollToSection('about', e)}
                className="group px-8 py-4 border-2 border-border text-foreground rounded-xl hover:border-primary hover:bg-primary/5 transition-all duration-300 font-semibold text-lg backdrop-blur-sm"
              >
                <span className="flex items-center gap-2">
                  About Me
                  <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
              </button>
            </div>
            
            <div className="mt-16 flex justify-center">
              <div className="animate-bounce">
                <svg className="w-6 h-6 text-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        <ScrollMorphContainer>
          <ScrollMorph direction="up" delay={0}>
            <About />
          </ScrollMorph>
          
          <ScrollMorph direction="down" delay={1}>
            <Skills />
          </ScrollMorph>
          
          <ScrollMorph direction="up" delay={2}>
            <Projects />
          </ScrollMorph>
        </ScrollMorphContainer>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
