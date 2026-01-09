'use client';

import { Loading } from './loading';
import { SmoothScroll } from './smooth-scroll';
import { LoadingProvider, useLoading } from '@/lib/loading-context';

interface AppShellProps {
  children: React.ReactNode;
}

// @note inner shell that uses loading context
function AppShellInner({ children }: AppShellProps) {
  const { isLoadingComplete, setLoadingComplete } = useLoading();

  return (
    <>
      <Loading onLoadingComplete={() => setLoadingComplete(true)} />
      <div style={{ visibility: isLoadingComplete ? 'visible' : 'hidden' }}>
        <SmoothScroll>
          <main>{children}</main>
        </SmoothScroll>
      </div>
    </>
  );
}

// @note app shell that handles loading state and renders main layout
export function AppShell({ children }: AppShellProps) {
  return (
    <LoadingProvider>
      <AppShellInner>{children}</AppShellInner>
    </LoadingProvider>
  );
}
