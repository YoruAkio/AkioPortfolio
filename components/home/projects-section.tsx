"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IconExternalLink, IconStar, IconGitFork } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { trackUmamiEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";

// @note project interface matching API response
interface Project {
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: { name: string } | null;
  topics: string[];
}

interface ApiResponse {
  projects: Project[];
  source: string;
  count: number;
  cached?: boolean;
  cacheAge?: number;
}

// @note reveal animation config for header
const revealAnimation = {
  initial: { y: 60, opacity: 0, filter: "blur(10px)" },
  animate: { y: 0, opacity: 1, filter: "blur(0px)" },
  transition: {
    duration: 1.4,
    delay: 0.2,
    ease: [0.22, 1, 0.36, 1] as const,
  },
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <Link
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          trackUmamiEvent("project_click", {
            project: project.name,
            target: "repository",
            hasHomepage: Boolean(project.homepageUrl),
          })
        }
        className="group block h-full overflow-hidden bg-background p-5 transition-colors duration-200 hover:bg-secondary/40"
      >
        <div className="flex h-full flex-col transition-transform duration-200 group-hover:scale-[1.025] group-active:scale-[0.99]">
          <div className="mb-3 flex items-start justify-between">
            <h3 className="font-medium transition-colors duration-300 group-hover:text-primary">
              {project.name}
            </h3>
            <IconExternalLink className="h-4 w-4 text-muted-foreground opacity-0 transition-all duration-300 group-hover:text-primary group-hover:opacity-100" />
          </div>
          <p className="mb-4 line-clamp-2 flex-grow text-sm text-muted-foreground">
            {project.description || "No description"}
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            {project.primaryLanguage && (
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-primary" />
                {project.primaryLanguage.name}
              </span>
            )}
            <span className="flex items-center gap-1">
              <IconStar className="h-3 w-3" />
              {project.stargazerCount}
            </span>
            <span className="flex items-center gap-1">
              <IconGitFork className="h-3 w-3" />
              {project.forkCount}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// @note fetches and displays github repos with scroll animations
export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/github");
        const data: ApiResponse = await res.json();
        setProjects(data.projects.filter((p) => !p.name.includes(".github")));
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="grid-section overflow-hidden pt-20 pb-12 sm:pt-24 sm:pb-14">
      <div className="relative z-10 mx-auto px-5 sm:px-8">
        {/* header with whileInView reveal animation */}
        <motion.div
          initial={revealAnimation.initial}
          whileInView={revealAnimation.animate}
          viewport={{ once: true }}
          transition={revealAnimation.transition}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <span className="section-kicker">Projects</span>
          <h2 className="section-title mt-4">Selected things I&apos;ve built.</h2>
        </motion.div>

        <div className="-mx-5 sm:-mx-8">
          <div className="mx-auto max-w-5xl">
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-48 animate-pulse bg-secondary/40" />
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3">
                {projects.slice(0, 6).map((project, index) => (
                  <ProjectCard key={project.name} project={project} index={index} />
                ))}
              </div>
            )}

            <motion.div
              className="mt-6 text-center"
              initial={{ y: 40, opacity: 0, filter: "blur(6px)" }}
              whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="rounded-xl border-border px-5 hover:border-primary/30 hover:bg-primary hover:text-primary-foreground"
              >
                <Link href="https://github.com/YoruAkio" target="_blank" rel="noopener noreferrer">
                  View All Projects
                  <IconExternalLink className="h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
