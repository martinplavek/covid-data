/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["rc-util","rc-pagination","rc-picker","@antv", "@ant-design"]
}

module.exports = nextConfig
