/* eslint-disable no-param-reassign */
/* eslint-disable lodash/prefer-lodash-method */

const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const withSass = require('@zeit/next-sass');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = withBundleAnalyzer(
  withSass({
    analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
    analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
    cssModules: true,
    webpack(config, { dev }) {
      if (dev) {
        // Use eslint
        // config.module.rules.push({
        //   test: /\.js$/,
        //   exclude: /node_modules/,
        //   loader: 'eslint-loader'
        // });

        // Use stylelint
        config.plugins.push(new StyleLintPlugin());
      }

      // Fixes npm packages that depend on `fs` module
      config.node = {
        fs: 'empty'
      };

      return config;
    }
  })
);
