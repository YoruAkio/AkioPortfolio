import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="icon"
          href="https://raw.githubusercontent.com/YoruAkio/ProjectAssets/refs/heads/main/akio/akio/yoruakio.png"
        />
        <link
          rel="apple-touch-icon"
          href="https://raw.githubusercontent.com/YoruAkio/ProjectAssets/refs/heads/main/akio/akio/yoruakio.png"
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
