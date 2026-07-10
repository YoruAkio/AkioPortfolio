"use client";

import { useEffect, useState } from "react";
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

function shortTime(text: string): string {
  return text
    .replace(/ hrs?/, "h")
    .replace(/ mins?/, "m")
    .replace(/ secs?/, "s");
}

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
    return <div className="min-h-[300px] animate-pulse border-t border-border bg-secondary/40" />;
  }

  if (!stats || stats.error) {
    return (
      <div className="flex min-h-[300px] items-center justify-center border-t border-border bg-background p-8">
        <p className="text-sm text-muted-foreground">WakaTime stats are unavailable right now.</p>
      </div>
    );
  }

  const topLangs = stats.allTime.languages.slice(0, 6);
  const topOS = stats.last7Days.operatingSystems.slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={transition}
      className="bg-background p-6 sm:p-8"
    >
      {/* header */}
      <div className="flex items-center justify-between mb-8">
        <p className="section-kicker">Coding stats</p>
        <span className="text-[11px] text-muted-foreground/60">Via WakaTime</span>
      </div>

      <div className="grid gap-8 lg:gap-12 lg:grid-cols-[minmax(0,240px)_1fr]">
        {/* left — hero total + operating systems */}
        <div className="flex flex-col">
          <p className="text-[36px] font-medium leading-10 tabular-nums sm:text-[44px] sm:leading-[48px]">
            {stats.totals.totalTime}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">Total time tracked</p>

          {topOS.length > 0 && (
            <div className="mt-8 flex flex-col gap-2.5">
              <p className="text-[11px] font-medium uppercase text-muted-foreground/60">
                Systems · 7d
              </p>
              {topOS.map((os) => (
                <div key={os.name} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{os.name}</span>
                  <span className="font-medium tabular-nums">{shortTime(os.text)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* right — language breakdown bars */}
        <div className="flex flex-col gap-4">
          <p className="text-[11px] font-medium uppercase text-muted-foreground/60">
            Languages · all time
          </p>
          <div className="flex flex-col gap-3.5">
            {topLangs.map((lang, i) => (
              <div key={lang.name}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="font-medium text-foreground">{lang.name}</span>
                  <span className="text-muted-foreground tabular-nums text-xs">
                    {shortTime(lang.text)}
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                  <motion.div
                    className="h-full rounded-full bg-primary"
                    style={{ opacity: Math.max(0.45, 1 - i * 0.12) }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${lang.percent ?? 0}%` }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.9,
                      delay: 0.1 + i * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
