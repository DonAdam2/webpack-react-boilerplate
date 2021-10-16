const webpack = require('webpack'),
	// the following 2 lines is to merge common webpack configurations with this file
	{ merge } = require('webpack-merge'),
	common = require('./webpack.common.js'),
	//constants
	{ port, rootDirectory, devServer } = require('./constants'),
	fullDevServerUrl = devServer + ':' + port + '/';

module.exports = (env, options) => {
	return merge(common(env, options), {
		resolve: {
			alias: {
				'react-dom': '@hot-loader/react-dom',
			},
		},
		devtool: 'inline-source-map',
		//required for hot reload
		target: 'web',
		module: {
			rules: [
				{
					test: /\.(png|jp(e*)g|svg)$/,
					use: {
						loader: 'file-loader',
						options: {
							name: '[name].[contenthash].[ext]',
							outputPath: 'assets/images',
							publicPath: fullDevServerUrl + 'assets/images',
						},
					},
					type: 'javascript/auto',
				},
			],
		},
		devServer: {
			compress: true,
			// open development server
			open: true,
			port: port,
			// important for navigating to the app using browser (if you use any route other than /)
			historyApiFallback: true,
			// CORS :: https://github.com/webpack/webpack-dev-server/issues/533
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
				'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
			},
		},
		plugins: [
			// Only update what has changed on hot reload
			new webpack.HotModuleReplacementPlugin(),
		],
	});
};
