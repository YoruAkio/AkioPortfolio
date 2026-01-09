'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLoading } from '@/lib/loading-context';
import { useEffect, useState } from 'react';

// @note custom easing for entrance animation
const entranceEasing = [0.22, 1, 0.36, 1] as const;

export default function NotFound() {
  const { isLoadingComplete } = useLoading();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* horizontal lines background */}
      {mounted && (
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1, delay: 0.2, ease: entranceEasing }}
          style={{
            backgroundImage: `repeating-linear-gradient(to bottom, transparent, transparent 39px, hsl(var(--border)) 39px, hsl(var(--border)) 40px)`,
          }}
        />
      )}

      {/* 3 circle glows with different positions and colors */}
      {mounted && (
        <>
          {/* circle 1 - top left, darker */}
          <motion.div
            className="absolute top-[15%] left-[10%] z-[1]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: [0, 30, -20, 0],
              y: [0, -25, 15, 0],
            }}
            transition={{ 
              opacity: { duration: 1.5, delay: 0.2, ease: entranceEasing },
              scale: { duration: 1.5, delay: 0.2, ease: entranceEasing },
              x: { duration: 20, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 15, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <div
              className="w-[500px] h-[500px] rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(126,34,206,0.4) 0%, rgba(126,34,206,0.15) 40%, transparent 70%)',
              }}
            />
          </motion.div>

          {/* circle 2 - center right, primary */}
          <motion.div
            className="absolute top-[40%] right-[5%] z-[1]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: [0, -40, 20, 0],
              y: [0, 20, -30, 0],
            }}
            transition={{ 
              opacity: { duration: 1.5, delay: 0.4, ease: entranceEasing },
              scale: { duration: 1.5, delay: 0.4, ease: entranceEasing },
              x: { duration: 18, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 22, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <div
              className="w-[600px] h-[600px] rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(168,85,247,0.4) 0%, rgba(168,85,247,0.15) 40%, transparent 70%)',
              }}
            />
          </motion.div>

          {/* circle 3 - bottom center, darker */}
          <motion.div
            className="absolute bottom-[10%] left-[30%] z-[1]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: [0, 25, -35, 0],
              y: [0, -20, 25, 0],
            }}
            transition={{ 
              opacity: { duration: 1.5, delay: 0.6, ease: entranceEasing },
              scale: { duration: 1.5, delay: 0.6, ease: entranceEasing },
              x: { duration: 25, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 18, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <div
              className="w-[550px] h-[550px] rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(126,34,206,0.45) 0%, rgba(126,34,206,0.15) 40%, transparent 70%)',
              }}
            />
          </motion.div>
        </>
      )}

      {/* content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center flex flex-col items-center justify-center">
          {/* 404 number */}
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={isLoadingComplete ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1, ease: entranceEasing }}
          >
            <h1 className="text-8xl sm:text-9xl font-bold leading-none tracking-tight bg-gradient-to-br from-primary via-primary/80 to-primary/40 bg-clip-text text-transparent select-none">
              404
            </h1>
          </motion.div>

          {/* message */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={isLoadingComplete ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1, ease: entranceEasing, delay: 0.15 }}
            className="mt-6"
          >
            <h2 className="text-xl sm:text-2xl font-semibold mb-3">
              Page Not Found
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto mb-8">
              The page you&apos;re looking for doesn&apos;t exist or has been
              moved. Let&apos;s get you back on track.
            </p>
          </motion.div>

          {/* buttons */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={isLoadingComplete ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1, ease: entranceEasing, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              asChild
              size="lg"
              className="rounded-full px-6 py-3 shadow-lg shadow-primary/25"
            >
              <Link href="/">
                <Home className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full px-6 py-3"
              onClick={() => window.history.back()}
            >
              <button type="button" onClick={() => window.history.back()}>
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </button>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
