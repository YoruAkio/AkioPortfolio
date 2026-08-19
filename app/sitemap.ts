import { MetadataRoute } from "next";

// @note generates sitemap.xml for search engines
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://yoruakio.xyz";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
