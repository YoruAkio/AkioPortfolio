"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

// @note wraps next-themes provider with light default
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
