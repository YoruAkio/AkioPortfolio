import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Marquee from 'react-fast-marquee';
import Head from 'next/head';
import {
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaCode,
  FaMapMarkedAlt,
  FaEnvelope,
  FaDocker,
  FaFigma,
} from 'react-icons/fa';
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiGo,
  SiPython,
  SiCplusplus,
  SiBun,
  SiAdobe,
  SiCanva,
  SiDocker,
  SiFigma,
  SiAdobephotoshop,
} from 'react-icons/si';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Section from '@/components/Section';
import AnimatedText from '@/components/AnimatedText';
import GlassMorphicContainer from '@/components/GlassMorphicContainer';
import ProjectCard from '@/components/ProjectCard';
import SkillBadge from '@/components/SkillBadge';
import SkillBubble from '@/components/SkillBubble';
import SocialButton from '@/components/SocialButton';
import Orb from '@/components/ReactBits/Orb';
import RotatingText from '@/components/ReactBits/RotatingText';

import * as Svg from '@/components/Svg';

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Get scroll progress for parallax effects
  const { scrollYProgress } = useScroll();

  // Create parallax transformations for background elements
  const bg1Y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const bg2Y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const bg3Y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const bg4Y = useTransform(scrollYProgress, [0, 1], [0, 80]);

  // Orb parallax and scale effects
  const orbY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);
  const orbScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);

  // Fetch GitHub repositories
  useEffect(() => {
    async function fetchRepositories() {
      try {
        // Call your API route that handles the GitHub token securely
        const response = await fetch('/api/github-pinned');

        if (!response.ok) {
          throw new Error('Failed to fetch pinned repositories');
        }

        const pinnedRepos = await response.json();

        // Transform the response into our project format
        const formattedProjects = pinnedRepos.map(repo => ({
          title: repo.name,
          description: repo.description || 'A cool project by Yoru Akio',
          image: `https://opengraph.githubassets.com/1/YoruAkio/${repo.name}`,
          tags: [
            repo.primaryLanguage?.name || 'Code',
            ...repo.repositoryTopics.nodes
              .slice(0, 2)
              .map(topic => topic.topic.name),
          ].filter(Boolean),
          github: repo.url,
          demo: repo.homepageUrl || '#',
          stars: repo.stargazerCount,
          forks: repo.forkCount,
        }));

        setProjects(formattedProjects);
      } catch (error) {
        console.error('Error fetching repositories:', error);
        // Fallback implementations remain unchanged
        try {
          setProjects([
            {
              title: 'Project 1',
              description: 'Description of Project 1',
              image: 'https://via.placeholder.com/300',
              tags: ['JavaScript', 'React'],
              github: 'https://github.com/YoruAkio',
              demo: 'https://example.com',
              stars: 10,
              forks: 2,
            },
            {
              title: 'Project 2',
              description: 'Description of Project 2',
              image: 'https://via.placeholder.com/300',
              tags: ['JavaScript', 'React'],
              github: 'https://github.com/YoruAkio',
              demo: 'https://example.com',
              stars: 10,
              forks: 2,
            },
            {
              title: 'Project 3',
              description: 'Description of Project 3',
              image: 'https://via.placeholder.com/300',
              tags: ['JavaScript', 'React'],
              github: 'https://github.com/YoruAkio',
              demo: 'https://example.com',
              stars: 10,
              forks: 2,
            },
          ]);
        } catch (secondError) {
          console.error('Error fetching repositories:', secondError);
          setProjects([]); // Set to empty array if both fetches fail
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchRepositories();
  }, []);

  const AnimatedSkillBadge = ({ icon, name }) => {
    return (
      <motion.div
        className="relative"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.5,
          ease: 'easeOut',
        }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
      >
        <SkillBadge icon={icon} name={name} />
      </motion.div>
    );
  };

  // Enhanced animations with better timing
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <>
      <Head>
        <title>Yoru Akio | Portfolio</title>
        <meta
          name="description"
          content="Portfolio of Yoru Akio - Student Developer & High School Student"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-[#0d1117] text-zinc-100 min-h-screen selection:bg-purple-400/30 selection:text-purple-200 font-mono">
        {/* Background elements with parallax */}
        <div className="fixed inset-0 z-0">
          <motion.div
            style={{ y: bg1Y }}
            className="absolute top-40 left-10 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl"
          ></motion.div>
          <motion.div
            style={{ y: bg2Y }}
            className="absolute top-20 right-10 w-72 h-72 bg-zinc-700/15 rounded-full filter blur-3xl"
          ></motion.div>
          <motion.div
            style={{ y: bg3Y }}
            className="absolute bottom-40 right-20 w-80 h-80 bg-slate-600/10 rounded-full filter blur-3xl"
          ></motion.div>
          <motion.div
            style={{ y: bg4Y }}
            className="absolute bottom-10 left-20 w-72 h-72 bg-purple-400/5 rounded-full filter blur-3xl"
          ></motion.div>
        </div>

        <Navbar />

        {/* Hero Section with properly centered text */}
        <Section
          id="home"
          className="pt-22 md:pt-28 min-h-screen flex flex-col justify-center"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-1 text-center lg:text-left mx-auto lg:mx-0 max-w-md lg:max-w-none">
              <div className="inline-flex items-center mb-4">
                <span className="text-lg md:text-xl font-extrabold text-zinc-100 mr-2">
                  Hello, I'm
                </span>
                <span className="rounded-lg px-2 py-0.5 md:px-3 md:py-1 font-extrabold text-black text-lg md:text-xl bg-purple-400/70 backdrop-blur-md shadow-md">
                  <RotatingText
                    texts={[
                      'Student Developer',
                      'Human',
                      'Programmer',
                      'Tech Enthusiast',
                      'Lifelong Learner',
                    ]}
                    mainClassName="inline"
                    staggerFrom="last"
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '-120%' }}
                    staggerDuration={0.025}
                    splitLevelClassName="overflow-hidden"
                    transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                    rotationInterval={2000}
                  />
                </span>
              </div>
              <div className="flex justify-center lg:justify-start">
                <AnimatedText
                  text="Yoru Akio"
                  className="text-2xl md:text-4xl font-bold mb-4 leading-tight"
                />
              </div>
              <motion.p
                className="text-zinc-400 mb-8 mx-auto lg:mx-0 max-w-lg"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                I'm a high school student passionate about programming,
                currently focused on JavaScript, TypeScript, and learning Go,
                Python, C++.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4 justify-center lg:justify-start"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <motion.a
                  href="#contact"
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 text-white font-bold hover:translate-y-[-2px] transition-transform duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  variants={fadeIn}
                >
                  Contact Me
                </motion.a>
                <motion.a
                  href="https://github.com/YoruAkio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-lg bg-zinc-800/70 border border-zinc-700/50 text-zinc-100 font-bold hover:translate-y-[-2px] transition-transform duration-300 backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  variants={fadeIn}
                >
                  <span className="flex items-center gap-2">
                    <FaGithub /> GitHub
                  </span>
                </motion.a>
              </motion.div>
            </div>

            <div className="order-2 flex justify-center lg:justify-end items-center w-full">
              <motion.div
                className="relative w-[280px] h-[280px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] mt-8 lg:mt-0"
                style={{
                  y: orbY,
                  scale: orbScale,
                  transition: { duration: 0.1 },
                }}
              >
                <Orb
                  hoverIntensity={1.2}
                  rotateOnHover={true}
                  hue={305}
                  forceHoverState={false}
                />
              </motion.div>
            </div>
          </div>
        </Section>

        {/* About Section - redesigned for clarity and detail */}
        <Section id="about">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Bio and Highlights */}
            <div>
              <motion.h2
                className="text-2xl md:text-3xl font-bold mb-2"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                About <span className="text-purple-400">Me</span>
              </motion.h2>
              <motion.div
                className="w-20 h-1 bg-gradient-to-r from-purple-400 to-purple-600 mb-6"
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, amount: 0.3 }}
              ></motion.div>

              {/* Detailed Bio */}
              <motion.p
                className="text-zinc-300 mb-4 leading-relaxed"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                Hi! I'm{' '}
                <span className="font-bold text-purple-300">Yoru Akio</span>, an
                18-year-old high school student and aspiring software developer.
                My journey began with curiosity for how things work, which
                quickly turned into a passion for building and coding. I love
                exploring new technologies, solving problems, and creating
                projects that make a difference.
              </motion.p>
              <motion.p
                className="text-zinc-400 mb-4"
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                My main focus is on{' '}
                <span className="font-semibold text-purple-300">
                  JavaScript
                </span>{' '}
                and{' '}
                <span className="font-semibold text-purple-300">
                  TypeScript
                </span>
                , but I'm also diving deep into{' '}
                <span className="font-semibold text-purple-300">Go</span>,{' '}
                <span className="font-semibold text-purple-300">Python</span>,
                and <span className="font-semibold text-purple-300">C++</span>.
                I enjoy building web apps, experimenting with backend systems,
                and learning about software architecture.
              </motion.p>
              <motion.ul
                className="mb-6 space-y-2"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.li
                  variants={fadeIn}
                  className="flex items-center gap-2"
                >
                  <FaCode className="text-cyan-400" />
                  <span>
                    <span className="font-bold">Main Languages:</span>{' '}
                    JavaScript, TypeScript
                  </span>
                </motion.li>
                <motion.li
                  variants={fadeIn}
                  className="flex items-center gap-2"
                >
                  <FaMapMarkedAlt className="text-cyan-400" />
                  <span>
                    <span className="font-bold">Hobbies:</span> Traveling,
                    Coding, Exploring new tech
                  </span>
                </motion.li>
                <motion.li
                  variants={fadeIn}
                  className="flex items-center gap-2"
                >
                  <FaGithub className="text-cyan-400" />
                  <span>
                    <span className="font-bold">Open Source:</span> Contributor
                    & project maintainer
                  </span>
                </motion.li>
                <motion.li
                  variants={fadeIn}
                  className="flex items-center gap-2"
                >
                  <FaEnvelope className="text-cyan-400" />
                  <span>
                    <span className="font-bold">Contact:</span>{' '}
                    <a
                      href="mailto:hello@akio.lol"
                      className="text-purple-300 hover:underline"
                    >
                      hello@akio.lol
                    </a>
                  </span>
                </motion.li>
              </motion.ul>
              <motion.p
                className="text-zinc-400"
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                Outside of coding, I love traveling and discovering new
                cultures, which inspires my creativity and broadens my
                perspective.
              </motion.p>
            </div>

            {/* Right: Currently Learning Card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <GlassMorphicContainer className="h-full p-6 flex flex-col gap-4">
                <div>
                  <h3 className="text-xl font-bold text-zinc-100 mb-1 flex items-center gap-2">
                    <span className="inline-block w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
                    Currently Learning
                  </h3>
                  <p className="text-zinc-400 text-sm mb-4">
                    Here’s a quick look at my current learning progress:
                  </p>
                </div>
                <div className="space-y-4">
                  {/* C++ */}
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-zinc-800/70 flex items-center justify-center border border-zinc-700/50">
                        <SiCplusplus size={22} className="text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-zinc-100">C++</span>
                          <span className="text-xs text-purple-300 font-mono">
                            80%
                          </span>
                        </div>
                        <div className="w-full bg-zinc-800 h-2 rounded-full mt-1 overflow-hidden">
                          <motion.div
                            className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: '80%' }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            viewport={{ once: true, amount: 0.3 }}
                          />
                        </div>
                        <p className="text-xs text-zinc-400 mt-1">
                          Deepening my understanding of low-level programming,
                          memory management, and high-performance apps.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Go */}
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-zinc-800/70 flex items-center justify-center border border-zinc-700/50">
                        <SiGo size={22} className="text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-zinc-100">Go</span>
                          <span className="text-xs text-purple-300 font-mono">
                            25%
                          </span>
                        </div>
                        <div className="w-full bg-zinc-800 h-2 rounded-full mt-1 overflow-hidden">
                          <motion.div
                            className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: '25%' }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            viewport={{ once: true, amount: 0.3 }}
                          />
                        </div>
                        <p className="text-xs text-zinc-400 mt-1">
                          Learning Go to build scalable backend services and
                          understand concurrency patterns.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Python */}
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-zinc-800/70 flex items-center justify-center border border-zinc-700/50">
                        <SiPython size={22} className="text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-zinc-100">
                            Python
                          </span>
                          <span className="text-xs text-purple-300 font-mono">
                            65%
                          </span>
                        </div>
                        <div className="w-full bg-zinc-800 h-2 rounded-full mt-1 overflow-hidden">
                          <motion.div
                            className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: '65%' }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            viewport={{ once: true, amount: 0.3 }}
                          />
                        </div>
                        <p className="text-xs text-zinc-400 mt-1">
                          Exploring Python for scripting, automation, and AI/ML
                          fundamentals.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-xs text-zinc-500">
                    Want to collaborate or share resources?{' '}
                    <a
                      href="https://github.com/YoruAkio"
                      target="_blank"
                      className="text-purple-300 hover:underline"
                    >
                      Let’s connect!
                    </a>
                  </p>
                </div>
              </GlassMorphicContainer>
            </motion.div>
          </div>
        </Section>

        {/* Skills Section */}
        <Section id="skills" className="bg-[#070a10] overflow-hidden py-12">
          <motion.div
            className="text-center mb-2"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-1">
              My <span className="text-purple-400">Skills</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-purple-600 mx-auto mb-3"></div>
            <p className="text-zinc-400 max-w-2xl mx-auto text-sm">
              Here are the technologies I work with regularly and am proficient
              in.
            </p>
          </motion.div>

          <div className="relative w-full py-4">
            {/* First row */}
            <Marquee speed={50} gradient={false} pauseOnHover={true}>
              <div className="flex space-x-6 mr-6">
                <SkillBubble icon={<Svg.Javascript />} name="JavaScript" />
                <SkillBubble icon={<Svg.Typescript />} name="TypeScript" />
                <SkillBubble icon={<Svg.Python />} name="Python" />
                <SkillBubble icon={<Svg.Go />} name="Go" />
                <SkillBubble icon={<Svg.Cpp />} name="C++" />
                <SkillBubble icon={<Svg.React />} name="React" />
                <SkillBubble icon={<Svg.NextJs />} name="Next.js" />
                <SkillBubble icon={<Svg.NodeJs />} name="Node.js" />
                <SkillBubble icon={<Svg.Docker />} name="Docker" />
                <SkillBubble icon={<Svg.Figma />} name="Figma" />
                <SkillBubble icon={<Svg.Tailwind />} name="Tailwind" />
              </div>
            </Marquee>
          </div>
        </Section>

        {/* Projects Section */}
        <Section id="projects">
          <motion.div
            className="text-center mb-16"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              My <span className="text-purple-400">Projects</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-purple-600 mx-auto mb-6"></div>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Check out my latest GitHub repositories
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin w-12 h-12 border-4 border-purple-400 rounded-full border-t-transparent"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
            </div>
          )}

          <motion.div
            className="text-center mt-12"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.a
              href="https://github.com/YoruAkio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-800/70 border border-zinc-700/50 text-zinc-100 font-bold hover:translate-y-[-2px] transition-transform duration-300 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub /> View More on GitHub
            </motion.a>
          </motion.div>
        </Section>

        {/* Contact Section */}
        <section id="contact" className="bg-[#070a10] py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  Get In <span className="text-purple-400">Touch</span>
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-purple-600 mb-6"></div>
                <p className="text-zinc-400 mb-8 max-w-lg">
                  Feel free to reach out to me for collaborations, questions, or
                  just to say hi! I'm always open to discussing new projects and
                  opportunities.
                </p>

                <div className="space-y-4">
                  <motion.div
                    className="flex items-center gap-4"
                    variants={fadeIn}
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-zinc-800/70 flex items-center justify-center border border-zinc-700/50">
                      <FaEnvelope className="text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-zinc-400">Email</p>
                      <a
                        href="mailto:hello@akio.lol"
                        className="font-bold hover:text-purple-400 transition-colors"
                      >
                        hello@akio.lol
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-4"
                    variants={fadeIn}
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-zinc-800/70 flex items-center justify-center border border-zinc-700/50">
                      <FaGithub className="text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-zinc-400">GitHub</p>
                      <a
                        href="https://github.com/YoruAkio"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold hover:text-purple-400 transition-colors"
                      >
                        github.com/YoruAkio
                      </a>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
