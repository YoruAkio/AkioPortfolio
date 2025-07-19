import Marquee from 'react-fast-marquee';
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
  <div className="flex items-center gap-2 sm:gap-3 bg-secondary/50 border border-border rounded-full px-4 py-2 sm:px-6 sm:py-3 hover:bg-secondary transition-colors whitespace-nowrap">
    <div className="text-lg sm:text-xl lg:text-2xl text-primary">{icon}</div>
    <span className="text-sm sm:text-base lg:text-lg text-foreground font-medium">
      {name}
    </span>
  </div>
);

export default function Skills() {
  return (
    <section id="skills" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-20">
          <h2 className="text-2xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6">
            Skills & Technologies
          </h2>
          <p className="text-foreground/60 text-base sm:text-xl lg:text-2xl max-w-3xl mx-auto">
            Technologies I work with to bring ideas to life
          </p>
        </div>

        <div className="overflow-hidden">
          <Marquee speed={40} gradient={false} pauseOnHover={true}>
            <div className="flex space-x-4 mr-4">
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
      </div>
    </section>
  );
}
