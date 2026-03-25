"use client";

import { useEffect, useState } from "react";
import { Braces, Clock3, LaptopMinimal, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  last7Days: {
    range: string;
    isUpToDate: boolean;
    languages: CodingBreakdownItem[];
    operatingSystems: CodingBreakdownItem[];
  };
  error?: string;
}

const panelTransition = {
  duration: 0.9,
  ease: [0.22, 1, 0.36, 1] as const,
};

function formatShare(value?: number) {
  if (!value) {
    return "0%";
  }

  return `${Math.round(value)}%`;
}

function BreakdownList({
  items,
  emptyLabel,
}: {
  items: CodingBreakdownItem[];
  emptyLabel: string;
}) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border/70 bg-background/60 px-4 py-6 text-center text-sm text-muted-foreground">
        {emptyLabel}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={item.name} className="space-y-2">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-foreground">{item.name}</p>
              <p className="text-xs text-muted-foreground">{item.text}</p>
            </div>
            <span className="rounded-full border border-primary/20 bg-primary/10 px-2 py-1 text-[11px] font-medium text-primary">
              {formatShare(item.percent)}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-secondary/80">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${Math.max(item.percent ?? 0, 4)}%` }}
              viewport={{ once: true }}
              transition={{ ...panelTransition, delay: 0.08 * index }}
              className="h-full rounded-full bg-linear-to-r from-primary to-chart-2"
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
        console.error("Failed to fetch WakaTime stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="h-[420px] rounded-[2rem] border border-border bg-card/70 animate-pulse" />
    );
  }

  if (!stats || stats.error) {
    return (
      <Card className="rounded-[2rem] border-border/70 bg-card/85 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            Live Coding Stats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            WakaTime stats are unavailable right now.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={panelTransition}
      className="space-y-4"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-[1.5rem] border border-border/70 bg-card/80 p-5 shadow-[0_20px_45px_-35px_rgba(91,33,182,0.35)] backdrop-blur-sm">
          <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <Clock3 className="h-4 w-4 text-primary" />
            Total Time
          </div>
          <p className="text-3xl font-semibold tracking-tight">
            {stats.totals.totalTime}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            All coding time tracked since your WakaTime account started.
          </p>
        </div>

        <div className="rounded-[1.5rem] border border-border/70 bg-card/80 p-5 shadow-[0_20px_45px_-35px_rgba(91,33,182,0.35)] backdrop-blur-sm">
          <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <Braces className="h-4 w-4 text-primary" />
            Total Language Time
          </div>
          <p className="text-3xl font-semibold tracking-tight">
            {stats.totals.totalLanguageTime}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Total language-coded time, excluding the generic other bucket.
          </p>
        </div>
      </div>

      <div className="rounded-[1.75rem] border border-border/70 bg-card/80 p-5 shadow-[0_20px_45px_-35px_rgba(91,33,182,0.35)] backdrop-blur-sm">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary/80">
              Last Coding Stats
            </p>
            <h3 className="mt-1 text-xl font-semibold">{stats.last7Days.range}</h3>
          </div>
          <span className="rounded-full border border-border/70 bg-card px-3 py-1 text-xs text-muted-foreground">
            {stats.last7Days.isUpToDate ? "up to date" : "refreshing"}
          </span>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-sm font-medium text-foreground">Language Time</p>
            <BreakdownList
              items={stats.last7Days.languages}
              emptyLabel="No language activity in the last 7 days."
            />
          </div>

          <div>
            <p className="mb-4 flex items-center gap-2 text-sm font-medium text-foreground">
              <LaptopMinimal className="h-4 w-4 text-primary" />
              Operating System Time
            </p>
            <BreakdownList
              items={stats.last7Days.operatingSystems}
              emptyLabel="No operating system data in the last 7 days."
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
