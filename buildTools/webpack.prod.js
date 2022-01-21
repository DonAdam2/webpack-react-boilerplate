// the following 2 lines is to merge common webpack configurations with this file
const { merge } = require('webpack-merge'),
	common = require('./webpack.common.js'),
	glob = require('glob'),
	//plugins
	MiniCssExtractPlugin = require('mini-css-extract-plugin'),
	CssMinimizerPlugin = require('css-minimizer-webpack-plugin'),
	TerserJSPlugin = require('terser-webpack-plugin'),
	{ CleanWebpackPlugin } = require('clean-webpack-plugin'),
	//constants
	{ cssSubDirectory } = require('./constants'),
	PATHS = require('./paths');

module.exports = (env, options) => {
	return merge(common(env, options), {
		optimization: {
			minimize: true,
			minimizer: [
				// minify the bundled js files (note: it's used by default in webpack5, but we are modifying the options)
				new TerserJSPlugin({
					extractComments: false,
					parallel: true,
					// https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
					terserOptions: {
						ecma: 5,
						warnings: false,
						compress: {
							drop_console: true,
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
		],
	});
};
