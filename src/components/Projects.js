import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

export default function Projects() {
  const projects = [];

  return (
    <section
      id="projects"
      className="py-20 bg-secondary/30 rounded-b-[2rem] border-b-3 border-foreground/10 dark:border-foreground/20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Featured Projects
          </h2>
          <p className="text-foreground/60 text-xl lg:text-2xl max-w-3xl mx-auto">
            Some of the projects I've worked on recently
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-background border border-border rounded-xl p-8 max-w-md mx-auto">
              <h3 className="text-xl lg:text-2xl font-semibold text-foreground mb-4">
                Projects Coming Soon
              </h3>
              <p className="text-foreground/60 text-base lg:text-lg mb-4">
                I'm currently working on some exciting projects that will be
                showcased here soon.
              </p>
              <div className="text-sm text-foreground/40 font-mono bg-secondary/30 rounded-lg p-3">
                // @note todo adding project list on here
              </div>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-background border border-border rounded-xl p-6 hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col h-full"
              >
                <div className="flex-grow flex flex-col">
                  <h3 className="text-2xl lg:text-3xl font-semibold text-foreground mb-4">
                    {project.title}
                  </h3>
                  <p className="text-foreground/70 mb-6 text-base lg:text-lg leading-relaxed flex-grow">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map(tech => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-secondary/50 text-foreground rounded-full text-xs lg:text-sm font-medium border border-border hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 pt-4 border-t border-border min-h-[60px] items-end">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${
                      project.demo ? 'flex-1' : 'w-full'
                    } flex items-center justify-center gap-2 px-6 py-3 bg-secondary/50 hover:bg-secondary text-foreground rounded-lg transition-colors text-base lg:text-lg font-medium h-12`}
                  >
                    <FaGithub size={16} />
                    GitHub
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors text-base lg:text-lg font-medium h-12"
                    >
                      <ExternalLink size={16} />
                      Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
