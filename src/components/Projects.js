import { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { motion } from 'motion/react';
import ProjectCard from '@/components/ui/ProjectCard';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // @note fetch projects from API endpoint with pinned repos fallback
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/github-projects');

        if (!response.ok) {
          throw new Error(`Failed to fetch projects: ${response.status}`);
        }

        const data = await response.json();
        
        // @note set projects from API response
        setProjects(data.projects || []);
        
        // @note log source information for debugging
        console.log(`Loaded ${data.count} projects from ${data.source} source`);
        
        // @note show error message if using fallback data
        if (data.error) {
          console.warn('API fallback used:', data.error);
        }
        
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(err.message);
        
        // @note final fallback to demo data if API completely fails
        setProjects([
          {
            name: 'AkioPortfolio',
            description: 'Modern minimalist portfolio website built with Next.js and Tailwind CSS',
            url: 'https://github.com/YoruAkio/AkioPortfolio',
            homepageUrl: 'https://yoruakio.vercel.app',
            stargazerCount: 5,
            forkCount: 2,
            primaryLanguage: { name: 'JavaScript' },
            topics: ['nextjs', 'portfolio', 'tailwindcss', 'react'],
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2025-01-01T00:00:00Z',
            languages: [],
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section
        id="projects"
        className="py-12 sm:py-16 bg-secondary/30 rounded-b-[1rem] sm:rounded-b-[2rem] border-b-3 border-foreground/10 dark:border-foreground/20"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">
              Featured Projects
            </h2>
            <p className="text-foreground/60 text-sm sm:text-lg lg:text-xl max-w-2xl mx-auto">
              Loading my latest projects from GitHub...
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-background border border-border rounded-xl p-6 animate-pulse"
              >
                <div className="h-6 bg-secondary rounded mb-4"></div>
                <div className="h-4 bg-secondary rounded mb-2"></div>
                <div className="h-4 bg-secondary rounded mb-4 w-3/4"></div>
                <div className="flex gap-2 mb-4">
                  <div className="h-6 bg-secondary rounded w-16"></div>
                  <div className="h-6 bg-secondary rounded w-20"></div>
                </div>
                <div className="h-10 bg-secondary rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      className="py-12 sm:py-16 bg-secondary/30 rounded-b-[1rem] sm:rounded-b-[2rem] border-b-3 border-foreground/10 dark:border-foreground/20"
    >
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
            Featured Projects
          </h2>
          <p className="text-foreground/60 text-sm sm:text-lg lg:text-xl max-w-2xl mx-auto">
            {error
              ? 'Some of my notable projects'
              : 'My pinned and latest repositories from GitHub'}
          </p>
          {error && (
            <p className="text-amber-500/70 text-xs mt-2">
              Note: Using demo data due to API limitations
            </p>
          )}
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-10">
            <div className="bg-background border border-border rounded-xl p-6 max-w-sm mx-auto">
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-foreground mb-3">
                Projects Coming Soon
              </h3>
              <p className="text-foreground/60 text-xs sm:text-sm lg:text-base mb-3">
                I'm currently working on some exciting projects that will be
                showcased here soon.
              </p>
              <div className="text-xs text-foreground/40 font-mono bg-secondary/30 rounded-lg p-2">
                // @note todo adding project list on here
              </div>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.name || index}
                project={project}
                index={index}
              />
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
