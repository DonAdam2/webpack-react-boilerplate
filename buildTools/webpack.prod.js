// the following 2 lines is to merge common webpack configurations with this file
const { merge } = require('webpack-merge'),
	common = require('./webpack.common.js'),
	glob = require('glob'),
	//plugins
	MiniCssExtractPlugin = require('mini-css-extract-plugin'),
	PurgeCSSPlugin = require('purgecss-webpack-plugin'),
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
		module: {
			rules: [
				{
					test: /\.(png|jpe?g|svg|gif)$/i,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: '[name].[ext]',
								outputPath: 'assets/images',
								publicPath: '',
							},
						},
						{
							loader: 'image-webpack-loader',
							options: {
								mozjpeg: {
									progressive: true,
									quality: 65,
								},
								// optipng.enabled: false will disable optipng
								optipng: {
									enabled: false,
								},
								pngquant: {
									quality: [0.65, 0.9],
									speed: 4,
								},
								gifsicle: {
									interlaced: false,
								},
								// the webp option will enable WEBP
								webp: {
									quality: 75,
								},
							},
						},
					],
					type: 'javascript/auto',
				},
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
			// remove un-used styles
			new PurgeCSSPlugin({
				paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
			}),
		],
	});
};
