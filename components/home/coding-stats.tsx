"use client";

import { useEffect, useState } from "react";
import { Braces, LaptopMinimal, Clock, Code2 } from "lucide-react";
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

function BreakdownList({
  items,
  emptyLabel,
  maxItems,
}: {
  items: CodingBreakdownItem[];
  emptyLabel: string;
  maxItems?: number;
}) {
  if (items.length === 0) {
    return <p className="text-xs text-muted-foreground">{emptyLabel}</p>;
  }

  const visible = maxItems ? items.slice(0, maxItems) : items;
  const hidden = maxItems ? Math.max(items.length - maxItems, 0) : 0;

  return (
    <div className="space-y-3">
      {visible.map((item, i) => (
        <div key={item.name} className="space-y-1.5">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
              <p className="text-xs text-muted-foreground">{item.text}</p>
            </div>
            <span className="text-xs tabular-nums text-muted-foreground shrink-0">
              {Math.round(item.percent ?? 0)}%
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${Math.max(item.percent ?? 0, 3)}%` }}
              viewport={{ once: true }}
              transition={{ ...transition, delay: 0.07 * i }}
              className="h-full rounded-full bg-primary"
            />
          </div>
        </div>
      ))}
      {hidden > 0 && (
        <p className="text-xs text-muted-foreground">+{hidden} more</p>
      )}
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
    return (
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="h-[280px] rounded-2xl border border-border bg-card/70 animate-pulse" />
        <div className="h-[280px] rounded-2xl border border-border bg-card/70 animate-pulse" />
      </div>
    );
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
      className="grid gap-4 lg:grid-cols-2"
    >
      {/* left — total time + top language */}
      <div className="rounded-2xl border border-border/70 bg-card/80 backdrop-blur-sm p-7 flex flex-col gap-6">
        {/* total time */}
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary/80 mb-2">
            All-Time
          </p>
          <div className="flex items-center gap-2 mb-1">
            <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
            <h3 className="text-2xl font-semibold tracking-tight">{stats.totals.totalTime}</h3>
          </div>
          <p className="text-xs text-muted-foreground">Total coding time since tracking began</p>
        </div>

        <div className="h-px bg-border/60" />

      {/* top languages */}
        <div>
          <p className="mb-3 flex items-center gap-2 text-sm font-medium">
            <Code2 className="h-4 w-4 text-primary" />
            Top Languages
          </p>
          {stats.allTime.languages.length > 0 ? (
            <div className="space-y-3">
              {stats.allTime.languages.map((lang, i) => (
                <div key={lang.name} className="space-y-1.5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">{lang.name}</p>
                      <p className="text-xs text-muted-foreground">{lang.text}</p>
                    </div>
                    {lang.percent != null && (
                      <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                        {Math.round(lang.percent)}%
                      </span>
                    )}
                  </div>
                  <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.max(lang.percent ?? 0, 3)}%` }}
                      viewport={{ once: true }}
                      transition={{ ...transition, delay: 0.07 * i }}
                      className="h-full rounded-full bg-primary"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">No data available.</p>
          )}
        </div>
      </div>

      {/* right — past 7 days breakdown */}
      <div className="rounded-2xl border border-border/70 bg-card/80 backdrop-blur-sm p-7 flex flex-col gap-6">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary/80">
            Past 7 Days
          </p>
          <span className="rounded-full border border-border/70 bg-background/60 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
            {stats.last7Days.range}
          </span>
        </div>

        {/* languages */}
        <div>
          <p className="mb-3 flex items-center gap-2 text-sm font-medium">
            <Braces className="h-4 w-4 text-primary" />
            Languages
          </p>
          <BreakdownList
            items={stats.last7Days.languages}
            emptyLabel="No language activity in the last 7 days."
            maxItems={4}
          />
        </div>

        <div className="h-px bg-border/60" />

        {/* operating systems */}
        <div>
          <p className="mb-3 flex items-center gap-2 text-sm font-medium">
            <LaptopMinimal className="h-4 w-4 text-primary" />
            Operating Systems
          </p>
          <BreakdownList
            items={stats.last7Days.operatingSystems}
            emptyLabel="No OS data in the last 7 days."
          />
        </div>
      </div>
    </motion.div>
  );
}
