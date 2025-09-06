'use client';

import { useState, useEffect, useRef } from 'react';
import { TextAnimate } from '@/components/ui/TextAnimate';
import { motion } from 'motion/react';

export default function FooterInfo() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const intervalRef = useRef(null);

  const messages = [
    {
      type: 'copyright',
      text: '© 2025 Raol Mukarrozi',
    },
    {
      type: 'built-with',
      text: 'Built with ❤️ using Next.js',
    },
  ];

  useEffect(() => {
    const startInterval = () => {
      intervalRef.current = setInterval(() => {
        // First fade out
        setIsVisible(false);

        // After fade out completes, change message and fade in
        setTimeout(() => {
          setCurrentIndex(prevIndex => (prevIndex + 1) % messages.length);
          setIsVisible(true);
        }, 200); // Wait for fade out
      }, 3000); // Change every 3 seconds
    };

    startInterval();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [messages.length]);

  return (
    <div className="flex justify-center items-center text-sm text-muted-foreground min-h-[24px]">
      <motion.div
        animate={{
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : 5,
        }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="flex items-center"
      >
        <TextAnimate
          key={`${currentIndex}-${messages[currentIndex].text}`} // Force re-render with unique key
          animation="fadeIn"
          duration={0.6}
          by="character"
          startOnView={false} // Don't wait for view, start immediately
          className="flex items-center"
        >
          {messages[currentIndex].text}
        </TextAnimate>
      </motion.div>
    </div>
  );
}
