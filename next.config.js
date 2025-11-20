/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "ar"],
    defaultLocale: "en",
    localeDetection: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dev-api.marginsdevelopments.com",
      },
      {
        protocol: "https",
        hostname: "customer-v992ht8wqeglys2p.cloudflarestream.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/prize/:path*",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
