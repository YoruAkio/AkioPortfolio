import Head from 'next/head';

export default function SEO({
  title = 'Yoru Akio - Full-Stack Developer',
  description = 'Self-taught Full-Stack Developer from Indonesia showcasing web development projects. Specializing in front-end solutions and back-end development with Go and JavaScript.',
  url = 'https://akio.lol',
  image = 'https://raw.githubusercontent.com/YoruAkio/ProjectAssets/refs/heads/main/akio/akio/og-image.png',
}) {
  const siteTitle =
    title === 'Yoru Akio - Full-Stack Developer'
      ? title
      : `${title} - Yoru Akio`;

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="title" content={siteTitle} />
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Yoru Akio" />
      <meta
        name="keywords"
        content="Full-Stack Developer, Web Developer, JavaScript, Go, Frontend, Backend, Indonesia, Portfolio, Yoru Akio"
      />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Yoru Akio Portfolio" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Yoru Akio',
            jobTitle: 'Full-Stack Developer',
            description: description,
            url: url,
            image: image,
            sameAs: [
              'https://github.com/yoruakio',
              'https://twitter.com/yoruakio',
              'https://t.me/ethermite',
            ],
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'Indonesia',
            },
            knowsAbout: [
              'JavaScript',
              'Go',
              'Full-Stack Development',
              'Frontend Development',
              'Backend Development',
              'Web Development',
            ],
          }),
        }}
      />
    </Head>
  );
}
