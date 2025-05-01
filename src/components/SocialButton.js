import { motion } from 'framer-motion';

export default function SocialButton({ href, icon, label }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-800/70 hover:bg-purple-900/40 transition-colors duration-300 backdrop-blur-sm border border-zinc-700/70 hover:border-purple-500/50"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={label}
    >
      <span className="text-zinc-100">{icon}</span>
    </motion.a>
  );
}