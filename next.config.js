/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "cpet-storage.blr1.digitaloceanspaces.com",
      "blr1.digitaloceanspaces.com",
      "images.unsplash.com",
    ],
  },
  output: "export",
};

module.exports = nextConfig;
