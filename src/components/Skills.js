import Marquee from 'react-fast-marquee';
import {
  SiBun,
  SiCoffeescript,
  SiCss3,
  SiCplusplus,
  SiDjango,
  SiDocker,
  SiExpress,
  SiFastapi,
  SiGit,
  SiGithub,
  SiGolang,
  SiHtml5,
  SiJavascript,
  SiLinux,
  SiMacos,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiVercel,
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import { FaWindows } from 'react-icons/fa';
import { FaGolang } from 'react-icons/fa6';
import { ScrollMorphLayer } from '@/components/ui/ScrollMorph';

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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollMorphLayer index={0}>
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">
              Skills & Technologies
            </h2>
            <p className="text-foreground/60 text-sm sm:text-lg lg:text-xl max-w-2xl mx-auto">
              Technologies I work with to bring ideas to life
            </p>
          </div>
        </ScrollMorphLayer>

        <ScrollMorphLayer index={1}>
          <div className="overflow-hidden">
            <Marquee speed={40} gradient={false} pauseOnHover={true}>
            <div className="flex space-x-3 mr-3">
              <SkillBubble icon={<SiBun />} name="Bun" />
              <SkillBubble icon={<SiCoffeescript />} name="CoffeeScript" />
              <SkillBubble icon={<SiCss3 />} name="CSS3" />
              <SkillBubble icon={<SiCplusplus />} name="C++" />
              <SkillBubble icon={<SiDjango />} name="Django" />
              <SkillBubble icon={<SiDocker />} name="Docker" />
              <SkillBubble icon={<SiExpress />} name="Express.js" />
              <SkillBubble icon={<SiFastapi />} name="FastAPI" />
              <SkillBubble icon={<SiGit />} name="Git" />
              <SkillBubble icon={<SiGithub />} name="GitHub" />
              <SkillBubble icon={<FaGolang />} name="Go" />
              <SkillBubble icon={<SiHtml5 />} name="HTML5" />
              <SkillBubble icon={<SiJavascript />} name="JavaScript" />
              <SkillBubble icon={<SiLinux />} name="Linux" />
              <SkillBubble icon={<SiMacos />} name="macOS" />
              <SkillBubble icon={<SiNextdotjs />} name="Next.js" />
              <SkillBubble icon={<SiNodedotjs />} name="Node.js" />
              <SkillBubble icon={<SiPython />} name="Python" />
              <SkillBubble icon={<SiReact />} name="React" />
              <SkillBubble icon={<SiTailwindcss />} name="Tailwind" />
              <SkillBubble icon={<SiVercel />} name="Vercel" />
              <SkillBubble icon={<FaWindows />} name="Windows" />
            </div>
            </Marquee>
          </div>
        </ScrollMorphLayer>
      </div>
    </section>
  );
}
