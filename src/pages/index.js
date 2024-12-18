import { Sofia_Sans } from "next/font/google";
import { GitHub, Mail, Linkedin, Coffee, Cat, Code } from "lucide-react";
import { Hero, About, Projects, GithubStats, Contact, Navbar } from "@/components";
import { useEffect, useState } from "react";

const sofiaSans = Sofia_Sans({
  subsets: ["latin"],
  variable: "--font-sofia",
});

export default function Portfolio() {
  const [repos, setRepos] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchGithubData();
  }, []);

  const fetchGithubData = async () => {
    const reposRes = await fetch('https://api.github.com/users/YoruAkio/repos?sort=updated&per_page=8');
    const reposData = await reposRes.json();
    setRepos(reposData);

    const statsRes = await fetch('https://api.github.com/users/YoruAkio');
    const statsData = await statsRes.json();
    setStats(statsData);
  };

  return (
    <div className={`${sofiaSans.variable} min-h-screen bg-gray-900 text-white`}>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />
        <About />
        <Projects repos={repos} />
        <GithubStats stats={stats} />
        <Contact />
      </main>
    </div>
  );
}