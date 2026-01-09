"use client";

import { useRef } from "react";
import { Code, Server, Rocket } from "lucide-react";
import { motion, useScroll, useTransform, useSpring, type Variants } from "framer-motion";

const journeyItems = [
  {
    icon: Code,
    title: "C++ Beginnings",
    description: "Started coding in 2021 with C++, learning fundamentals and problem-solving skills",
  },
  {
    icon: Server,
    title: "Web Development",
    description: "Transitioned to web dev in 2023, now building with Next.js, Node.js, and Go",
  },
  {
    icon: Rocket,
    title: "Growing Skills",
    description: "Continuously learning and building projects, from idea to deployment",
  },
];

// @note animation variants for stagger effect
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// @note reveal animation variants for header and content
const revealVariants: Variants = {
  hidden: { opacity: 0, y: -180, filter: "blur(10px)" },
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

// @note spring config for smooth parallax
const springConfig = { stiffness: 80, damping: 20, mass: 0.8 };

// @note about section with reveal animation and parallax journey cards
export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // @note cards - parallax with rotation
  const card1RotateRaw = useTransform(scrollYProgress, [0, 0.5, 1], [3, 0, -3]);
  const card2RotateRaw = useTransform(scrollYProgress, [0, 0.5, 1], [-2, 0, 2]);
  const card3RotateRaw = useTransform(scrollYProgress, [0, 0.5, 1], [2, 0, -2]);

  const card1YRaw = useTransform(scrollYProgress, [0, 0.5, 1], [140, 0, -70]);
  const card2YRaw = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -50]);
  const card3YRaw = useTransform(scrollYProgress, [0, 0.5, 1], [160, 0, -80]);

  // @note apply springs for smooth response
  const card1Rotate = useSpring(card1RotateRaw, springConfig);
  const card2Rotate = useSpring(card2RotateRaw, springConfig);
  const card3Rotate = useSpring(card3RotateRaw, springConfig);

  const card1Y = useSpring(card1YRaw, springConfig);
  const card2Y = useSpring(card2YRaw, springConfig);
  const card3Y = useSpring(card3YRaw, springConfig);

  const cardTransforms = [
    { y: card1Y, rotate: card1Rotate },
    { y: card2Y, rotate: card2Rotate },
    { y: card3Y, rotate: card3Rotate },
  ];

  return (
    <section ref={sectionRef} id="about" className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        {/* header with reveal animation */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={revealVariants}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="text-sm text-primary uppercase tracking-wider font-medium">
            About Me
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold">
            A self-taught developer on a 4+ year coding journey
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* content with reveal animation */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={revealVariants}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <h3 className="text-xl font-semibold mb-4">
              My Journey
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              My coding journey began in 2021 when I started learning C++, diving into the fundamentals
              of programming and problem-solving. After building a solid foundation, I transitioned to
              web development in 2023, discovering a new passion for creating interactive experiences.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Now I work with modern web technologies like Next.js and TypeScript on the frontend,
              while exploring Go and Node.js for backend development. I love the creative process of
              turning ideas into reality and continuously pushing myself to learn new things.
            </p>
          </motion.div>

          {/* journey cards with parallax */}
          <div>
            <motion.div
              className="grid md:grid-cols-3 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
            >
              {journeyItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  style={{ 
                    y: cardTransforms[index].y,
                    rotate: cardTransforms[index].rotate,
                  }}
                  className="will-change-transform"
                >
                  <motion.div
                    className="h-full p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-colors duration-300"
                    variants={cardVariants}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-semibold mb-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
