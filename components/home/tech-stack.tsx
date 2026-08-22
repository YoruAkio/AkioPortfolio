"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaWindows } from "react-icons/fa";
import {
  SiBun,
  SiCaddy,
  SiCplusplus,
  SiDocker,
  SiDrizzle,
  SiExpress,
  SiFigma,
  SiGit,
  SiGithub,
  SiGo,
  SiHtml5,
  SiJavascript,
  SiLinux,
  SiMacos,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
  SiWails,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

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

const visibleStackCount = 13;

function shuffled<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function nextVisibleSkills(current: Skill[]) {
  const changeCount = randomInt(3, 6);
  const topIndexes = shuffled([0, 1, 2, 3, 4, 5, 6]);
  const bottomIndexes = shuffled([7, 8, 9, 10, 11, 12]);
  const selectedIndexes = [topIndexes[0], bottomIndexes[0]];

  for (const index of shuffled([...topIndexes.slice(1), ...bottomIndexes.slice(1)])) {
    if (selectedIndexes.length >= changeCount) break;
    selectedIndexes.push(index);
  }

  const selectedSet = new Set(selectedIndexes);
  const keptNames = new Set(
    current.filter((_, index) => !selectedSet.has(index)).map((skill) => skill.name),
  );
  const replacements = shuffled(skills.filter((skill) => !keptNames.has(skill.name)));

  return current.map((skill, index) => {
    if (!selectedSet.has(index)) return skill;
    return replacements.pop() ?? skill;
  });
}

function StackCell({ skill, className }: { skill: Skill; className?: string }) {
  const Icon = skill.icon;

  return (
    <div
      className={`relative h-14 overflow-hidden bg-background px-4${className ? ` ${className}` : ""}`}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={skill.name}
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex items-center justify-center gap-3 px-4"
        >
          <Icon className="h-5 w-5 shrink-0 text-foreground" />
          <span className="text-sm font-medium text-foreground">{skill.name}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// @note rotating tech stack grid shown beneath the github contribution heatmap
export function TechStack() {
  const [visibleSkills, setVisibleSkills] = useState(() => skills.slice(0, visibleStackCount));

  useEffect(() => {
    const id = setInterval(() => {
      setVisibleSkills((current) => nextVisibleSkills(current));
    }, 3000);

    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 mx-auto max-w-5xl overflow-hidden"
    >
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7">
        {visibleSkills.slice(0, 7).map((skill, index) => (
          <StackCell
            key={`top-${index}`}
            skill={skill}
            className={index === 6 ? "col-span-2 lg:col-span-1" : undefined}
          />
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
        {visibleSkills.slice(7).map((skill, index) => (
          <StackCell key={`bottom-${index}`} skill={skill} />
        ))}
      </div>
    </motion.div>
  );
}
