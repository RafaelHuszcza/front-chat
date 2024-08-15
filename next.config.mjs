/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals = [...config.externals, 'bcrypt']
    return config
  },
  reactStrictMode: false,
  output: 'standalone',
  experimental: {
    staleTimes: {
      dynamic: 0,
    },
  },
}

export default nextConfig
