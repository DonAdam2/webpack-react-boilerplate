// the following 2 lines is to merge common webpack configurations with this file
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
//plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
//constants
const { cssSubDirectory } = require('./constants');

module.exports = (env, options) => {
	return merge(common(env, options), {
		optimization: {
			// minify the bundled js files
			minimizer: [
				new TerserJSPlugin({
					extractComments: true,
					cache: true,
					parallel: true,
					sourceMap: true, // Must be set to true if using source-maps in production
					terserOptions: {
						// https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
						extractComments: 'all',
						compress: {
							drop_console: true,
						},
					},
				}),
				new OptimizeCSSAssetsPlugin(),
			],
		},
		plugins: [
			// used to extract styles into separated stylesheet
			new MiniCssExtractPlugin({
				// used for main styles file
				filename: cssSubDirectory + '[name].[hash:8].css',
				// used for the lazy loaded component
				chunkFilename: cssSubDirectory + '[id].[hash:8].css',
			}),
		],
	});
};
