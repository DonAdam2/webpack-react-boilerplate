process.env.NODE_ENV = 'development';

// the following 2 lines is to merge common webpack configurations with this file
const { merge } = require('webpack-merge'),
  common = require('./webpack.common.js'),
  //enables fast refresh (this is the new feature which overrides hot reloading)
  ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin'),
  //constants
  { protocol } = require('./constants');

module.exports = (env, options) => {
  return merge(common(env, options), {
    mode: 'development',
    devtool: 'inline-source-map',
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
      open: true,
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
        overlay: {
          errors: true,
          warnings: false,
        },
      },
    },
    plugins: [
      // enables fast refresh
      new ReactRefreshWebpackPlugin(),
    ],
  });
};
