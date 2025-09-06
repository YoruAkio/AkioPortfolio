import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

const ScrollMorph = ({ children, className = '', delay = 0, direction = 'up' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-50px 0px -50px 0px",
    amount: 0.1
  });

  return (
    <motion.div
      ref={ref}
      className={`morph-stack-item ${className}`}
      initial={{ 
        opacity: 0, 
        y: direction === 'up' ? 60 : -60,
        scale: 0.9
      }}
      animate={isInView ? {
        opacity: 1,
        y: 0,
        scale: 1
      } : {}}
      transition={{
        duration: 0.6,
        delay: delay * 0.1,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  );
};

export const ScrollMorphContainer = ({ children, className = '' }) => {
  return (
    <div className={`morph-stack-container ${className}`}>
      {children}
    </div>
  );
};

export const ScrollMorphLayer = ({ children, className = '', index = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-30px 0px -30px 0px",
    amount: 0.1
  });

  return (
    <motion.div
      ref={ref}
      className={`morph-stack-layer ${className}`}
      initial={{ 
        opacity: 0, 
        y: 40,
        scale: 0.95
      }}
      animate={isInView ? {
        opacity: 1,
        y: 0,
        scale: 1
      } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollMorph;