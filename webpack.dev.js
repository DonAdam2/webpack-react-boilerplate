// the following 2 lines is to merge common webpack configurations with this file
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
//constants
const { port, rootDirectory, devServer } = require('./constants');
let fullDevServerUrl = devServer + ':' + port + '/';

module.exports = (env, options) => {
	return merge(common(env, options), {
		resolve: {
			alias: {
				'react-dom': '@hot-loader/react-dom',
			},
		},
		module: {
			rules: [
				{
					test: /\.(png|jp(e*)g|svg)$/,
					use: {
						loader: 'file-loader',
						options: {
							name: '[name].[hash].[ext]',
							outputPath: 'assets/images',
							publicPath: fullDevServerUrl + 'assets/images',
						},
					},
				},
			],
		},
		devServer: {
			hot: true, // important to enable hot reloading (hot-loader)
			compress: true,
			contentBase: rootDirectory, // Tell the server where to serve content from
			port: port,
			overlay: true, //show error messages on an overlay on the browser
			// important for navigating to the app using browser (if you use any route other than /)
			historyApiFallback: true,
			// CORS :: https://github.com/webpack/webpack-dev-server/issues/533
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
				'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
			},
		},
	});
};
