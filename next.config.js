/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;

module.exports = {
  publicRuntimeConfig: {
    // Will be available on both server and client
    KEY: process.env.KEY,
  },
};
