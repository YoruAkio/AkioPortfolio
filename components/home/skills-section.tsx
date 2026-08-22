"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ContributionHeatmap } from "./contribution-heatmap";
import { LanguageChart } from "./language-chart";
import { TechStack } from "./tech-stack";

// @note github stats interface
interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface LanguageStat {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

interface StatsResponse {
  contributions: ContributionDay[];
  languages: LanguageStat[];
  cached?: boolean;
  cacheAge?: number;
}

// @note reveal animation config for header
const revealAnimation = {
  initial: { y: 60, opacity: 0, filter: "blur(10px)" },
  animate: { y: 0, opacity: 1, filter: "blur(0px)" },
  transition: {
    duration: 1.4,
    delay: 0.2,
    ease: [0.22, 1, 0.36, 1] as const,
  },
};

// @note language chart + contribution heatmap + rotating tech stack
export function SkillsSection() {
  const [statsLoading, setStatsLoading] = useState(true);
  const [stats, setStats] = useState<{
    contributions: ContributionDay[];
    languages: LanguageStat[];
  }>({
    contributions: [],
    languages: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/github-stats");
        const data: StatsResponse = await res.json();
        setStats({
          contributions: data.contributions || [],
          languages: data.languages || [],
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setStatsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <section id="skills" className="grid-section overflow-hidden pt-20 pb-12 sm:pt-24 sm:pb-14">
      <div className="relative z-10 mx-auto px-5 sm:px-8">
        {/* header with whileInView reveal animation */}
        <motion.div
          initial={revealAnimation.initial}
          whileInView={revealAnimation.animate}
          viewport={{ once: true }}
          transition={revealAnimation.transition}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <span className="section-kicker">Skills</span>
          <h2 className="section-title mt-4">Tools I use to ship the work.</h2>
        </motion.div>

        {/* github stats row */}
        <div className="-mx-5 bg-background sm:-mx-8">
          <div className="mx-auto grid max-w-5xl lg:grid-cols-[320px_1fr]">
            {statsLoading ? (
              <div className="h-[280px] animate-pulse bg-secondary/40" />
            ) : (
              <div>
                <LanguageChart languages={stats.languages} />
              </div>
            )}

            {statsLoading ? (
              <div className="h-[280px] min-w-0 animate-pulse bg-secondary/40" />
            ) : (
              <div className="min-w-0">
                <ContributionHeatmap contributions={stats.contributions} />
              </div>
            )}
          </div>

          {/* @note rotating tech stack, directly under the contribution heatmap */}
          <TechStack />
        </div>
      </div>
    </section>
  );
}
