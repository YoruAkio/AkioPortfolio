"use client";

import { IconCode, IconRocket, IconServer } from "@tabler/icons-react";
import { motion } from "framer-motion";

const journeyItems = [
  {
    icon: IconCode,
    year: "2021",
    title: "C++ beginnings",
    description: "Started with fundamentals, memory, and problem-solving before moving to web.",
  },
  {
    icon: IconServer,
    year: "2023",
    title: "Web systems",
    description: "Building frontends with Next.js and backends with Go, Node.js, and APIs.",
  },
  {
    icon: IconRocket,
    year: "Now",
    title: "Shipping better",
    description: "Small interfaces, fast feedback, and code that can survive the next change.",
  },
];

const revealVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const staggerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export function AboutSection() {
  return (
    <section id="about" className="grid-section">
      <div className="relative z-10 mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-24">
        {/* header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerVariants}
          className="max-w-2xl"
        >
          <motion.span variants={revealVariants} className="section-kicker">
            About
          </motion.span>
          <motion.h2
            variants={revealVariants}
            className="section-title mt-4 text-[32px] leading-9 md:text-[42px] md:leading-[46px]"
          >
            Self-taught, practical, still sharpening.
          </motion.h2>
          <motion.p
            variants={revealVariants}
            className="mt-5 text-pretty leading-7 text-muted-foreground"
          >
            From C++ fundamentals to full-stack products — I care about simple interfaces, fast
            pages, and backend code that is boring in the best way.
          </motion.p>
        </motion.div>

        {/* journey timeline */}
        <motion.ol
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerVariants}
          className="mt-14 grid gap-4 md:grid-cols-3"
        >
          {journeyItems.map((item) => (
            <motion.li
              key={item.title}
              variants={{
                hidden: { opacity: 0, y: 28 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              style={{ cornerShape: "squircle" } as React.CSSProperties}
              className="group flex flex-col rounded-[32px] border border-black/[0.04] bg-secondary/60 p-1.5 transition-colors duration-200 ease-out hover:bg-secondary dark:border-white/[0.06] dark:bg-white/[0.03] dark:hover:bg-white/[0.06]"
            >
              {/* inner tile — text, fixed height so all cards match */}
              <div
                style={{ cornerShape: "squircle" } as React.CSSProperties}
                className="relative flex h-32 w-full flex-col justify-start overflow-hidden rounded-[28px] border border-black/[0.05] bg-background p-3.5"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-base font-semibold tracking-tight">{item.title}</h3>
                  <span className="shrink-0 rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium tabular-nums text-muted-foreground">
                    {item.year}
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-5 text-muted-foreground">{item.description}</p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
