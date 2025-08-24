import { ExternalLink, Star, GitFork, Eye } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { motion } from 'motion/react';

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

  // Format the date
  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  };

  // Get language colors (you can expand this object)
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
    Go: '#00ADD8',
    Rust: '#dea584',
    PHP: '#777BB4',
    Swift: '#fa7343',
    Kotlin: '#A97BFF',
  };

  return (
    <motion.div
      className="bg-background border border-border rounded-xl p-5 sm:p-6 flex flex-col h-full group hover:border-primary/30 transition-all duration-300"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{
        scale: 1.02,
        boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.15)',
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <motion.h3
          className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1"
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

      {/* Description */}
      <motion.p
        className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4 flex-grow line-clamp-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 + index * 0.1 }}
      >
        {description || 'No description available'}
      </motion.p>

      {/* Topics/Tags */}
      {topics && topics.length > 0 && (
        <motion.div
          className="flex flex-wrap gap-1.5 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 + index * 0.1 }}
        >
          {topics.slice(0, 3).map((topic, topicIndex) => (
            <motion.span
              key={topic}
              className="px-2 py-1 bg-secondary/50 text-foreground/70 rounded-md text-xs font-medium border border-border/50 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1 + topicIndex * 0.05 }}
              whileHover={{ scale: 1.05 }}
            >
              {topic}
            </motion.span>
          ))}
          {topics.length > 3 && (
            <span className="px-2 py-1 text-xs text-muted-foreground">
              +{topics.length - 3} more
            </span>
          )}
        </motion.div>
      )}

      {/* Stats */}
      <motion.div
        className="flex items-center gap-4 mb-4 text-xs text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 + index * 0.1 }}
      >
        <span className="flex items-center gap-1">
          <Star className="w-3 h-3" />
          {stargazerCount}
        </span>
        <span className="flex items-center gap-1">
          <GitFork className="w-3 h-3" />
          {forkCount}
        </span>
        <span className="text-xs">Updated {formatDate(updatedAt)}</span>
      </motion.div>

      {/* Actions */}
      <motion.div
        className="flex gap-2 pt-3 border-t border-border/50"
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
          } flex items-center justify-center gap-2 px-3 py-2 bg-secondary/50 hover:bg-secondary text-foreground rounded-lg transition-colors text-sm font-medium group/button`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaGithub className="w-4 h-4 group-hover/button:scale-110 transition-transform" />
          Code
        </motion.a>
        {homepageUrl && (
          <motion.a
            href={homepageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors text-sm font-medium group/button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ExternalLink className="w-4 h-4 group-hover/button:scale-110 transition-transform" />
            Demo
          </motion.a>
        )}
      </motion.div>
    </motion.div>
  );
}
