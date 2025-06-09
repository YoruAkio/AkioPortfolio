/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/ads.txt',
        destination: '/api/ads',
      },
    ];
  },
};

export default nextConfig;
