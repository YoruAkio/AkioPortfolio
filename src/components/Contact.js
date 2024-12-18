import { Github, Mail, Linkedin } from "lucide-react";

export function Contact() {
    return (
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-purple-400">Get In Touch</h2>
          <div className="flex justify-center gap-8">
            <SocialLink href="https://github.com/YoruAkio" icon={<Github />} label="GitHub" />
            <SocialLink href="mailto:your.email@example.com" icon={<Mail />} label="Email" />
            <SocialLink href="https://linkedin.com/in/yourusername" icon={<Linkedin />} label="LinkedIn" />
          </div>
        </div>
      </section>
    );
  }
  
  function SocialLink({ href, icon, label }) {
    return (
      <a href={href} 
         target="_blank" 
         rel="noopener noreferrer"
         className="flex items-center gap-2 text-purple-300 hover:text-purple-400 transition-colors">
        {icon}
        <span>{label}</span>
      </a>
    );
  }