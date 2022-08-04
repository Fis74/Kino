const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");
const withPlugins = require("next-compose-plugins");
require("dotenv").config();
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["rb.gy", "image.tmdb.org"],
  },
  env: {
    API_KEY: process.env.API_KEY,
    API_URL: process.env.API_URL,
    IMAGE_URL: process.env.IMAGE_URL,
  },
};

module.exports = withPlugins(
  [
    [
      withPWA,
      {
        pwa: {
          dest: "public",
          disable: process.env.NODE_ENV === "development",
          runtimeCaching,
        },
      },
    ],
  ],
  nextConfig
);
