/** @type {import('next').NextConfig} */

const path = require('path');

/*
module.exports = withSass({
  cssModules: true
});*/

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: "default",
    //domains: ["localhost"],
    domains: ["127.0.0.1"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },/**/
}

module.exports = nextConfig
