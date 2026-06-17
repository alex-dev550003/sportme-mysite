/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "app.sportme.ro",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/",
        statusCode: 301,
      },
      {
        source: "/home",
        destination: "/",
        statusCode: 301,
      },
      {
        source: "/pricing",
        destination: "/manageri",
        statusCode: 301,
      },
      {
        source: "/2025/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/wp-admin/:path*",
        destination: "/404",
        permanent: true,
      },
      {
        source: "/wp-content/:path*",
        destination: "/404",
        permanent: true,
      },
      {
        source: "/wp-includes/:path*",
        destination: "/404",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
