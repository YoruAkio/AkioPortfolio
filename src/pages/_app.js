import "@/styles/globals.css";
import { Sofia_Sans } from 'next/font/google';

const sofiaSans = Sofia_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sofia-sans',
  display: 'swap',
});

export default function App({ Component, pageProps }) {
  return (
    <main className={`${sofiaSans.variable}`}>
      <Component {...pageProps} />
    </main>
  );
}