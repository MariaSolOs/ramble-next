const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
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
}
