"use client";

import { IconMoon, IconSun } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { trackUmamiEvent } from "@/lib/analytics";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    trackUmamiEvent("theme_toggle", {
      from: theme ?? "system",
      to: nextTheme,
    });
    setTheme(nextTheme);
  };

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className="relative flex h-12 w-12 items-center justify-center rounded-full bg-card/90 text-muted-foreground shadow-lg shadow-black/10 backdrop-blur-xl transition-colors duration-200 hover:bg-card hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50"
    >
      <IconSun className="h-5 w-5 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
      <IconMoon className="absolute h-5 w-5 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
