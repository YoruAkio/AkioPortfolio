import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { AppShell } from "@/components/layout/app-shell";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://yoruakio.xyz";

export const metadata: Metadata = {
  title: {
    default: "Yoru Akio - Full-Stack Developer",
    template: "%s | Yoru Akio",
  },
  description:
    "Self-taught Full-Stack Developer from Indonesia specializing in front-end solutions and back-end development with Go and JavaScript.",
  keywords: [
    "Yoru Akio",
    "Full-Stack Developer",
    "Web Developer",
    "Indonesia",
    "React",
    "Next.js",
    "Go",
    "JavaScript",
    "TypeScript",
  ],
  authors: [{ name: "Yoru Akio", url: siteUrl }],
  creator: "Yoru Akio",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Yoru Akio",
    title: "Yoru Akio - Full-Stack Developer",
    description:
      "Self-taught Full-Stack Developer from Indonesia specializing in front-end solutions and back-end development with Go and JavaScript.",
    images: [
      {
        url: `https://raw.githubusercontent.com/YoruAkio/ProjectAssets/refs/heads/main/akio/akio/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Yoru Akio - Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yoru Akio - Full-Stack Developer",
    description:
      "Self-taught Full-Stack Developer from Indonesia specializing in front-end solutions and back-end development with Go and JavaScript.",
    images: [`https://raw.githubusercontent.com/YoruAkio/ProjectAssets/refs/heads/main/akio/akio/og-image.png`],
    creator: "@yoruakio",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  metadataBase: new URL(siteUrl),
};

// @note JSON-LD structured data for rich search results
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Yoru Akio",
  url: siteUrl,
  image: "https://raw.githubusercontent.com/YoruAkio/ProjectAssets/refs/heads/main/akio/akio/og-image.png",
  sameAs: [
    "https://github.com/YoruAkio",
    "https://twitter.com/yoruakio",
  ],
  jobTitle: "Full-Stack Developer",
  worksFor: {
    "@type": "Organization",
    name: "Freelance",
  },
  knowsAbout: [
    "Web Development",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Go",
    "Node.js",
  ],
  description:
    "Self-taught Full-Stack Developer from Indonesia specializing in front-end solutions and back-end development with Go and JavaScript.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={bricolage.variable} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${bricolage.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        <ThemeProvider>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
