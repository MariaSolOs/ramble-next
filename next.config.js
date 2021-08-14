const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { withPlaiceholder } = require('@plaiceholder/next');
const withTM = require('next-transpile-modules')([
    '@fullcalendar/common',
    '@fullcalendar/react',
    '@fullcalendar/daygrid',
    '@fullcalendar/interaction',
    '@fullcalendar/timegrid'
]);

module.exports = withPlaiceholder(withTM({
    images: {
        domains: ['res.cloudinary.com']
    },
    webpack(config, { dev, isServer }) {
        // For getting all Typescript errors
        if (dev && isServer) {
          config.plugins.push(new ForkTsCheckerWebpackPlugin());
        }

        // Copy email templates
        if (!isServer) {
            config.resolve.fallback.fs = false
        }
        if (!dev) {
            config.plugins.push(
                new CopyPlugin({
                    patterns: [{ from: 'email-templates', to: 'email-templates' }]
                })
            )
        }
     
        return config;
    }
}));
