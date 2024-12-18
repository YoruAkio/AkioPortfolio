import { Coffee, Cat, Code } from "lucide-react";

export function Hero() {
    return (
      <section className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4 text-purple-400">YoruAkio</h1>
          <p className="text-xl text-gray-300">
            Student Developer | Open Source Enthusiast
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <Coffee className="text-purple-400" />
            <Cat className="text-purple-400" />
            <Code className="text-purple-400" />
          </div>
        </div>
      </section>
    );
  }