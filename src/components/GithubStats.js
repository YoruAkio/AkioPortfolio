import { motion } from 'framer-motion';

export const GithubStats = ({ stats }) => {
  if (!stats) return null;
  
  const statItems = [
    { title: "Repositories", value: stats.public_repos },
    { title: "Followers", value: stats.followers },
    { title: "Following", value: stats.following },
    { title: "Gists", value: stats.public_gists }
  ];

  return (
    <section id="stats" className="py-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-purple-400 px-4">GitHub Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {statItems.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <StatCard title={stat.title} value={stat.value} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

function StatCard({ title, value }) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:bg-gray-800/70 transition-colors">
      <h3 className="text-purple-300 text-lg mb-2">{title}</h3>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  );
}