"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface LanguageStat {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

interface LanguageChartProps {
  languages: LanguageStat[];
}

export function LanguageChart({ languages }: LanguageChartProps) {
  const [hoveredLang, setHoveredLang] = useState<LanguageStat | null>(null);

  if (languages.length === 0) {
    return (
      <div className="h-[280px] p-5 rounded-xl bg-card border border-border flex items-center justify-center">
        <p className="text-sm text-muted-foreground text-center">No language data</p>
      </div>
    );
  }

  const size = 140;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 55;
  const innerRadius = 35;

  // @note create donut chart paths
  let currentAngle = -90;
  const slices = languages.slice(0, 8).map((lang) => {
    const angle = (lang.percentage / 100) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = cx + radius * Math.cos(startRad);
    const y1 = cy + radius * Math.sin(startRad);
    const x2 = cx + radius * Math.cos(endRad);
    const y2 = cy + radius * Math.sin(endRad);

    const ix1 = cx + innerRadius * Math.cos(startRad);
    const iy1 = cy + innerRadius * Math.sin(startRad);
    const ix2 = cx + innerRadius * Math.cos(endRad);
    const iy2 = cy + innerRadius * Math.sin(endRad);

    const largeArc = angle > 180 ? 1 : 0;

    const path = `
      M ${x1} ${y1}
      A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}
      L ${ix2} ${iy2}
      A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${ix1} ${iy1}
      Z
    `;

    currentAngle = endAngle;

    return { path, lang };
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="h-[280px] p-5 rounded-xl bg-card border border-border"
    >
      <h3 className="text-sm font-medium text-muted-foreground mb-4">Top Languages</h3>
      
      <div className="flex flex-col items-center">
        {/* donut chart with hover tooltip */}
        <div className="relative">
          <svg width={size} height={size} className="mb-3">
            {slices.map((slice, i) => (
              <motion.path
                key={slice.lang.name}
                d={slice.path}
                fill={slice.lang.color}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
                className="cursor-pointer transition-opacity hover:opacity-80"
                onMouseEnter={() => setHoveredLang(slice.lang)}
                onMouseLeave={() => setHoveredLang(null)}
              />
            ))}
          </svg>

          {/* center tooltip on hover */}
          {hoveredLang && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <div className="text-lg font-bold" style={{ color: hoveredLang.color }}>
                  {hoveredLang.percentage}%
                </div>
                <div className="text-[10px] text-muted-foreground">{hoveredLang.name}</div>
              </div>
            </div>
          )}
        </div>

        {/* legend */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-1 w-full">
          {languages.slice(0, 6).map((lang) => (
            <div 
              key={lang.name} 
              className="flex items-center gap-1.5 text-[11px] cursor-default"
              onMouseEnter={() => setHoveredLang(lang)}
              onMouseLeave={() => setHoveredLang(null)}
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: lang.color }}
              />
              <span className="text-muted-foreground truncate">{lang.name}</span>
              <span className="text-muted-foreground/50 ml-auto">{lang.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
