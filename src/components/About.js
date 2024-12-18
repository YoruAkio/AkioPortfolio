import { motion } from "framer-motion";

export const About = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      id="about"
      className="py-24"
    >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-purple-400">About Me</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            Hello! I'm a student developer from Indonesia with a passion for programming.
            Currently focusing on JavaScript, C++, Go, and Python. When I'm not coding,
            you can find me enjoying a cup of matcha latte or spending time with cats.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            {['JavaScript', 'C++', 'Go', 'Python'].map((tech) => (
              <span key={tech} className="px-4 py-2 bg-purple-900/50 rounded-full text-purple-300">
                {tech}
              </span>
            ))}
          </div>
        </div>
    </motion.section>
  );
};