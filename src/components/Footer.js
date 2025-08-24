import { Mail, Heart, ExternalLink } from 'lucide-react';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { Button } from '@/components/ui/Button';
import { Separator } from '@/components/ui/Separator';
import FooterInfo from '@/components/ui/FooterInfo';

export default function Footer() {
  return (
    <footer className="relative bg-background border-t border-border/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center space-y-6">
          {/* Header Section */}
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-foreground">
              Let's Build Something Together
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto leading-relaxed">
              I'm always excited about new projects and collaborations. Feel
              free to reach out!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="group">
              <a
                href="mailto:yoruakio@proton.me"
                className="inline-flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Get in Touch
                <ExternalLink className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild className="group">
              <a
                href="#about"
                onClick={e => {
                  e.preventDefault();
                  const element = document.getElementById('about');
                  if (element) {
                    const navbarHeight = 80;
                    const elementTop =
                      element.getBoundingClientRect().top + window.pageYOffset;
                    const targetPosition = elementTop - navbarHeight;
                    window.scrollTo({
                      top: Math.max(0, targetPosition),
                      behavior: 'smooth',
                    });
                  }
                }}
                className="inline-flex items-center gap-2"
              >
                Learn More About Me
              </a>
            </Button>
          </div>

          {/* Footer Bottom */}
          <FooterInfo />
        </div>
      </div>
    </footer>
  );
}
