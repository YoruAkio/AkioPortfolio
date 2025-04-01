import { useEffect, useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useSpring,
} from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import Head from "next/head";
import {
  FaChevronDown,
  FaGithub,
  FaEnvelope,
  FaLinkedinIn,
  FaCode,
  FaStar,
  FaCodeBranch,
  FaUser,
  FaDiscord,
} from "react-icons/fa";
import {
  SiJavascript,
  SiCplusplus,
  SiGo,
  SiPython,
  SiTypescript,
} from "react-icons/si";
import { BsBarChartFill, BsFillCupHotFill } from "react-icons/bs";
import { GiCat } from "react-icons/gi";
import { HiExternalLink } from "react-icons/hi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PixelCard from "@/components/card/PixelCard";
import ScrollVelocity from "@/components/ScrollVelocity";

// Tech badge component
const TechBadge = ({ name }) => {
  const icons = {
    JavaScript: <SiJavascript size={18} />,
    Typescript: <SiTypescript size={18} />,
    "C++": <SiCplusplus size={18} />,
    Go: <SiGo size={18} />,
    Python: <SiPython size={18} />,
  };

  return (
    <motion.span
      whileHover={{ y: -5, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-4 py-2 bg-purple-900/30 rounded-xl text-purple-300 backdrop-blur-sm border border-purple-500/20 shadow-lg flex items-center gap-2"
    >
      {icons[name]}
      <span>{name}</span>
    </motion.span>
  );
};

export default function Portfolio() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.05], [0, -25]);
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const scale = useTransform(smoothScrollProgress, [0, 0.1], [1, 0.9]);
  const rotation = useTransform(smoothScrollProgress, [0, 1], [0, 10]);

  useEffect(() => {
    fetchGithubData();
  }, []);

  const fetchGithubData = async () => {
    try {
      setLoading(true);
      const reposRes = await fetch(
        "https://api.github.com/users/YoruAkio/repos?sort=updated&per_page=6"
      );

      if (!reposRes.ok) {
        throw new Error("Failed to fetch GitHub data");
      }

      const reposData = await reposRes.json();
      setRepos(reposData);
      setError(null);
    } catch (err) {
      console.error("Error fetching GitHub data:", err);
      setError("Failed to load GitHub data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
      offset: 100,
      easing: "ease-out-cubic",
    });

    // Initialize GitHub data fetch
    fetchGithubData();

    // Clean up AOS on unmount
    return () => {
      AOS.refresh();
    };
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  // New reveal animation
  const revealFromLeft = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const revealFromRight = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <>
      <Head>
        <title>Akio | Creative Developer Portfolio</title>
        <meta
          name="description"
          content="Modern portfolio showcasing software development projects and skills"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* Main container with enhanced background */}
      <div className="relative bg-gradient-to-b from-[#0a0a12] to-[#0d0d18] text-white min-h-screen">
        {/* Dynamic background elements */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Gradient blobs */}
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-violet-900/5 via-transparent to-blue-900/5"></div>
          <div className="absolute top-0 left-1/5 w-[35vw] h-[35vw] bg-gradient-to-r from-purple-500/10 to-purple-500/5 rounded-full blur-[120px] animate-blob"></div>
          <div className="absolute bottom-1/4 right-1/5 w-[40vw] h-[40vw] bg-gradient-to-r from-blue-500/10 to-cyan-500/5 rounded-full blur-[150px] animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/3 left-1/3 w-[25vw] h-[25vw] bg-gradient-to-r from-pink-500/5 to-purple-500/5 rounded-full blur-[100px] animate-blob animation-delay-4000"></div>
        </div>

        {/* Navbar */}
        <Navbar />

        {/* Main content */}
        <div className="relative z-10">
          {/* Enhanced Hero section with improved animations */}
          <section className="relative min-h-screen flex flex-col justify-center items-center px-4">
            <div className="absolute inset-0 bg-[url('https://raw.githubusercontent.com/YoruAkio/ProjectAssets/refs/heads/main/akio/grid-pattern.png')] bg-center bg-no-repeat bg-[length:100%_100%] opacity-[0.15] pointer-events-none"></div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-center"
            >
              <motion.h1
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                  type: "spring",
                  stiffness: 80,
                  damping: 15,
                }}
                className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-300 to-purple-400 bg-clip-text text-transparent"
              >
                YoruAkio
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="text-lg sm:text-xl text-gray-300 mb-8"
              >
                Student Developer <span className="text-purple-400">|</span>{" "}
                Open Source Enthusiast
              </motion.p>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="flex justify-center gap-6 mt-8"
              >
                <div className="relative">
                  <motion.div
                    variants={fadeInUp}
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-purple-900/30 rounded-xl backdrop-blur-sm border border-purple-500/20 relative z-10"
                    onHoverStart={() => setHoveredIcon("coffee")}
                    onHoverEnd={() => setHoveredIcon(null)}
                  >
                    <BsFillCupHotFill size={28} className="text-purple-300" />
                  </motion.div>
                  <AnimatePresence>
                    {hoveredIcon === "coffee" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full mt-3 left-1/2 -translate-x-1/2 w-48 p-3 bg-gradient-to-br from-purple-900/80 to-gray-900/80 backdrop-blur-lg rounded-xl border border-purple-500/30 shadow-xl z-20"
                      >
                        <p className="text-purple-200 text-sm text-center">
                          Enjoys matcha lattes & coffee while coding
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="relative">
                  <motion.div
                    variants={fadeInUp}
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-purple-900/30 rounded-xl backdrop-blur-sm border border-purple-500/20 relative z-10"
                    onHoverStart={() => setHoveredIcon("cat")}
                    onHoverEnd={() => setHoveredIcon(null)}
                  >
                    <GiCat size={28} className="text-purple-300" />
                  </motion.div>
                  <AnimatePresence>
                    {hoveredIcon === "cat" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full mt-3 left-1/2 -translate-x-1/2 w-48 p-3 bg-gradient-to-br from-purple-900/80 to-gray-900/80 backdrop-blur-lg rounded-xl border border-purple-500/30 shadow-xl z-20"
                      >
                        <p className="text-purple-200 text-sm text-center">
                          Cat lover & animal enthusiast
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="relative">
                  <motion.div
                    variants={fadeInUp}
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-purple-900/30 rounded-xl backdrop-blur-sm border border-purple-500/20 relative z-10"
                    onHoverStart={() => setHoveredIcon("code")}
                    onHoverEnd={() => setHoveredIcon(null)}
                  >
                    <FaCode size={28} className="text-purple-300" />
                  </motion.div>
                  <AnimatePresence>
                    {hoveredIcon === "code" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full mt-3 left-1/2 -translate-x-1/2 w-48 p-3 bg-gradient-to-br from-purple-900/80 to-gray-900/80 backdrop-blur-lg rounded-xl border border-purple-500/30 shadow-xl z-20"
                      >
                        <p className="text-purple-200 text-sm text-center">
                          Passionate about coding & development
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>

            {/* Enhanced scroll indicator */}
            <motion.div
              style={{ opacity, y, scale }}
              className="absolute bottom-12 left-0 right-0 mx-auto flex justify-center items-center w-full"
            >
              <motion.button
                onClick={scrollToAbout}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="flex flex-col items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors"
                aria-label="Scroll to about section"
              >
                <span className="text-sm font-light">Scroll to discover</span>
                <motion.div
                  animate={{
                    y: [0, 8, 0],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                >
                  <FaChevronDown size={24} />
                </motion.div>
              </motion.button>
            </motion.div>
          </section>

          {/* Enhanced ScrollVelocity effect */}
          <ScrollVelocity
            texts={[
              "Open Source Enthusiast",
              "Student Developer",
            ]}
            velocity={10}
            damping={20}
            stiffness={100}
            numCopies={4}
            velocityMapping={(velocity) => Math.abs(velocity)}
            parallaxClassName="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none"
            scrollerClassName="flex items-center justify-center h-full"
            parallaxStyle={{ zIndex: -1 }}
            scrollerStyle={{ zIndex: 1 }}
          />

          {/* Enhanced About section */}
          <section
            ref={aboutRef}
            id="about"
            className="py-24 px-4 sm:px-6"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, type: "spring", stiffness: 40 }}
                viewport={{ once: true, margin: "-50px" }}
                className="p-8 sm:p-10 rounded-2xl backdrop-blur-lg bg-gradient-to-br from-purple-900/10 to-gray-900/40 border border-purple-500/10 shadow-xl"
              >
                <motion.h2
                  variants={revealFromLeft}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="text-3xl sm:text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent inline-block"
                >
                  About Me
                </motion.h2>
                <motion.p
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="text-base sm:text-lg text-gray-300 leading-relaxed mb-8"
                >
                  Hello! I'm a student developer from Indonesia with a passion
                  for programming. Currently focusing on JavaScript, C++, Go,
                  and Python. When I'm not coding, you can find me enjoying a
                  cup of matcha latte or spending time with cats.
                </motion.p>
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex flex-wrap gap-3"
                >
                  {["JavaScript", "Typescript", "C++", "Go", "Python"].map(
                    (tech) => (
                      <motion.div key={tech} variants={fadeInUp}>
                        <TechBadge name={tech} />
                      </motion.div>
                    )
                  )}
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Enhanced Projects section */}
          <section
            id="projects"
            ref={projectsRef}
            className="py-12 px-4 sm:px-6"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="100"
          >
            <div className="max-w-7xl mx-auto">
              <motion.div
                variants={revealFromRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent inline-block">
                  Latest Projects
                </h2>
                <p className="text-gray-400 max-w-2xl">
                  A showcase of recent work, passion projects, and experiments
                </p>
              </motion.div>

              {loading ? (
                <div className="flex justify-center items-center py-32">
                  <div className="relative w-20 h-20">
                    <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-purple-900/30 border-t-purple-500 animate-spin"></div>
                    <div className="absolute top-1/2 left-1/2 w-10 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-purple-900/30 border-b-purple-500 animate-spin animation-delay-500"></div>
                  </div>
                </div>
              ) : error ? (
                <div className="py-20 max-w-md mx-auto">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 rounded-2xl bg-gradient-to-br from-red-500/10 to-purple-900/20 backdrop-blur-sm border border-red-500/30 text-center"
                  >
                    <p className="text-red-400 mb-6">{error}</p>
                    <motion.button
                      onClick={fetchGithubData}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-gradient-to-r from-red-500 to-purple-600 rounded-xl hover:from-red-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl text-white font-medium"
                    >
                      Retry
                    </motion.button>
                  </motion.div>
                </div>
              ) : (
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {repos.map((repo, index) => (
                    <motion.div
                      key={repo.id}
                      variants={fadeInUp}
                      whileHover={{ y: -5 }}
                      className="h-full"
                    >
                      <PixelCard
                        variant={
                          index % 3 === 0
                            ? "purple"
                            : index % 3 === 1
                            ? "blue"
                            : "pink"
                        }
                        className="h-full aspect-auto w-full relative"
                      >
                        <div className="absolute inset-0 p-6 flex flex-col h-full">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-gray-100 z-10">
                              {repo.name}
                            </h3>
                            <motion.a
                              href={repo.html_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`View ${repo.name} on GitHub`}
                              whileHover={{ scale: 1.1, rotate: 15 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-2 rounded-lg bg-purple-900/30 text-purple-300 hover:bg-purple-700/50 transition-colors z-10"
                            >
                              <HiExternalLink size={16} />
                            </motion.a>
                          </div>

                          <p className="text-gray-300 text-sm mb-6 min-h-[4rem] z-10">
                            {repo.description || "No description available"}
                          </p>

                          <div className="flex items-center justify-between mt-auto z-10">
                            <div className="flex items-center gap-1">
                              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                              <span className="text-gray-300 text-sm">
                                {repo.language || "N/A"}
                              </span>
                            </div>

                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1 text-gray-300 text-xs">
                                <FaStar size={14} />
                                <span>{repo.stargazers_count}</span>
                              </div>
                              <div className="flex items-center gap-1 text-gray-300 text-xs">
                                <FaCodeBranch size={14} />
                                <span>{repo.forks_count}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </PixelCard>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </section>

          {/* Enhanced Discord Banner */}
          <section
            id="contact"
            ref={contactRef}
            className="py-16 px-4 sm:px-6"
            data-aos="fade-up"
            data-aos-duration="1200"
          >
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: 0.1,
                }}
                viewport={{ once: true, margin: "-50px" }}
                className="p-8 sm:p-10 rounded-2xl overflow-hidden relative backdrop-blur-lg bg-gradient-to-br from-[#5865F2]/20 to-[#2c2f42]/60 border border-[#5865F2]/30 shadow-xl"
              >
                {/* Background pattern */}
                <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-[#5865F2]/20 blur-3xl"></div>
                <div className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full bg-[#5865F2]/15 blur-3xl"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="text-left">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-[#5865F2] to-[#8c9eff] bg-clip-text text-transparent inline-block">
                      Join My Discord
                    </h2>
                    <p className="text-gray-300 max-w-md">
                      Connect with me directly, join the community, and get
                      updates on my latest projects and activities.
                    </p>
                  </div>

                  <motion.a
                    href="https://discord.gg/ESsBxptJqr"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 25px rgba(88, 101, 242, 0.4)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-3 px-8 py-4 bg-[#5865F2] hover:bg-[#4752c4] transition-all rounded-xl text-white font-medium text-lg shadow-lg"
                  >
                    <FaDiscord size={24} />
                    Join Discord
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </>
  );
}
