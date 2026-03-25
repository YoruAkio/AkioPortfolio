"use client";

import { useEffect, useState } from "react";
import { Braces, Clock, Code2 } from "lucide-react";
import { motion } from "framer-motion";

interface CodingBreakdownItem {
  name: string;
  text: string;
  total_seconds: number;
  percent?: number;
}

interface CodingStatsResponse {
  totals: {
    totalTime: string;
    totalTimeSeconds: number;
    totalLanguageTime: string;
    totalLanguageTimeSeconds: number;
  };
  allTime: {
    languages: CodingBreakdownItem[];
  };
  last7Days: {
    range: string;
    isUpToDate: boolean;
    languages: CodingBreakdownItem[];
    operatingSystems: CodingBreakdownItem[];
  };
  error?: string;
}

const transition = { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const };

// @note condenses "256 hrs 36 mins" → "256h 36m", "45 mins" → "45m"
function shortTime(text: string): string {
  return text
    .replace(/ hrs?/, "h")
    .replace(/ mins?/, "m")
    .replace(/ secs?/, "s");
}

// @note palette for donut chart slices, cycling if needed
const PALETTE = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
  "oklch(0.75 0.18 220)",
  "oklch(0.70 0.20 160)",
  "oklch(0.65 0.22 40)",
];

// @note builds a donut chart path list from items with percent values
function buildSlices(items: CodingBreakdownItem[]) {
  let angle = -90;
  return items.map((item, i) => {
    const sweep = ((item.percent ?? 0) / 100) * 360;
    const start = angle;
    const end = angle + sweep;
    angle = end;

    const toXY = (deg: number, r: number, cx: number, cy: number) => {
      const rad = (deg * Math.PI) / 180;
      return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
    };

    const cx = 70, cy = 70, ro = 55, ri = 36;
    const s1 = toXY(start, ro, cx, cy);
    const e1 = toXY(end, ro, cx, cy);
    const s2 = toXY(end, ri, cx, cy);
    const e2 = toXY(start, ri, cx, cy);
    const large = sweep > 180 ? 1 : 0;

    const path = [
      `M ${s1.x} ${s1.y}`,
      `A ${ro} ${ro} 0 ${large} 1 ${e1.x} ${e1.y}`,
      `L ${s2.x} ${s2.y}`,
      `A ${ri} ${ri} 0 ${large} 0 ${e2.x} ${e2.y}`,
      "Z",
    ].join(" ");

    return { path, item, color: PALETTE[i % PALETTE.length] };
  });
}

function WakaDonutChart({
  items,
  label,
  emptyLabel,
  pill,
}: {
  items: CodingBreakdownItem[];
  label: string;
  emptyLabel: string;
  pill?: string;
}) {
  const [hovered, setHovered] = useState<CodingBreakdownItem | null>(null);
  const slices = buildSlices(items.slice(0, 8));

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground/70">{label}</p>
        <p className="text-xs text-muted-foreground">{emptyLabel}</p>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center flex-1 min-w-0 gap-3">
      {pill && (
        <span className="absolute top-[-3] left-0 rounded-full border border-border/70 bg-background/60 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
          {pill}
        </span>
      )}
      <div className="flex flex-col items-center gap-3">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground/70">{label}</p>

        {/* donut */}
        <div className="relative">
          <svg width={140} height={140}>
            {slices.map((slice, i) => (
              <motion.path
                key={slice.item.name}
                d={slice.path}
                fill={slice.color}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: "70px 70px" }}
                className="cursor-pointer transition-opacity hover:opacity-75"
                onMouseEnter={() => setHovered(slice.item)}
                onMouseLeave={() => setHovered(null)}
              />
            ))}
          </svg>

          {/* center label on hover */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {hovered ? (
              <div className="text-center px-1">
                <p className="text-[11px] font-bold text-foreground leading-none">
                  {shortTime(hovered.text)}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight truncate max-w-[60px]">
                  {hovered.name}
                </p>
              </div>
            ) : null}
          </div>
        </div>

        {/* legend */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 w-full">
          {slices.slice(0, 6).map((slice) => (
            <div
              key={slice.item.name}
              className="flex items-center gap-1.5 text-[11px] cursor-default"
              onMouseEnter={() => setHovered(slice.item)}
              onMouseLeave={() => setHovered(null)}
            >
              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: slice.color }} />
              <span className="text-muted-foreground truncate">{slice.item.name}</span>
              <span className="text-muted-foreground/50 ml-auto tabular-nums">
                {shortTime(slice.item.text)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BreakdownList({ items }: { items: CodingBreakdownItem[] }) {
  if (items.length === 0) return null;
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={item.name} className="space-y-1.5">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
            </div>
            <span className="text-xs tabular-nums text-muted-foreground shrink-0">
              {shortTime(item.text)}
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${Math.max(item.percent ?? 0, 2)}%` }}
              viewport={{ once: true }}
              transition={{ ...transition, delay: 0.07 * i }}
              className="h-full rounded-full bg-primary"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// @note coding stats panel fetched from internal api to keep the secret key server-side
export function CodingStats() {
  const [stats, setStats] = useState<CodingStatsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/wakatime");
        const data: CodingStatsResponse = await response.json();
        setStats(data);
      } catch (error) {
        console.error("failed to fetch wakatime stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <div className="h-[520px] rounded-2xl border border-border bg-card/70 animate-pulse" />;
  }

  if (!stats || stats.error) {
    return (
      <div className="rounded-2xl border border-border/70 bg-card/80 p-8">
        <p className="text-sm text-muted-foreground">WakaTime stats are unavailable right now.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={transition}
      className="rounded-2xl border border-border/70 bg-card/80 backdrop-blur-sm p-7 space-y-7"
    >
      {/* header */}
      <div className="flex items-start gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary/80">
            Programming Stats
          </p>
          <div className="mt-2 flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
            <h3 className="text-2xl font-semibold tracking-tight">{stats.totals.totalTime}</h3>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Total coding time since tracking began</p>
        </div>
      </div>

      <div className="h-px bg-border/60" />

      {/* two pie charts — languages + os */}
      <div className="flex gap-6 flex-wrap sm:flex-nowrap">
        <WakaDonutChart
          items={stats.last7Days.languages}
          label="Languages"
          emptyLabel="No language activity."
          pill={stats.last7Days.range}
        />
        <div className="hidden sm:block w-px bg-border/60 shrink-0" />
        <WakaDonutChart
          items={stats.last7Days.operatingSystems}
          label="Operating Systems"
          emptyLabel="No OS data."
          pill={stats.last7Days.range}
        />
      </div>

      <div className="h-px bg-border/60" />

      {/* all-time language breakdown */}
      <div>
        <p className="mb-4 flex items-center gap-2 text-sm font-medium">
          <Code2 className="h-4 w-4 text-primary" />
          All-Time Languages
        </p>
        <BreakdownList items={stats.allTime.languages} />
      </div>
    </motion.div>
  );
}
