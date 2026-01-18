'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const loadingTexts = [
  'Loading...',
  'Memuat...',
  '読み込み中...',
  'Chargement...',
  'Cargando...',
  'Wird geladen...',
];

interface LoadingProps {
  interval?: number;
  onLoadingComplete?: () => void;
}

// @note loading component with animated multilingual text that cycles through different languages
export function Loading({ interval = 1500, onLoadingComplete }: LoadingProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const textTimer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % loadingTexts.length);
    }, interval);

    // @note hide loading after page is fully loaded
    const handleLoad = () => {
      setTimeout(() => {
        setIsVisible(false);
        onLoadingComplete?.();
      }, 800);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      clearInterval(textTimer);
      window.removeEventListener('load', handleLoad);
    };
  }, [interval, onLoadingComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fixed inset-0 z-[100] flex min-h-screen items-center justify-center bg-background"
        >
          <AnimatePresence mode="wait">
            <motion.h2
              key={currentIndex}
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-2xl md:text-3xl font-bold text-foreground"
            >
              {loadingTexts[currentIndex]}
            </motion.h2>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
