import '@/styles/globals.css';
import { Bricolage_Grotesque, Geist_Mono } from 'next/font/google';

const bricolageGrotesque = Bricolage_Grotesque({
  variable: '--font-bricolage-grotesque',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function App({ Component, pageProps }) {
  return (
    <div
      className={`${bricolageGrotesque.variable} ${geistMono.variable} font-sans`}
    >
      <Component {...pageProps} />
    </div>
  );
}
