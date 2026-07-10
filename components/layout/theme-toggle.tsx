"use client";

import { Moon, Sun } from "lucide-react";
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
      onClick={toggleTheme}
      className="relative rounded-lg border border-border bg-secondary p-2 text-muted-foreground transition-colors duration-200 hover:bg-primary hover:text-primary-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute left-2 top-2 h-4 w-4 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
