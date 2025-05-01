import { motion } from 'framer-motion';

export default function GlassMorphicContainer({ children, className }) {
  return (
    <motion.div
      className={`relative rounded-xl overflow-hidden bg-zinc-900/30 backdrop-blur-md border border-zinc-800/70 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {/* Subtle glass reflection effect */}
      <div className="absolute top-0 left-0 right-0 h-1/4 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>
      {children}
    </motion.div>
  );
}