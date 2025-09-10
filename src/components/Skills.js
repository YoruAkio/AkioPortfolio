import Marquee from 'react-fast-marquee';
import { motion } from 'motion/react';
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
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import { FaWindows } from 'react-icons/fa';

const SkillBubble = ({ icon, name }) => (
  <div className="flex items-center gap-1.5 sm:gap-2 bg-secondary/50 border border-border rounded-full px-3 py-1.5 sm:px-4 sm:py-2 hover:bg-secondary transition-colors whitespace-nowrap">
    <div className="text-sm sm:text-base lg:text-lg text-primary">{icon}</div>
    <span className="text-xs sm:text-sm lg:text-base text-foreground font-medium">
      {name}
    </span>
  </div>
);

export default function Skills() {
  return (
    <section id="skills" className="py-12 sm:py-16">
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
            Skills & Technologies
          </h2>
          <p className="text-foreground/60 text-sm sm:text-lg lg:text-xl max-w-2xl mx-auto">
            Technologies I work with to bring ideas to life
          </p>
        </div>

        <div className="overflow-hidden">
          <Marquee speed={40} gradient={false} pauseOnHover={true}>
            <div className="flex space-x-3 mr-3">
              <SkillBubble icon={<SiJavascript />} name="JavaScript" />
              <SkillBubble icon={<SiTypescript />} name="TypeScript" />
              <SkillBubble icon={<SiPython />} name="Python" />
              <SkillBubble icon={<SiGo />} name="Go" />
              <SkillBubble icon={<SiCplusplus />} name="C++" />
              <SkillBubble icon={<SiReact />} name="React" />
              <SkillBubble icon={<SiNextdotjs />} name="Next.js" />
              <SkillBubble icon={<SiNodedotjs />} name="Node.js" />
              <SkillBubble icon={<SiExpress />} name="Express.js" />
              <SkillBubble icon={<SiBun />} name="Bun" />
              <SkillBubble icon={<SiWails />} name="Wails" />
              <SkillBubble icon={<SiHtml5 />} name="HTML5" />
              <SkillBubble icon={<SiCss3 />} name="CSS3" />
              <SkillBubble icon={<SiTailwindcss />} name="Tailwind" />
              <SkillBubble icon={<SiMongodb />} name="MongoDB" />
              <SkillBubble icon={<SiDocker />} name="Docker" />
              <SkillBubble icon={<SiGit />} name="Git" />
              <SkillBubble icon={<SiGithub />} name="GitHub" />
              <SkillBubble icon={<SiLinux />} name="Linux" />
              <SkillBubble icon={<SiMacos />} name="macOS" />
              <SkillBubble icon={<FaWindows />} name="Windows" />
              <SkillBubble icon={<VscVscode />} name="VS Code" />
              <SkillBubble icon={<SiFigma />} name="Figma" />
              <SkillBubble icon={<SiCanva />} name="Canva" />
              <SkillBubble icon={<SiVercel />} name="Vercel" />
            </div>
          </Marquee>
        </div>
      </motion.div>
    </section>
  );
}
