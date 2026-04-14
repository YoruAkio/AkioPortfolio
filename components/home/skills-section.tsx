'use client';

import { motion, type Variants } from 'framer-motion';
import { CodingStats } from './coding-stats';
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiGo,
  SiCplusplus,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiDocker,
  SiFigma,
  SiTailwindcss,
  SiBun,
  SiWails,
  SiMongodb,
  SiGit,
  SiGithub,
  SiLinux,
  SiVercel,
  SiExpress,
  SiHtml5,
  SiMacos,
  SiPostgresql,
  SiPrisma,
  SiCaddy,
  SiDrizzle,
  SiVite,
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import { FaWindows } from 'react-icons/fa';

const skills = [
  { name: 'JavaScript', icon: SiJavascript },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'Python', icon: SiPython },
  { name: 'Go', icon: SiGo },
  { name: 'C++', icon: SiCplusplus },
  { name: 'React', icon: SiReact },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'Express.js', icon: SiExpress },
  { name: 'Bun', icon: SiBun },
  { name: 'Wails', icon: SiWails },
  { name: 'HTML5', icon: SiHtml5 },
  { name: 'Prisma', icon: SiPrisma },
  { name: 'Tailwind', icon: SiTailwindcss },
  { name: 'MongoDB', icon: SiMongodb },
  { name: 'PostgreSQL', icon: SiPostgresql },
  { name: 'Docker', icon: SiDocker },
  { name: 'Git', icon: SiGit },
  { name: 'GitHub', icon: SiGithub },
  { name: 'Linux', icon: SiLinux },
  { name: 'macOS', icon: SiMacos },
  { name: 'Windows', icon: FaWindows },
  { name: 'VS Code', icon: VscVscode },
  { name: 'Figma', icon: SiFigma },
  { name: 'Caddy', icon: SiCaddy },
  { name: 'Vercel', icon: SiVercel },
  { name: 'Drizzle', icon: SiDrizzle },
  { name: 'Vite', icon: SiVite },
];

function SkillPill({
  icon: Icon,
  name,
}: {
  icon: React.ElementType;
  name: string;
}) {
  return (
    <div className="flex items-center justify-center gap-2 w-full bg-secondary/50 border border-border rounded-xl px-3 py-2 hover:bg-secondary hover:border-primary/30 transition-colors group">
      <Icon className="text-base text-primary shrink-0" />
      <span className="text-xs text-foreground font-medium truncate">
        {name}
      </span>
    </div>
  );
}

const revealVariants: Variants = {
  hidden: { opacity: 0, y: -60, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 },
  },
};

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="py-16 sm:py-24 bg-secondary/30 overflow-hidden"
    >
      <div className="container mx-auto px-6">
        {/* section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={revealVariants}
          className="max-w-3xl mx-auto text-center mb-10 sm:mb-14"
        >
          <span className="text-sm text-primary uppercase tracking-wider font-medium">
            Skills & Technologies
          </span>
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-bold">
            Technologies I work with to bring ideas to life
          </h2>
        </motion.div>

        {/* two-column layout */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={revealVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch"
        >
          {/* left — coding stats */}
          <CodingStats />

          {/* right — tech stack */}
          <div className="rounded-2xl border border-border/70 bg-card/80 backdrop-blur-sm p-6 h-full">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary/80 mb-4">
              Tech Stack
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {skills.map(skill => (
                <SkillPill
                  key={skill.name}
                  icon={skill.icon}
                  name={skill.name}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
