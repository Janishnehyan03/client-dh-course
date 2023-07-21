/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "cpet-storage.blr1.digitaloceanspaces.com",
      "blr1.digitaloceanspaces.com",
      "images.unsplash.com",
    ],
  },
};

module.exports = {
  ...nextConfig,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  }
};
