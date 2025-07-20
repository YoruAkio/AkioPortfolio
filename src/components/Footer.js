import { Mail } from 'lucide-react';
import { FaGithub, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-0 bg-background">
      <div className="h-screen flex items-end justify-center pb-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center space-y-4 [@media(min-width:390px)]:space-y-6 lg:space-y-8 p-4 [@media(min-width:390px)]:p-6 lg:p-8">
            {/* Main Footer Content */}
            <div className="space-y-2 [@media(min-width:390px)]:space-y-4 lg:space-y-6">
              <h3 className="text-lg [@media(min-width:390px)]:text-2xl lg:text-4xl font-bold text-foreground">
                Let's Connect
              </h3>
              <p className="text-foreground/70 text-xs [@media(min-width:390px)]:text-base lg:text-xl max-w-2xl mx-auto leading-relaxed px-2 [@media(min-width:390px)]:px-0">
                I'm always interested in new opportunities and collaborations.
                Feel free to reach out!
              </p>
            </div>

            {/* Social Links */}
            <div className="flex flex-row justify-center items-center gap-1.5 [@media(min-width:390px)]:gap-3 lg:gap-6 flex-wrap">
              <a
                href="https://github.com/YoruAKio"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 [@media(min-width:390px)]:gap-2 lg:gap-3 px-2.5 py-1.5 [@media(min-width:390px)]:px-4 [@media(min-width:390px)]:py-2 lg:px-6 lg:py-3 bg-secondary border border-border text-foreground hover:bg-primary/20 hover:text-primary hover:border-primary/30 rounded-lg transition-all duration-300 text-xs [@media(min-width:390px)]:text-sm lg:text-lg font-medium min-w-[75px] [@media(min-width:390px)]:min-w-[100px] lg:min-w-[130px] justify-center"
              >
                <FaGithub
                  size={14}
                  className="[@media(min-width:390px)]:w-4 [@media(min-width:390px)]:h-4 lg:w-5 lg:h-5"
                />
                <span className="hidden [@media(min-width:390px)]:inline">
                  GitHub
                </span>
                <span className="[@media(min-width:390px)]:hidden">Git</span>
              </a>
              <a
                href="https://x.com/yoruakio"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 [@media(min-width:390px)]:gap-2 lg:gap-3 px-2.5 py-1.5 [@media(min-width:390px)]:px-4 [@media(min-width:390px)]:py-2 lg:px-6 lg:py-3 bg-secondary border border-border text-foreground hover:bg-primary/20 hover:text-primary hover:border-primary/30 rounded-lg transition-all duration-300 text-xs [@media(min-width:390px)]:text-sm lg:text-lg font-medium min-w-[75px] [@media(min-width:390px)]:min-w-[100px] lg:min-w-[130px] justify-center"
              >
                <FaTwitter
                  size={14}
                  className="[@media(min-width:390px)]:w-4 [@media(min-width:390px)]:h-4 lg:w-5 lg:h-5"
                />
                <span className="hidden [@media(min-width:390px)]:inline">
                  Twitter
                </span>
                <span className="[@media(min-width:390px)]:hidden">X</span>
              </a>
              <a
                href="mailto:yoruakio@proton.me"
                className="flex items-center gap-1 [@media(min-width:390px)]:gap-2 lg:gap-3 px-2.5 py-1.5 [@media(min-width:390px)]:px-4 [@media(min-width:390px)]:py-2 lg:px-6 lg:py-3 bg-secondary border border-border text-foreground hover:bg-primary/20 hover:text-primary hover:border-primary/30 rounded-lg transition-all duration-300 text-xs [@media(min-width:390px)]:text-sm lg:text-lg font-medium min-w-[75px] [@media(min-width:390px)]:min-w-[100px] lg:min-w-[130px] justify-center"
              >
                <Mail
                  size={14}
                  className="[@media(min-width:390px)]:w-4 [@media(min-width:390px)]:h-4 lg:w-5 lg:h-5"
                />
                Email
              </a>
            </div>

            {/* Footer Info */}
            <div className="pt-3 [@media(min-width:390px)]:pt-4 lg:pt-6 border-t border-border/20">
              <div className="flex flex-col [@media(min-width:1024px)]:flex-row justify-center items-center gap-0.5 [@media(min-width:390px)]:gap-2 lg:gap-8">
                <div className="text-foreground/60 text-xs [@media(min-width:390px)]:text-sm lg:text-lg">
                  © 2025 Yoru Akio
                </div>
                <div className="text-foreground/50 text-xs [@media(min-width:390px)]:text-xs lg:text-base">
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
