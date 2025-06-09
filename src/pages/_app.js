import "@/styles/globals.css";
import { Space_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';

const spaceMono = Space_Mono({
  variable: '--font-space-mono',
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <div className={`${spaceMono.variable} min-h-screen bg-[#0d1117] font-mono`}>
        <Script
          id="google-adsense"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8321717503736662"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <style jsx global>{`
          html {
            font-family: var(--font-space-mono), monospace;
            scroll-behavior: smooth;
          }
          
          /* Custom scrollbar */
          ::-webkit-scrollbar {
            width: 8px;
          }
          
          ::-webkit-scrollbar-track {
            background: #0d1117;
          }
          
          ::-webkit-scrollbar-thumb {
            background: #373c44;
            border-radius: 4px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: #9d7cca;
          }
        `}</style>
        <Component {...pageProps} />
        <Analytics />
      </div>
    </ThemeProvider>
  );
}