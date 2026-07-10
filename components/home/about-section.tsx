"use client";

import { Code, Rocket, Server } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const journeyItems = [
  {
    icon: Code,
    title: "C++ beginnings",
    description:
      "Started in 2021 with fundamentals, memory, and problem-solving before moving to web.",
  },
  {
    icon: Server,
    title: "Web systems",
    description: "Now building frontends with Next.js and backends with Go, Node.js, and APIs.",
  },
  {
    icon: Rocket,
    title: "Shipping better",
    description:
      "I like small interfaces, fast feedback, and code that can survive the next change.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
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

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 42, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function AboutSection() {
  return (
    <section id="about" className="grid-section border-b-0">
      <div className="stripe-band h-14 opacity-70" />
      <div className="relative z-10 mx-auto grid max-w-5xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={revealVariants}
        >
          <span className="section-kicker">About</span>
          <h2 className="section-title mt-4">Self-taught, practical, still sharpening.</h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={revealVariants}
          className="border border-border bg-background p-6 sm:p-8"
        >
          <h3 className="text-lg font-medium leading-6">My journey</h3>
          <p className="mt-4 text-pretty leading-7 text-muted-foreground">
            I started coding in 2021 with C++, then moved into web development in 2023. These days I
            work mostly with Next.js, TypeScript, Go, and Node.js.
          </p>
          <p className="mt-4 text-pretty leading-7 text-muted-foreground">
            I care about simple interfaces, fast pages, and backend code that is boring in the best
            way: readable, reliable, and easy to change.
          </p>
        </motion.div>
      </div>

      <motion.div
        className="relative z-10 pb-14"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="border-y border-border bg-background">
          <div className="mx-auto grid max-w-5xl divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0">
            {journeyItems.map((item) => (
              <motion.div
                key={item.title}
                variants={cardVariants}
                className="bg-background p-6 transition-colors duration-200 hover:bg-secondary/40"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center border border-border bg-secondary">
                  <item.icon className="h-5 w-5 text-foreground" />
                </div>
                <h4 className="font-medium">{item.title}</h4>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="stripe-band h-14 opacity-70" />
    </section>
  );
}
