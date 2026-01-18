"use client";

import { motion } from "framer-motion";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface HeatmapProps {
  contributions: ContributionDay[];
}

// @note color classes for contribution levels
const getLevelColor = (level: number): string => {
  const colors: Record<number, string> = {
    0: "bg-muted/40",
    1: "bg-primary/30",
    2: "bg-primary/50",
    3: "bg-primary/75",
    4: "bg-primary",
  };
  return colors[level] || colors[0];
};

// @note format date for tooltip
const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { 
    month: "short", 
    day: "numeric", 
    year: "numeric" 
  });
};

export function ContributionHeatmap({ contributions }: HeatmapProps) {
  if (contributions.length === 0) {
    return (
      <div className="h-[280px] p-5 rounded-xl bg-card border border-border flex items-center justify-center">
        <p className="text-sm text-muted-foreground text-center">No contribution data</p>
      </div>
    );
  }

  // @note group contributions into weeks
  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }

  // @note calculate total contributions
  const totalContributions = contributions.reduce((sum, day) => sum + day.count, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="h-[280px] p-5 rounded-xl bg-card border border-border flex flex-col"
    >
      {/* header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">Contributions</h3>
        <span className="text-xs text-muted-foreground/70">
          {totalContributions.toLocaleString()} in the last year
        </span>
      </div>

      {/* scrollable heatmap container */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden">
        <div className="flex gap-[3px] min-w-max">
          {/* day labels */}
          <div className="flex flex-col gap-[3px] text-[9px] text-muted-foreground/70 pr-1.5 shrink-0">
            <span className="h-[10px]"></span>
            <span className="h-[10px] leading-[10px]">Mon</span>
            <span className="h-[10px]"></span>
            <span className="h-[10px] leading-[10px]">Wed</span>
            <span className="h-[10px]"></span>
            <span className="h-[10px] leading-[10px]">Fri</span>
            <span className="h-[10px]"></span>
          </div>

          {/* heatmap grid */}
          <div className="flex gap-[3px]">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-[3px]">
                {week.map((day, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`w-[10px] h-[10px] rounded-[2px] ${getLevelColor(day.level)} hover:ring-1 hover:ring-primary hover:ring-offset-1 hover:ring-offset-background transition-all cursor-default group relative`}
                    title={`${formatDate(day.date)}: ${day.count} contribution${day.count !== 1 ? 's' : ''}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* footer with legend */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
        <a 
          href="https://github.com/YoruAkio" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[10px] text-muted-foreground/70 hover:text-primary transition-colors"
        >
          Learn how we count contributions
        </a>
        <div className="flex items-center gap-1 text-[9px] text-muted-foreground/70">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={`w-[10px] h-[10px] rounded-[2px] ${getLevelColor(level)}`}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </motion.div>
  );
}
