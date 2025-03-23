export default function Footer() {
  return (
    <footer className="py-10 border-t border-gray-800/50 bg-[#0c0c14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400">
            <p className="font-medium">&copy; {new Date().getFullYear()} YoruAkio</p>
            <p className="text-sm mt-1">Built with Next.js, Tailwind, and 💜</p>
          </div>
          <div className="flex gap-8 text-gray-400">
            <a href="#about" className="hover:text-purple-400 transition-colors">About</a>
            <a href="#projects" className="hover:text-purple-400 transition-colors">Projects</a>
            <a href="#stats" className="hover:text-purple-400 transition-colors">Stats</a>
            <a href="#contact" className="hover:text-purple-400 transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}