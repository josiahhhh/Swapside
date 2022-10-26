/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: "/discord",
        destination: "https://discord.gg/CavemanAlerts",
        permanent: true,
      },
      {
        source: "/twitter",
        destination: "https://twitter.com/CavemanAlerts",
        permanent: true,
      },
      {
        source: "/patreon",
        destination: "https://patreon.com/CavemanAlerts",
        permanent: true,
      },
    ];
  },
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
};

module.exports = nextConfig;
