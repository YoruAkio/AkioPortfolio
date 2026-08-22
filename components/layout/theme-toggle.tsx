"use client";

import { useEffect, useState } from "react";
import { MorphIcon } from "morphicons/react";
import { useTheme } from "next-themes";
// @note named export — the default is the React component, not the path data
import { __iconNode as Sun } from "@tabler/icons-react/dist/esm/icons/IconSun.mjs";
import { __iconNode as Moon } from "@tabler/icons-react/dist/esm/icons/IconMoon.mjs";
import { trackUmamiEvent } from "@/lib/analytics";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // @note render nothing until mounted — avoids SSR/client icon mismatch
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggleTheme = () => {
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
    trackUmamiEvent("theme_toggle", {
      from: resolvedTheme ?? "system",
      to: nextTheme,
    });
    setTheme(nextTheme);
  };

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className="relative flex h-12 w-12 items-center justify-center rounded-full bg-card/90 text-muted-foreground shadow-lg shadow-black/10 inset-shadow-[0_1px_0_rgba(255,255,255,0.25)] backdrop-blur-xl transition-colors duration-200 hover:bg-card hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50"
    >
      {mounted && (
        <MorphIcon icon={resolvedTheme === "dark" ? Sun : Moon} size={20} strokeWidth={1.75} />
      )}
      {!mounted && <span className="h-5 w-5" />}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
