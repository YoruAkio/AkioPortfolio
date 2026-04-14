'use client';

import { useEffect, useState } from 'react';
import { Clock, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';

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

function shortTime(text: string): string {
  return text
    .replace(/ hrs?/, 'h')
    .replace(/ mins?/, 'm')
    .replace(/ secs?/, 's');
}

const PALETTE = [
  'var(--color-chart-1)',
  'var(--color-chart-2)',
  'var(--color-chart-3)',
  'var(--color-chart-4)',
  'var(--color-chart-5)',
  'oklch(0.75 0.18 220)',
  'oklch(0.70 0.20 160)',
  'oklch(0.65 0.22 40)',
];

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

    const cx = 56,
      cy = 56,
      ro = 44,
      ri = 28;
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
      'Z',
    ].join(' ');

    return { path, item, color: PALETTE[i % PALETTE.length] };
  });
}

export function CodingStats() {
  const [stats, setStats] = useState<CodingStatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState<CodingBreakdownItem | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/wakatime');
        const data: CodingStatsResponse = await response.json();
        setStats(data);
      } catch (error) {
        console.error('failed to fetch wakatime stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="rounded-2xl border border-border bg-card/70 animate-pulse min-h-[260px]" />
    );
  }

  if (!stats || stats.error) {
    return (
      <div className="rounded-2xl border border-border/70 bg-card/80 p-6 flex items-center justify-center min-h-[260px]">
        <p className="text-sm text-muted-foreground">
          WakaTime stats are unavailable right now.
        </p>
      </div>
    );
  }

  const topLangs = stats.allTime.languages.slice(0, 7);
  const topOS = stats.last7Days.operatingSystems.slice(0, 3);
  const slices = buildSlices(topLangs);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={transition}
      className="rounded-2xl border border-border/70 bg-card/80 backdrop-blur-sm p-6 flex flex-col gap-4 h-full"
    >
      {/* title row */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary/80">
          Coding Stats
        </p>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Clock className="h-3.5 w-3.5 shrink-0" />
          <span className="text-sm font-semibold tracking-tight text-foreground">
            {stats.totals.totalTime}
          </span>
        </div>
      </div>

      <div className="h-px bg-border/60" />

      {/* languages donut + legend side by side */}
      <div className="flex items-center gap-5">
        {/* donut */}
        <div className="relative shrink-0">
          <svg width={112} height={112}>
            {slices.map((slice, i) => (
              <motion.path
                key={slice.item.name}
                d={slice.path}
                fill={slice.color}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ transformOrigin: '56px 56px' }}
                className="cursor-pointer transition-opacity hover:opacity-75"
                onMouseEnter={() => setHovered(slice.item)}
                onMouseLeave={() => setHovered(null)}
              />
            ))}
          </svg>
          {/* hover label */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {hovered ? (
              <div className="text-center px-1">
                <p className="text-[11px] font-bold text-foreground leading-none">
                  {shortTime(hovered.text)}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight truncate max-w-[48px]">
                  {hovered.name}
                </p>
              </div>
            ) : (
              <p className="text-[10px] text-muted-foreground/60 uppercase tracking-wide">
                All Time
              </p>
            )}
          </div>
        </div>

        {/* legend */}
        <div className="grid grid-cols-1 gap-y-1.5 flex-1 min-w-0">
          {slices.map(slice => (
            <div
              key={slice.item.name}
              className="flex items-center gap-2 text-[11px] cursor-default"
              onMouseEnter={() => setHovered(slice.item)}
              onMouseLeave={() => setHovered(null)}
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: slice.color }}
              />
              <span className="text-muted-foreground truncate">
                {slice.item.name}
              </span>
              <span className="text-muted-foreground/50 ml-auto tabular-nums shrink-0">
                {shortTime(slice.item.text)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* OS section */}
      {topOS.length > 0 && (
        <>
          <div className="h-px bg-border/60" />
          <div>
            <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground/70 mb-2.5">
              <Monitor className="h-3.5 w-3.5" />
              Operating Systems
              <span className="ml-auto normal-case tracking-normal font-normal text-muted-foreground/50">
                Last 7 Days
              </span>
            </p>
            <div className="flex gap-3">
              {topOS.map(os => (
                <div
                  key={os.name}
                  className="flex-1 rounded-lg bg-secondary/50 border border-border/60 px-3 py-2 text-center"
                >
                  <p className="text-xs font-semibold text-foreground tabular-nums">
                    {shortTime(os.text)}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
                    {os.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}
