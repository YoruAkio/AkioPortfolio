import { MetadataRoute } from "next";

// @note generates manifest.json for PWA support
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Yoru Akio - Full-Stack Developer",
    short_name: "Yoru Akio",
    description:
      "Full-stack developer passionate about building performant applications with Go, TypeScript, and modern frameworks.",
    start_url: "/",
    display: "standalone",
    background_color: "#1a1a1a",
    theme_color: "#fafafa",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
