"use client";

import { SmoothScroll } from "./smooth-scroll";

interface AppShellProps {
  children: React.ReactNode;
}

// @note app shell that renders main layout with smooth scrolling
export function AppShell({ children }: AppShellProps) {
  return (
    <SmoothScroll>
      <main>{children}</main>
    </SmoothScroll>
  );
}
