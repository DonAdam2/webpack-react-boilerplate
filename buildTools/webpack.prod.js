process.env.NODE_ENV = 'production';

// the following 2 lines is to merge common webpack configurations with this file
const { merge } = require('webpack-merge'),
  common = require('./webpack.common.js'),
  //plugins
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  CssMinimizerPlugin = require('css-minimizer-webpack-plugin'),
  TerserJSPlugin = require('terser-webpack-plugin'),
  { CleanWebpackPlugin } = require('clean-webpack-plugin'),
  Dotenv = require('dotenv-webpack'),
  /* PLOP_INJECT_PWA_IMPORTS */
  //constants
  { cssSubDirectory } = require('./constants'),
  { environmentsPath } = require('./paths');

module.exports = (env, options) => {
  return merge(common(env, options), {
    performance: {
      hints: false,
      maxEntrypointSize: 512 * 1024,
      maxAssetSize: 512 * 1024,
    },
    optimization: {
      minimize: true,
      minimizer: [
        // minify the bundled js files (note: it's used by default in webpack5, but we are modifying the options)
        new TerserJSPlugin({
          extractComments: false,
          parallel: true,
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
          terserOptions: {
            parse: {
              // We want terser to parse ecma 8 code. However, we don't want it
              // to apply any minification steps that turns valid ecma 5 code
              // into invalid ecma 5 code. This is why the 'compress' and 'output'
              // sections only apply transformations that are ecma 5 safe
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              // Disabled because of an issue with Uglify breaking seemingly valid code
              comparisons: false,
              // Disabled because of an issue with Terser breaking valid code
              inline: 2,
              drop_console: true,
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 5,
              comments: false,
              // Turned on because emoji and regex is not minified properly using default
              ascii_only: true,
            },
          },
        }),
        //optimize and minify CSS
        new CssMinimizerPlugin(),
      ],
    },
    plugins: [
      // Removes/cleans build folders and unused assets when rebuilding
      new CleanWebpackPlugin(),
      // used to extract styles into separated stylesheet
      new MiniCssExtractPlugin({
        // used for main styles file
        filename: cssSubDirectory + '[name].[contenthash:8].css',
        // used for the lazy loaded component
        chunkFilename: cssSubDirectory + '[id].[contenthash:8].css',
      }),
      new Dotenv({
        path: `${environmentsPath}/.env`,
        systemvars: true, //Set to true if you would rather load all system variables as well (useful for CI purposes)
      }),
      /* PLOP_INJECT_PWA_PLUGINS */
    ],
  });
};
