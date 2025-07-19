import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Projects() {
  const projects = [];

  return (
    <section
      id="projects"
      className="py-20 bg-secondary/30 rounded-b-[1rem] sm:rounded-b-[2rem] border-b-3 border-foreground/10 dark:border-foreground/20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-20">
          <h2 className="text-2xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6">
            Featured Projects
          </h2>
          <p className="text-foreground/60 text-base sm:text-xl lg:text-2xl max-w-3xl mx-auto">
            Some of the projects I've worked on recently
          </p>
        </div>

        {projects.length === 0 ? (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="bg-background border border-border rounded-xl p-8 max-w-md mx-auto"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-foreground mb-4">
                Projects Coming Soon
              </h3>
              <p className="text-foreground/60 text-sm sm:text-base lg:text-lg mb-4">
                I'm currently working on some exciting projects that will be
                showcased here soon.
              </p>
              <div className="text-sm text-foreground/40 font-mono bg-secondary/30 rounded-lg p-3">
                // @note todo adding project list on here
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="bg-background border border-border rounded-xl p-6 flex flex-col h-full"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5 }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  borderColor: 'rgba(var(--color-primary), 0.2)',
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex-grow flex flex-col">
                  <motion.h3
                    className="text-2xl lg:text-3xl font-semibold text-foreground mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {project.title}
                  </motion.h3>
                  <motion.p
                    className="text-foreground/70 mb-6 text-base lg:text-lg leading-relaxed flex-grow"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {project.description}
                  </motion.p>
                </div>

                <motion.div
                  className="flex flex-wrap gap-2 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {project.tech.map((tech, techIndex) => (
                    <motion.span
                      key={tech}
                      className="px-3 py-1 bg-secondary/50 text-foreground rounded-full text-xs lg:text-sm font-medium border border-border hover:bg-primary/10 hover:text-primary transition-colors"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + techIndex * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>

                <motion.div
                  className="flex gap-3 pt-4 border-t border-border min-h-[60px] items-end"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${
                      project.demo ? 'flex-1' : 'w-full'
                    } flex items-center justify-center gap-2 px-6 py-3 bg-secondary/50 hover:bg-secondary text-foreground rounded-lg transition-colors text-base lg:text-lg font-medium h-12`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaGithub size={16} />
                    GitHub
                  </motion.a>
                  {project.demo && (
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors text-base lg:text-lg font-medium h-12"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink size={16} />
                      Demo
                    </motion.a>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
