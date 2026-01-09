"use client";

import Marquee from "react-fast-marquee";
import { motion, type Variants } from "framer-motion";
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
  SiCanva,
  SiBun,
  SiWails,
  SiMongodb,
  SiGit,
  SiGithub,
  SiLinux,
  SiVercel,
  SiExpress,
  SiHtml5,
  SiCss3,
  SiMacos,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { FaWindows } from "react-icons/fa";

// @note skill data with icons
const skills = [
  { name: "JavaScript", icon: SiJavascript },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Python", icon: SiPython },
  { name: "Go", icon: SiGo },
  { name: "C++", icon: SiCplusplus },
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Express.js", icon: SiExpress },
  { name: "Bun", icon: SiBun },
  { name: "Wails", icon: SiWails },
  { name: "HTML5", icon: SiHtml5 },
  { name: "CSS3", icon: SiCss3 },
  { name: "Tailwind", icon: SiTailwindcss },
  { name: "MongoDB", icon: SiMongodb },
  { name: "Docker", icon: SiDocker },
  { name: "Git", icon: SiGit },
  { name: "GitHub", icon: SiGithub },
  { name: "Linux", icon: SiLinux },
  { name: "macOS", icon: SiMacos },
  { name: "Windows", icon: FaWindows },
  { name: "VS Code", icon: VscVscode },
  { name: "Figma", icon: SiFigma },
  { name: "Canva", icon: SiCanva },
  { name: "Vercel", icon: SiVercel },
];

// @note skill bubble component
function SkillBubble({ icon: Icon, name }: { icon: React.ElementType; name: string }) {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2 bg-secondary/50 border border-border rounded-full px-3 py-1.5 sm:px-4 sm:py-2 hover:bg-secondary hover:border-primary/30 transition-colors whitespace-nowrap group">
      <Icon className="text-sm sm:text-base lg:text-lg text-primary" />
      <span className="text-xs sm:text-sm lg:text-base text-foreground font-medium">
        {name}
      </span>
    </div>
  );
}

// @note reveal animation variants for header and marquee (from bottom to avoid clipping)
const revealVariants: Variants = {
  hidden: { opacity: 0, y: -80, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.5,
    },
  },
};

// @note skills section with marquee and reveal animations
export function SkillsSection() {
  return (
    <section id="skills" className="py-16 sm:py-24 bg-secondary/30 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* header with reveal animation */}
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

        {/* marquee with reveal animation */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={revealVariants}
          transition={{ delay: 0.6 }}
        >
          <Marquee speed={40} gradient={false} pauseOnHover={true}>
            <div className="flex space-x-3 mr-3">
              {skills.map((skill) => (
                <SkillBubble key={skill.name} icon={skill.icon} name={skill.name} />
              ))}
            </div>
          </Marquee>
        </motion.div>
      </div>
    </section>
  );
}
