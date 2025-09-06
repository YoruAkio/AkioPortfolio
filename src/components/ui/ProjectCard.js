import { ExternalLink, Star, GitFork, Eye } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { motion } from 'motion/react';
import { ScrollMorphLayer } from '@/components/ui/ScrollMorph';

export default function ProjectCard({ project, index }) {
  const {
    name,
    description,
    url,
    homepageUrl,
    stargazerCount,
    forkCount,
    primaryLanguage,
    languages,
    topics,
    createdAt,
    updatedAt,
  } = project;

  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  };
  const languageColors = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Python: '#3572A5',
    Java: '#b07219',
    'C++': '#f34b7d',
    C: '#555555',
    HTML: '#e34c26',
    CSS: '#1572B6',
    Vue: '#4FC08D',
    React: '#61DAFB',
    Python: '#3776ab',
    Rust: '#dea584',
    PHP: '#777BB4',
    Swift: '#fa7343',
    Kotlin: '#A97BFF',
  };

  return (
    <ScrollMorphLayer index={index}>
      <motion.div
        className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 sm:p-8 flex flex-col h-full group hover:border-primary/40 hover:bg-background/80 transition-all duration-500 shadow-lg hover:shadow-2xl morph-stack-item"
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{
        scale: 1.03,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        y: -5,
      }}
      whileTap={{ scale: 0.97 }}
    >
      <div className="flex items-start justify-between mb-4">
        <motion.h3
          className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary transition-all duration-500 line-clamp-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 + index * 0.1 }}
        >
          {name}
        </motion.h3>
        <motion.div
          className="flex items-center gap-2 text-muted-foreground text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 + index * 0.1 }}
        >
          {primaryLanguage && (
            <span className="flex items-center gap-1">
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor:
                    languageColors[primaryLanguage.name] || '#8b5cf6',
                }}
              />
              {primaryLanguage.name}
            </span>
          )}
        </motion.div>
      </div>

      <motion.p
        className="text-foreground/70 text-base sm:text-lg leading-relaxed mb-6 flex-grow line-clamp-3 group-hover:text-foreground/90 transition-colors duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 + index * 0.1 }}
      >
        {description || 'No description available'}
      </motion.p>

      {topics && topics.length > 0 && (
        <motion.div
          className="flex flex-wrap gap-2 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 + index * 0.1 }}
        >
          {topics.slice(0, 3).map((topic, topicIndex) => (
            <motion.span
              key={topic}
              className="px-3 py-1.5 bg-gradient-to-r from-secondary/30 to-secondary/50 text-foreground/80 rounded-full text-sm font-medium border border-border/30 hover:from-primary/20 hover:to-primary/30 hover:text-primary hover:border-primary/40 transition-all duration-300 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1 + topicIndex * 0.05 }}
              whileHover={{ scale: 1.08, y: -2 }}
            >
              {topic}
            </motion.span>
          ))}
          {topics.length > 3 && (
            <span className="px-3 py-1.5 text-sm text-foreground/50 bg-secondary/20 rounded-full border border-border/20">
              +{topics.length - 3} more
            </span>
          )}
        </motion.div>
      )}

      <motion.div
        className="flex items-center gap-6 mb-6 text-sm text-foreground/60 group-hover:text-foreground/80 transition-colors duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 + index * 0.1 }}
      >
        <span className="flex items-center gap-2 bg-secondary/20 px-3 py-1.5 rounded-full">
          <Star className="w-4 h-4 text-yellow-500" />
          <span className="font-medium">{stargazerCount}</span>
        </span>
        <span className="flex items-center gap-2 bg-secondary/20 px-3 py-1.5 rounded-full">
          <GitFork className="w-4 h-4 text-blue-500" />
          <span className="font-medium">{forkCount}</span>
        </span>
        <span className="text-xs bg-secondary/20 px-3 py-1.5 rounded-full">Updated {formatDate(updatedAt)}</span>
      </motion.div>

      <motion.div
        className="flex gap-3 pt-4 border-t border-border/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 + index * 0.1 }}
      >
        <motion.a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${
            homepageUrl ? 'flex-1' : 'w-full'
          } flex items-center justify-center gap-3 px-4 py-3 bg-gradient-to-r from-secondary/40 to-secondary/60 hover:from-secondary/60 hover:to-secondary/80 text-foreground rounded-xl transition-all duration-300 text-sm font-semibold group/button border border-border/30 hover:border-primary/30 shadow-sm hover:shadow-md`}
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaGithub className="w-5 h-5 group-hover/button:scale-110 group-hover/button:rotate-12 transition-all duration-300" />
          <span>View Code</span>
        </motion.a>
        {homepageUrl && (
          <motion.a
            href={homepageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-3 px-4 py-3 bg-gradient-to-r from-primary/20 to-primary/30 hover:from-primary/30 hover:to-primary/40 text-primary rounded-xl transition-all duration-300 text-sm font-semibold group/button border border-primary/30 hover:border-primary/50 shadow-sm hover:shadow-md"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            <ExternalLink className="w-5 h-5 group-hover/button:scale-110 group-hover/button:rotate-12 transition-all duration-300" />
            <span>Live Demo</span>
          </motion.a>
        )}
      </motion.div>
      </motion.div>
    </ScrollMorphLayer>
  );
}
