const webpack = require('webpack'),
  // the following 2 lines is to merge common webpack configurations with this file
  { merge } = require('webpack-merge'),
  common = require('./webpack.common.js');

module.exports = (env, options) => {
  return merge(common(env, options), {
    mode: 'development',
    resolve: {
      alias: {
        'react-dom': '@hot-loader/react-dom',
      },
    },
    devtool: 'inline-source-map',
    //required for hot reload
    target: 'web',
    devServer: {
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
      // Only update what has changed on hot reload
      new webpack.HotModuleReplacementPlugin(),
    ],
  });
};
