"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ExternalLink, Star, GitFork } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ContributionHeatmap } from "./contribution-heatmap";
import { LanguageChart } from "./language-chart";

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
}

// @note github stats interface
interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface LanguageStat {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

interface StatsResponse {
  contributions: ContributionDay[];
  languages: LanguageStat[];
  cached?: boolean;
  cacheAge?: number;
}

// @note spring config for smooth parallax
const springConfig = { stiffness: 80, damping: 20, mass: 0.8 };

// @note reveal animation config for header (from bottom to avoid clipping)
const revealAnimation = {
  initial: { y: 60, opacity: 0, filter: "blur(10px)" },
  animate: { y: 0, opacity: 1, filter: "blur(0px)" },
  transition: { 
    duration: 1.4, 
    delay: 0.2, 
    ease: [0.22, 1, 0.36, 1] as const,
  },
};

// @note card transform config based on position (left/center/right)
const getCardConfig = (index: number) => {
  const column = index % 3;
  const row = Math.floor(index / 3);
  
  // @note left column: comes from top-left with clockwise rotation
  if (column === 0) {
    return {
      x: [-80, 0],
      y: [120 + row * 30, 0],
      rotate: [-8 - row * 2, 0],
    };
  }
  // @note center column: comes from top with slight rotation
  if (column === 1) {
    return {
      x: [0, 0],
      y: [140 + row * 25, 0],
      rotate: [row === 0 ? 4 : -4, 0],
    };
  }
  // @note right column: comes from top-right with counter-clockwise rotation
  return {
    x: [80, 0],
    y: [120 + row * 30, 0],
    rotate: [8 + row * 2, 0],
  };
};

// @note individual project card with parallax based on position
function ProjectCard({ 
  project, 
  index, 
  scrollYProgress 
}: { 
  project: Project; 
  index: number; 
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const config = getCardConfig(index);
  
  // @note transform values based on card position
  const xRaw = useTransform(scrollYProgress, [0.1, 0.4], config.x);
  const yRaw = useTransform(scrollYProgress, [0.1, 0.4], config.y);
  const rotateRaw = useTransform(scrollYProgress, [0.1, 0.4], config.rotate);
  const opacityRaw = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  
  // @note apply springs for smooth response
  const x = useSpring(xRaw, springConfig);
  const y = useSpring(yRaw, springConfig);
  const rotate = useSpring(rotateRaw, springConfig);
  const opacity = useSpring(opacityRaw, springConfig);

  return (
    <motion.div
      style={{ x, y, rotate, opacity }}
      className="will-change-transform"
    >
      <Link
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block h-full p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
      >
        <div className="h-full flex flex-col">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-semibold group-hover:text-primary transition-colors duration-300">
              {project.name}
            </h3>
            <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all duration-300" />
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-grow">
            {project.description || "No description"}
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            {project.primaryLanguage && (
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-primary" />
                {project.primaryLanguage.name}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3" />
              {project.stargazerCount}
            </span>
            <span className="flex items-center gap-1">
              <GitFork className="h-3 w-3" />
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
  const sectionRef = useRef<HTMLElement>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [stats, setStats] = useState<{ contributions: ContributionDay[]; languages: LanguageStat[] }>({
    contributions: [],
    languages: [],
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

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

    const fetchStats = async () => {
      try {
        const res = await fetch("/api/github-stats");
        const data: StatsResponse = await res.json();
        setStats({
          contributions: data.contributions || [],
          languages: data.languages || [],
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setStatsLoading(false);
      }
    };

    fetchProjects();
    fetchStats();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        {/* header with whileInView reveal animation */}
        <motion.div
          initial={revealAnimation.initial}
          whileInView={revealAnimation.animate}
          viewport={{ once: true }}
          transition={revealAnimation.transition}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <span className="text-sm text-primary uppercase tracking-wider font-medium">
            Featured Projects
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold">
            Some things I&apos;ve built
          </h2>
        </motion.div>

        {/* github stats row */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* languages chart - already has internal title */}
            {statsLoading ? (
              <div className="lg:w-[260px] shrink-0 h-[280px] rounded-xl bg-card border border-border animate-pulse" />
            ) : (
              <div className="lg:w-[260px] shrink-0">
                <LanguageChart languages={stats.languages} />
              </div>
            )}

            {/* contributions heatmap - already has internal title */}
            {statsLoading ? (
              <div className="flex-1 min-w-0 h-[280px] rounded-xl bg-card border border-border animate-pulse" />
            ) : (
              <div className="flex-1 min-w-0">
                <ContributionHeatmap contributions={stats.contributions} />
              </div>
            )}
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-48 rounded-2xl bg-card border border-border animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.slice(0, 6).map((project, index) => (
                <ProjectCard
                  key={project.name}
                  project={project}
                  index={index}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </div>
          )}

          <motion.div
            className="mt-12 text-center"
            initial={{ y: 40, opacity: 0, filter: "blur(6px)" }}
            whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="https://github.com/YoruAkio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-full border border-border hover:border-primary/30 hover:bg-primary/10 hover:text-primary transition-all duration-300"
            >
              View All Projects
              <ExternalLink className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
