export default function About() {
  return (
    <section id="about" className="py-20 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-20">
          <h2 className="text-2xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6">
            About Me
          </h2>
          <p className="text-foreground/60 text-base sm:text-xl lg:text-2xl max-w-3xl mx-auto">
            A self-taught developer sharing my 4-year learning journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-xl sm:text-3xl lg:text-4xl font-semibold text-foreground mb-4 sm:mb-8">
              My Journey
            </h3>
            <p className="text-foreground/80 mb-4 sm:mb-6 text-base sm:text-lg lg:text-xl leading-relaxed">
              I started learning web development about 4 years ago, completely
              self-taught from online resources and lots of trial and error.
              What began as curiosity about how websites work has turned into a
              genuine passion for building things.
            </p>
            <p className="text-foreground/80 mb-6 sm:mb-8 text-base sm:text-lg lg:text-xl leading-relaxed">
              I'm still learning every day, but I've gotten comfortable with
              JavaScript and recently picked up Go for backend stuff. I love the
              problem-solving aspect of coding and the satisfaction of seeing an
              idea come to life in the browser.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-secondary border border-border text-foreground rounded-full text-sm sm:text-base lg:text-lg hover:bg-primary/20 hover:text-primary hover:border-primary/30 transition-colors">
                Always Learning
              </span>
              <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-secondary border border-border text-foreground rounded-full text-sm sm:text-base lg:text-lg hover:bg-primary/20 hover:text-primary hover:border-primary/30 transition-colors">
                Self-Taught
              </span>
              <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-secondary border border-border text-foreground rounded-full text-sm sm:text-base lg:text-lg hover:bg-primary/20 hover:text-primary hover:border-primary/30 transition-colors">
                4 Years Journey
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-background border border-border rounded-lg p-6">
              <h4 className="font-semibold text-foreground mb-3 text-lg lg:text-xl">
                Frontend Learning
              </h4>
              <p className="text-foreground/70 text-base lg:text-lg">
                Started with HTML/CSS, now comfortable with Next.js and
                exploring new frameworks
              </p>
            </div>
            <div className="bg-background border border-border rounded-lg p-6">
              <h4 className="font-semibold text-foreground mb-3 text-lg lg:text-xl">
                Backend Journey
              </h4>
              <p className="text-foreground/70 text-base lg:text-lg">
                Learning server-side development with Node.js and recently
                diving into Go
              </p>
            </div>
            <div className="bg-background border border-border rounded-lg p-6">
              <h4 className="font-semibold text-foreground mb-3 text-lg lg:text-xl">
                Growing Skills
              </h4>
              <p className="text-foreground/70 text-base lg:text-lg">
                Building projects to learn the full development process, from
                idea to deployment
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
