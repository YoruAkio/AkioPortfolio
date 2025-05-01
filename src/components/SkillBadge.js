import { motion } from 'framer-motion';

export default function SkillBadge({ icon, name }) {
  return (
    <motion.div
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 hover:border-purple-500/50 hover:bg-zinc-800/70 transition-all"
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="text-purple-400">{icon}</span>
      <span className="text-zinc-200 text-sm font-bold">{name}</span>
    </motion.div>
  );
}