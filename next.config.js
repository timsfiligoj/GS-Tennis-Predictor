/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Static export
  distDir: 'out',    // Output directory for build
  images: {
    unoptimized: true, // Required for static export
  },
  // Properly handle trailing slashes for static export
  trailingSlash: true,
}

module.exports = nextConfig 