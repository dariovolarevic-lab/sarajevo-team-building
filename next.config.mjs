const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    // Cloudflare Pages (next-on-pages) has no built-in image optimizer; the photos are
    // pre-sized webp, so serve them as-is there. Elsewhere Next keeps optimizing them.
    unoptimized: process.env.CF_PAGES === "1",
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/activities/sarajevo-city-race",
        destination: "/activities/sarajevo-tablet-race",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
