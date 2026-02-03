/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  env: {
    SERVICE_NAME: process.env.SERVICE_NAME || 'blackroad-os-web',
    SERVICE_ENV: process.env.SERVICE_ENV || 'development',
  },
}

export default nextConfig
