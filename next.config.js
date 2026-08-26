/** @type {import('next').NextConfig} */
const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), serial=(), bluetooth=()",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
];

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
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
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
