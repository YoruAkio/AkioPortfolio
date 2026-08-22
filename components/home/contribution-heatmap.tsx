"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { trackUmamiEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface HeatmapProps {
  contributions: ContributionDay[];
}

type HoveredDay = { day: ContributionDay; x: number; y: number };

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

const DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function describeDay({ count, date }: ContributionDay) {
  const noun = count === 1 ? "contribution" : "contributions";
  return `${count} ${noun} on ${DATE_FORMAT.format(new Date(`${date}T00:00:00`))}`;
}

// @note dark pill floating above the hovered cell, clamped to the viewport edge
function Tooltip({ hovered }: { hovered: HoveredDay }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [left, setLeft] = React.useState(hovered.x);

  React.useLayoutEffect(() => {
    const half = (ref.current?.offsetWidth ?? 0) / 2;
    const edge = half + 8;
    setLeft(Math.min(Math.max(hovered.x, edge), window.innerWidth - edge));
  }, [hovered]);

  return createPortal(
    <div
      className="pointer-events-none fixed z-50"
      style={{
        left,
        top: hovered.y,
        transform: "translate(-50%, calc(-100% - 8px))",
      }}
    >
      <motion.div
        ref={ref}
        className="whitespace-nowrap rounded-lg bg-foreground px-2 py-1 text-[11px] font-medium text-background shadow-md"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.94 }}
        transition={{ duration: 0.14, ease: [0.22, 1, 0.36, 1] }}
      >
        {describeDay(hovered.day)}
      </motion.div>
    </div>,
    document.body,
  );
}

export function ContributionHeatmap({ contributions }: HeatmapProps) {
  const [hovered, setHovered] = React.useState<HoveredDay>();

  // @note single observer for the whole grid; cells animate via css once visible
  const gridRef = React.useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true });

  if (contributions.length === 0) {
    return (
      <div className="flex h-[280px] items-center justify-center p-5">
        <p className="text-center text-sm text-muted-foreground">No contribution data</p>
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

  // @note position the tooltip above the hovered cell center
  const hover = (day: ContributionDay) => (event: React.PointerEvent) => {
    const cell = event.currentTarget.getBoundingClientRect();
    setHovered({ day, x: cell.left + cell.width / 2, y: cell.top });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="flex h-[280px] flex-col p-5"
    >
      {/* header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">Contributions</h3>
        <span className="text-xs text-muted-foreground/70">
          {totalContributions.toLocaleString()} in the last year
        </span>
      </div>

      {/* @note scrollable heatmap container, scrollbar hidden but still scrollable */}
      <div className="heatmap-scroll flex-1 overflow-x-auto overflow-y-hidden">
        <div className="flex min-w-max gap-[3px]">
          {/* day labels */}
          <div className="flex shrink-0 flex-col gap-[3px] pr-1.5 text-[9px] text-muted-foreground/70">
            <span className="h-[10px]"></span>
            <span className="h-[10px] leading-[10px]">Mon</span>
            <span className="h-[10px]"></span>
            <span className="h-[10px] leading-[10px]">Wed</span>
            <span className="h-[10px]"></span>
            <span className="h-[10px] leading-[10px]">Fri</span>
            <span className="h-[10px]"></span>
          </div>

          {/* @note heatmap grid — columns sweep in left to right via css animation */}
          <div
            ref={gridRef}
            className={cn("flex gap-[3px]", gridInView && "grid-animate")}
            onPointerLeave={() => setHovered(undefined)}
          >
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-[3px]">
                {week.map((day, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    onPointerEnter={hover(day)}
                    style={{ "--d": `${weekIndex * 12}ms` } as React.CSSProperties}
                    className={`heatmap-cell h-[10px] w-[10px] rounded-[2px] ${getLevelColor(day.level)} cursor-default group relative transition-all hover:ring-1 hover:ring-primary hover:ring-offset-1 hover:ring-offset-background`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* footer with legend */}
      <div className="mt-3 flex items-center justify-between pt-3">
        <a
          href="https://github.com/YoruAkio"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackUmamiEvent("contribution_link_click", {
              target: "github_profile",
            })
          }
          className="text-[10px] text-muted-foreground/70 transition-colors hover:text-primary"
        >
          Learn how we count contributions
        </a>
        <div className="flex items-center gap-1 text-[9px] text-muted-foreground/70">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={`h-[10px] w-[10px] rounded-[2px] ${getLevelColor(level)}`}
            />
          ))}
          <span>More</span>
        </div>
      </div>

      <AnimatePresence>{hovered && <Tooltip key="tooltip" hovered={hovered} />}</AnimatePresence>
    </motion.div>
  );
}
