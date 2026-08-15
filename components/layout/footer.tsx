"use client";

import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaDiscord, FaGithub, FaXTwitter } from "react-icons/fa6";
import { trackUmamiEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { handleSmoothScroll } from "@/lib/smooth-scroll";

const socialLinks = [
  { href: "https://github.com/YoruAkio", icon: FaGithub, label: "GitHub" },
  { href: "https://discord.com/users/798258457022046218", icon: FaDiscord, label: "Discord" },
  { href: "https://x.com/YoruAkio", icon: FaXTwitter, label: "Twitter" },
  { href: "mailto:yoruakio@proton.me", icon: Mail, label: "Email" },
];

const footerLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
];

export function Footer() {
  return (
    <footer className="grid-section relative overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none">
        <h2 className="font-[family-name:var(--font-bricolage)] text-[9rem] font-bold leading-none text-foreground/[0.025] sm:text-[13rem] md:text-[18rem] lg:text-[23rem]">
          Akio
        </h2>
      </div>

      <div className="relative z-10 flex min-h-[260px] flex-col px-5 py-8 sm:px-8">
        <div className="flex flex-1 flex-col items-start justify-between gap-8 md:flex-row">
          <div className="flex max-w-lg flex-col gap-4">
            <a
              href="#home"
              onClick={(e) => {
                trackUmamiEvent("footer_logo_click", {
                  target: "home",
                });
                handleSmoothScroll(e, "#home");
              }}
              className="inline-flex w-fit items-center gap-3 rounded-xl transition-colors duration-200"
            >
              <Image
                src="/logo.png"
                alt="Yoru Akio"
                width={56}
                height={56}
                className="h-14 w-auto"
              />
            </a>
            <p className="max-w-md text-sm leading-6 text-muted-foreground">
              Full-stack developer building clear interfaces and reliable web systems.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    trackUmamiEvent("footer_link_click", {
                      target: link.href.replace("#", "") || "home",
                    });
                    handleSmoothScroll(e, link.href);
                  }}
                  className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="relative z-20 mb-4 flex items-center gap-2 md:mb-0">
            {socialLinks.map((social) => (
              <Button key={social.href} asChild variant="secondary" size="icon-sm">
                <Link
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackUmamiEvent("footer_social_click", {
                      social: social.label.toLowerCase(),
                    })
                  }
                  className="group text-muted-foreground hover:text-foreground"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4 transition-transform duration-200 group-hover:scale-125" />
                </Link>
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-auto border-t border-border/50 pt-6">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Yoru Akio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
