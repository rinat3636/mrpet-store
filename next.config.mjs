/** @type {import('next').NextConfig} */
const isExport = process.env.NEXT_OUTPUT === 'export';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
  output: isExport ? 'export' : 'standalone',
  distDir: isExport ? 'dist' : '.next',
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: isExport,
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
