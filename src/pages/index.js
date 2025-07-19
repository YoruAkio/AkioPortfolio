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
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold text-foreground mb-8">
                  Hi, I'm <span className="text-primary">Yoru Akio</span>
                </h1>
                <p className="text-2xl sm:text-3xl lg:text-4xl text-foreground/80 mb-10 max-w-5xl mx-auto leading-relaxed">
                  Self-taught Full-Stack Developer from Indonesia showcasing web
                  development projects. Specializing in front-end solutions and
                  back-end development with Go and JavaScript.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <a
                    href="#projects"
                    className="px-10 py-4 text-lg bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                  >
                    View My Work
                  </a>
                  <a
                    href="#about"
                    className="px-10 py-4 text-lg border border-border text-foreground rounded-lg hover:bg-secondary transition-colors font-medium"
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

          {/* Spacer to allow footer reveal - half screen height */}
          <div className="h-[37vh]"></div>
        </div>
      </div>
    </>
  );
}
