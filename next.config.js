/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Static export
  distDir: 'out',    // Output directory for build
  images: {
    unoptimized: true, // Required for static export
  },
}

module.exports = nextConfig 