/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL || 'https://hnh-gharnata-api.brainsait-fadil.dev',
  },
}

module.exports = nextConfig
