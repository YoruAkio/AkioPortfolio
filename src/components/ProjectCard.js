import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch } from 'react-icons/fa';
import GlassMorphicContainer from './GlassMorphicContainer';

export default function ProjectCard({ project }) {
  const { title, description, image, tags, github, demo, stars, forks } = project;

  return (
    <GlassMorphicContainer className="h-full">
      <motion.div 
        className="flex flex-col h-full"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative w-full h-48 overflow-hidden rounded-t-xl">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-80"></div>
        </div>
        <div className="p-6 flex-grow">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">{title}</h3>
          <p className="text-zinc-400 text-sm mb-4 line-clamp-2">{description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, i) => (
              <span
                key={`${tag}-${i}`}
                className="text-xs font-bold px-2 py-1 rounded-full bg-zinc-800/80 text-purple-300 border border-zinc-700/50"
              >
                {tag}
              </span>
            ))}
          </div>
          
          {/* Show stars and forks if available */}
          {(stars !== undefined || forks !== undefined) && (
            <div className="flex gap-4 mb-4 text-sm text-zinc-400">
              {stars !== undefined && (
                <span className="flex items-center gap-1">
                  <FaStar className="text-yellow-400" /> {stars}
                </span>
              )}
              {forks !== undefined && (
                <span className="flex items-center gap-1">
                  <FaCodeBranch className="text-zinc-400" /> {forks}
                </span>
              )}
            </div>
          )}
        </div>
        <div className="p-6 pt-0 flex justify-between">
          <motion.a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-zinc-300 hover:text-purple-400 transition-colors text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaGithub /> Code
          </motion.a>
          {demo && demo !== '#' && (
            <motion.a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-zinc-300 hover:text-purple-400 transition-colors text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaExternalLinkAlt /> Demo
            </motion.a>
          )}
        </div>
      </motion.div>
    </GlassMorphicContainer>
  );
}