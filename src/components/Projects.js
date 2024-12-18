import { motion } from 'framer-motion';

export function Projects({ repos }) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        id="projects"
        className="py-24"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-purple-400">Latest Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {repos.map((repo) => (
              <div key={repo.id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition">
                <h3 className="text-xl font-bold mb-2 text-purple-300">{repo.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{repo.description || 'No description available'}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-purple-400">{repo.language}</span>
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer" 
                     className="text-purple-300 hover:text-purple-400">
                    View Project
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    );
  }