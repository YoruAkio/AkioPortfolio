'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface LoadingContextType {
  isLoadingComplete: boolean;
  setLoadingComplete: (value: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

// @note provides loading state to child components
export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoadingComplete, setLoadingComplete }}>
      {children}
    </LoadingContext.Provider>
  );
}

// @note hook to access loading state
export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}
