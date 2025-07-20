import SEO from '@/components/SEO';
import Navbar from '@/components/Navbar';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <SEO
        title="Yoru Akio - Full-Stack Developer"
        description="Self-taught Full-Stack Developer from Indonesia showcasing web development projects. Specializing in front-end solutions and back-end development with Go and JavaScript."
      />
      <div className="min-h-screen bg-background relative">
        {/* Fixed Footer Layer (underneath) */}
        <Footer />

        {/* Main Content Layer (on top) */}
        <div className="relative z-10">
          <div className="bg-background">
            <Navbar />

            {/* Hero Section */}
            <section
              id="home"
              className="min-h-screen flex items-center justify-center pt-16"
            >
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-2xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6">
                  Hi, I'm <span className="text-primary">Yoru Akio</span>
                </h1>
                <p className="text-base sm:text-xl lg:text-2xl text-foreground/80 mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed">
                  Self-taught Full-Stack Developer from Indonesia showcasing web
                  development projects. Specializing in front-end solutions and
                  back-end development with Go and JavaScript.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <a
                    href="#projects"
                    className="px-5 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                  >
                    View My Work
                  </a>
                  <a
                    href="#about"
                    className="px-5 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base border border-border text-foreground rounded-lg hover:bg-secondary transition-colors font-medium"
                  >
                    About Me
                  </a>
                </div>
              </div>
            </section>

            <About />
            <Skills />
            <Projects />
          </div>

          {/* Spacer to allow footer reveal - responsive heights */}
          <div className="h-[40vh] [@media(max-width:390px)]:h-[40vh] [@media(max-width:1024px)]:h-[38vh] lg:h-[28vh]"></div>
        </div>
      </div>
    </>
  );
}
