/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use 'export' for Cloudflare Pages static deploy, 'standalone' for Node.js
  output: 'export',
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
  env: {
    SERVICE_NAME: process.env.SERVICE_NAME || 'blackroad-os-web',
    SERVICE_ENV: process.env.SERVICE_ENV || 'development',
  },
}

export default nextConfig
