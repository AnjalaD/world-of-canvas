/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: {
        loader: "raw-loader",
      },
    });
    return config;
  },
};

module.exports = nextConfig;
