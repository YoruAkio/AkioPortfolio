"use client"

import { User, BarChart2, Code, Github } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    // Show navbar after 1 second of page load
    const timer = setTimeout(() => {
      setScrolled(true);
    }, 1000); // 1000ms = 1 second
    
    // Clean up timeout on unmount
    return () => clearTimeout(timer);
  }, []);

  const leftItems = [
    { icon: <User size={20} />, label: "About", href: "#about" },
    { icon: <Code size={20} />, label: "Projects", href: "#projects" },
  ];

  const rightItems = [
    { icon: <BarChart2 size={20} />, label: "Stats", href: "#stats" },
    { icon: <Github size={20} />, label: "Github", href: "https://github.com/YoruAkio" },
  ];

  return (
    <div className={`fixed top-0 left-0 right-0 w-full flex justify-center items-center h-16 z-50 px-4 transition-all duration-500 mt-4 ${scrolled ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
      <div className="w-full max-w-2xl px-5 py-3 backdrop-blur-lg bg-gradient-to-br from-purple-900/20 to-gray-900/50 rounded-xl border border-purple-500/20 shadow-xl">
        <div className="flex items-center justify-between">
          {/* Left items */}
          <div className="flex items-center gap-4">
            {leftItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="flex items-center gap-1.5 text-gray-300 hover:text-purple-300 transition-colors duration-300"
              >
                <div className="p-1.5 rounded-lg hover:bg-purple-900/30 transition-colors">
                  {item.icon}
                </div>
                <span className="hidden sm:block text-xs font-medium">{item.label}</span>
              </a>
            ))}
          </div>

          {/* Logo/Name */}
          <a 
            href="#" 
            className="text-lg font-bold bg-gradient-to-r from-purple-400 via-pink-300 to-purple-400 bg-clip-text text-transparent px-3 hover:scale-105 transition-transform duration-300"
          >
            YoruAkio
          </a>

          {/* Right items */}
          <div className="flex items-center gap-4">
            {rightItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="flex items-center gap-1.5 text-gray-300 hover:text-purple-300 transition-colors duration-300"
                target={item.href.startsWith('http') ? '_blank' : '_self'}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : ''}
              >
                <div className="p-1.5 rounded-lg hover:bg-purple-900/30 transition-colors">
                  {item.icon}
                </div>
                <span className="hidden sm:block text-xs font-medium">{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}