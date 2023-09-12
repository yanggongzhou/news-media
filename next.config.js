/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['antd-mobile'],
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "common.module.scss";`
  },
  env: {
    OPENAI_ORG_ID: "org-vv2KTq4HI8Ow5CGv4n8JUn3A",
    OPENAI_API_KEY: "Ka8SXCcNGgu5XFT4AGA1T3BlbkFJ4a3Ydop5dxrwkqInoqTG",

    AZURE_ENDPOINT: "https://dz-ai-test.openai.azure.com/",
    AZURE_API_KEY: "40fd83e3e53e47898bc42b5f3302eb29",
  }
}

module.exports = nextConfig
