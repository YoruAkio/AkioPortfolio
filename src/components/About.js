import { motion } from 'motion/react';

export default function About() {
  return (
    <section id="about" className="py-12 sm:py-16 bg-secondary/30">
      <motion.div
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
        initial={{
          opacity: 0,
          y: 50
        }}
        whileInView={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.8,
          ease: "easeOut"
        }}
        viewport={{ once: true, margin: "-50px", amount: 0.1 }}
      >
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            About Me
          </h2>
          <p className="text-foreground/60 text-sm sm:text-lg lg:text-xl max-w-2xl mx-auto">
            A self-taught developer sharing my 4-year learning journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-lg sm:text-2xl lg:text-3xl font-semibold text-foreground mb-3 sm:mb-5">
              My Journey
            </h3>
            <p className="text-foreground/80 mb-3 sm:mb-4 text-sm sm:text-base lg:text-lg leading-relaxed">
              I started learning web development about 4 years ago, completely
              self-taught from online resources and lots of trial and error.
              What began as curiosity about how websites work has turned into a
              genuine passion for building things.
            </p>
            <p className="text-foreground/80 mb-4 sm:mb-6 text-sm sm:text-base lg:text-lg leading-relaxed">
              I'm still learning every day, but I've gotten comfortable with
              JavaScript and recently picked up Go for backend stuff. I love the
              problem-solving aspect of coding and the satisfaction of seeing an
              idea come to life in the browser.
            </p>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-secondary border border-border text-foreground rounded-full text-xs sm:text-sm lg:text-base hover:bg-primary/20 hover:text-primary hover:border-primary/30 transition-colors">
                Always Learning
              </span>
              <span className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-secondary border border-border text-foreground rounded-full text-xs sm:text-sm lg:text-base hover:bg-primary/20 hover:text-primary hover:border-primary/30 transition-colors">
                Self-Taught
              </span>
              <span className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-secondary border border-border text-foreground rounded-full text-xs sm:text-sm lg:text-base hover:bg-primary/20 hover:text-primary hover:border-primary/30 transition-colors">
                4 Years Journey
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-background border border-border rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-2 text-base lg:text-lg">
                Frontend Learning
              </h4>
              <p className="text-foreground/70 text-sm lg:text-base">
                Started with HTML/CSS, now comfortable with Next.js and
                exploring new frameworks
              </p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-2 text-base lg:text-lg">
                Backend Journey
              </h4>
              <p className="text-foreground/70 text-sm lg:text-base">
                Learning server-side development with Node.js and recently
                diving into Go
              </p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-2 text-base lg:text-lg">
                Growing Skills
              </h4>
              <p className="text-foreground/70 text-sm lg:text-base">
                Building projects to learn the full development process, from
                idea to deployment
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
