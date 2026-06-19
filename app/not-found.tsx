"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLoading } from "@/lib/loading-context";
import { useEffect, useState } from "react";

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
      {/* dot grid background, masked to fade toward the edges */}
      {mounted && (
        <motion.div
          aria-hidden
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: entranceEasing }}
          style={{
            backgroundImage: `radial-gradient(circle, var(--border) 1px, transparent 1px)`,
            backgroundSize: "22px 22px",
            WebkitMaskImage:
              "radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 80%)",
            maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 80%)",
          }}
        />
      )}

      {/* content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center flex flex-col items-center justify-center">
          {/* 404 number */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={isLoadingComplete ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1, ease: entranceEasing }}
          >
            <h1 className="text-7xl sm:text-8xl md:text-9xl font-bold leading-none tracking-tighter select-none">
              404
            </h1>
          </motion.div>

          {/* divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isLoadingComplete ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: entranceEasing, delay: 0.15 }}
            className="mt-6 h-px w-16 bg-border origin-center"
          />

          {/* message */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={isLoadingComplete ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1, ease: entranceEasing, delay: 0.25 }}
            className="mt-6"
          >
            <h2 className="text-lg sm:text-xl font-medium mb-3">Page not found</h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-sm mx-auto mb-8">
              The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get
              you back on track.
            </p>
          </motion.div>

          {/* buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={isLoadingComplete ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1, ease: entranceEasing, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Button asChild size="lg" className="rounded-full px-6">
              <Link href="/">
                <Home className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="lg"
              className="rounded-full px-6 text-muted-foreground hover:text-foreground"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
