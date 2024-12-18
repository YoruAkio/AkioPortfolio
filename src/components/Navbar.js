import { motion } from "framer-motion";
import { User, BarChart2, Code, Github } from "lucide-react";

export const Navbar = () => {
  const leftItems = [
    { icon: <User size={24} />, label: "About", href: "#about" },
    { icon: <Code size={24} />, label: "Projects", href: "#projects" },
  ];

  const rightItems = [
    { icon: <BarChart2 size={24} />, label: "Stats", href: "#stats" },
    { icon: <Github size={24} />, label: "Github", href: "https://github.com/YoruAkio" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 w-full flex justify-center items-center h-24 z-50 px-4"
    >
      <div className="w-full max-w-2xl px-8 py-4 backdrop-blur-lg bg-gray-900/70 rounded-2xl border border-gray-700/50 shadow-lg">
        <div className="flex items-center justify-between">
          {/* Left items */}
          <div className="flex items-center gap-6">
            {leftItems.map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                {item.icon}
                <span className="hidden sm:block text-sm font-medium">{item.label}</span>
              </motion.a>
            ))}
          </div>

          {/* Logo/Name */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-xl font-bold text-white px-4"
          >
            YoruAkio
          </motion.div>

          {/* Right items */}
          <div className="flex items-center gap-6">
            {rightItems.map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                target={item.href.startsWith('http') ? '_blank' : '_self'}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : ''}
              >
                {item.icon}
                <span className="hidden sm:block text-sm font-medium">{item.label}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};