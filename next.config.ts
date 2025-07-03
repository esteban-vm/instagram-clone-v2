import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  devIndicators: false,
  images: { unoptimized: true },
  transpilePackages: ['three'],
}

export default nextConfig
