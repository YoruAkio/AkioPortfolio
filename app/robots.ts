import { MetadataRoute } from 'next';

// @note generates robots.txt for search engine crawlers
export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://yoruakio.xyz';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
