import { Mail } from 'lucide-react';
import { FaGithub, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-0 bg-background">
      <div className="h-screen flex items-end justify-center pb-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center space-y-8 p-8 lg:p-8">
            {/* Main Footer Content */}
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                Let's Connect
              </h3>
              <p className="text-foreground/70 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
                I'm always interested in new opportunities and collaborations.
                Feel free to reach out!
              </p>
            </div>

            {/* Social Links */}
            <div className="flex flex-row justify-center items-center gap-2 sm:gap-4 lg:gap-6 flex-wrap">
              <a
                href="https://github.com/YoruAKio"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 sm:gap-3 px-3 py-2 sm:px-6 sm:py-3 bg-secondary/30 hover:bg-secondary/50 text-foreground rounded-lg transition-all duration-300 text-xs sm:text-base lg:text-lg font-medium min-w-[90px] sm:min-w-[130px] justify-center"
              >
                <FaGithub size={16} className="sm:w-5 sm:h-5" />
                <span className="hidden xs:inline sm:inline">GitHub</span>
                <span className="xs:hidden sm:hidden">Git</span>
              </a>
              <a
                href="https://x.com/yoruakio"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 sm:gap-3 px-3 py-2 sm:px-6 sm:py-3 bg-secondary/30 hover:bg-secondary/50 text-foreground rounded-lg transition-all duration-300 text-xs sm:text-base lg:text-lg font-medium min-w-[90px] sm:min-w-[130px] justify-center"
              >
                <FaTwitter size={16} className="sm:w-5 sm:h-5" />
                <span className="hidden xs:inline sm:inline">Twitter</span>
                <span className="xs:hidden sm:hidden">X</span>
              </a>
              <a
                href="mailto:yoruakio@proton.me"
                className="flex items-center gap-1.5 sm:gap-3 px-3 py-2 sm:px-6 sm:py-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-all duration-300 text-xs sm:text-base lg:text-lg font-medium min-w-[90px] sm:min-w-[130px] justify-center"
              >
                <Mail size={16} className="sm:w-5 sm:h-5" />
                Email
              </a>
            </div>

            {/* Footer Info */}
            <div className="pt-6 border-t border-border/20">
              <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 lg:gap-8">
                <div className="text-foreground/60 text-sm sm:text-base lg:text-lg">
                  © 2025 Yoru Akio. All rights reserved.
                </div>
                <div className="text-foreground/50 text-xs sm:text-sm lg:text-base">
                  Built with Next.js & Tailwind CSS
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
