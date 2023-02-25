/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.imgix.net',
        port: '',
        pathname: '/unsplash/**',
      },
    ],
  },
}

module.exports = nextConfig
