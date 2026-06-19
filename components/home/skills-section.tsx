"use client";

import { motion, type Variants } from "framer-motion";
import Marquee from "react-fast-marquee";
import { CodingStats } from "./coding-stats";
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
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { FaWindows } from "react-icons/fa";

type Skill = { name: string; icon: React.ElementType };

const skills: Skill[] = [
  { name: "TypeScript", icon: SiTypescript },
  { name: "JavaScript", icon: SiJavascript },
  { name: "Go", icon: SiGo },
  { name: "Python", icon: SiPython },
  { name: "C++", icon: SiCplusplus },
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Tailwind", icon: SiTailwindcss },
  { name: "HTML5", icon: SiHtml5 },
  { name: "Vite", icon: SiVite },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Express.js", icon: SiExpress },
  { name: "Bun", icon: SiBun },
  { name: "Wails", icon: SiWails },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "MongoDB", icon: SiMongodb },
  { name: "Prisma", icon: SiPrisma },
  { name: "Drizzle", icon: SiDrizzle },
  { name: "Docker", icon: SiDocker },
  { name: "Caddy", icon: SiCaddy },
  { name: "Vercel", icon: SiVercel },
  { name: "Git", icon: SiGit },
  { name: "GitHub", icon: SiGithub },
  { name: "Linux", icon: SiLinux },
  { name: "macOS", icon: SiMacos },
  { name: "Windows", icon: FaWindows },
  { name: "VS Code", icon: VscVscode },
  { name: "Figma", icon: SiFigma },
];

const half = Math.ceil(skills.length / 2);
const rowOne = skills.slice(0, half);
const rowTwo = skills.slice(half);

function MarqueePill({ icon: Icon, name }: Skill) {
  return (
    <div className="group mx-1.5 flex items-center gap-2.5 rounded-full border border-border/60 bg-card/70 px-4 py-2 transition-colors duration-200 hover:border-primary/40 hover:bg-card">
      <Icon className="text-base text-muted-foreground transition-colors duration-200 group-hover:text-primary shrink-0" />
      <span className="text-sm font-medium text-foreground/80 whitespace-nowrap">{name}</span>
    </div>
  );
}

const revealVariants: Variants = {
  hidden: { opacity: 0, y: -60, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 },
  },
};

const edgeFade = "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)";

export function SkillsSection() {
  return (
    <section id="skills" className="py-16 sm:py-24 bg-secondary/30 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
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

        {/* full-width coding stats */}
        <div className="max-w-5xl mx-auto">
          <CodingStats />
        </div>
      </div>

      {/* full-bleed marquee — the toolkit in motion */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="mt-10 sm:mt-12 flex flex-col gap-3"
        style={{ WebkitMaskImage: edgeFade, maskImage: edgeFade }}
      >
        <Marquee autoFill pauseOnHover speed={28}>
          {rowOne.map((skill) => (
            <MarqueePill key={skill.name} icon={skill.icon} name={skill.name} />
          ))}
        </Marquee>
        <Marquee autoFill pauseOnHover speed={28} direction="right">
          {rowTwo.map((skill) => (
            <MarqueePill key={skill.name} icon={skill.icon} name={skill.name} />
          ))}
        </Marquee>
      </motion.div>
    </section>
  );
}
