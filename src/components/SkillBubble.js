import { motion } from 'framer-motion';

function SkillBubble({ icon, name }) {
  return (
    <motion.div 
      className="flex items-center py-2 px-4 bg-zinc-800/80 backdrop-blur-sm rounded-full border border-zinc-700/50 whitespace-nowrap"
      whileHover={{ 
        scale: 1.05,
        backgroundColor: 'rgba(139, 92, 246, 0.2)',
        borderColor: 'rgba(139, 92, 246, 0.5)'
      }}
    >
      <div className="flex items-center gap-2">
        <div className="text-zinc-100">
          {icon}
        </div>
        <span className="text-sm font-medium text-zinc-300">{name}</span>
      </div>
    </motion.div>
  );
}

export default SkillBubble;