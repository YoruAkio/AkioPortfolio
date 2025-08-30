import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="icon"
          href="https://raw.githubusercontent.com/raolbyte/raolbyte/main/banner.png"
        />
        <link
          rel="apple-touch-icon"
          href="https://raw.githubusercontent.com/raolbyte/raolbyte/main/banner.png"
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
