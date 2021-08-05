const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { withPlaiceholder } = require('@plaiceholder/next');

module.exports = withPlaiceholder({
    reactStrictMode: true,
    images: {
        domains: ['res.cloudinary.com']
    },
    webpack(config, options) {
        const { dev, isServer } = options;
     
        if (dev && isServer) {
          config.plugins.push(new ForkTsCheckerWebpackPlugin());
        }
     
        return config;
    }
});
