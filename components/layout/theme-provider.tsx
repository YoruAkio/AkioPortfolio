"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

// @note wraps next-themes provider with dark default
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
