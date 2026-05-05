/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: { unoptimized: true },
  turbopack: { root: __dirname },
  env: {
    API_URL: process.env.API_URL || 'https://hnh.brainsait.org',
    BSMA_API: process.env.BSMA_API || 'https://bsma.elfadil.com',
  },
}

module.exports = nextConfig
