process.env.NODE_ENV = 'development';

// the following 2 lines is to merge common webpack configurations with this file
//plugins
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const Dotenv = require('dotenv-webpack');
//enables fast refresh (this is the new feature which overrides hot reloading)
const { merge } = require('webpack-merge');

//constants
const { protocol, openInBrowser } = require('./constants');
const { envDevelopmentPath } = require('./paths');
const common = require('./webpack.common.js');

module.exports = (env, options) =>
  merge(common(env, options), {
    mode: 'development',
    devtool: 'eval',
    //required for hot reload
    target: 'web',
    devServer: {
      //enable HTTPS
      server: protocol,
      //enable hot reloading
      hot: true,
      // Enable gzip compression of generated files.
      compress: true,
      // open development server
      open: openInBrowser,
      //coming from scripts/start.js file
      port: options.port,
      // important for navigating to the app using browser (if you use any route other than /)
      historyApiFallback: true,
      // CORS :: https://github.com/webpack/webpack-dev-server/issues/533
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
      },
      client: {
        overlay: false,
      },
    },
    plugins: [
      // enables fast refresh
      new ReactRefreshWebpackPlugin(),
      new Dotenv({
        path: envDevelopmentPath,
        systemvars: true, //Set to true if you would rather load all system variables as well (useful for CI purposes)
      }),
    ],
  });
