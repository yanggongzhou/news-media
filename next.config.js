/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['antd-mobile'],
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "common.module.scss";`
  },
}

module.exports = nextConfig
