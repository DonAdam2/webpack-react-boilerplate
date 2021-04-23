// the following 2 lines is to merge common webpack configurations with this file
const { merge } = require('webpack-merge'),
	common = require('./webpack.common.js'),
	path = require('path'),
	glob = require('glob'),
	//plugins
	MiniCssExtractPlugin = require('mini-css-extract-plugin'),
	PurgeCSSPlugin = require('purgecss-webpack-plugin'),
	OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
	TerserJSPlugin = require('terser-webpack-plugin'),
	UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
	//constants
	projectPath = `${path.join(__dirname)}/../`,
	{ cssSubDirectory, rootDirectory } = require('./constants'),
	PATHS = {
		src: path.join(projectPath, rootDirectory),
	};

module.exports = (env, options) => {
	return merge(common(env, options), {
		optimization: {
			minimize: true,
			// minify the bundled js files
			minimizer: [
				new UglifyJsPlugin({
					cache: true,
					parallel: true,
				}),
				new TerserJSPlugin({
					extractComments: false,
					cache: true,
					parallel: true,
					sourceMap: false,
					// https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
					terserOptions: {
						ecma: 5,
						warnings: false,
						compress: {
							drop_console: true,
						},
					},
				}),
				new OptimizeCSSAssetsPlugin(),
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
				},
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
			new PurgeCSSPlugin({
				paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
			}),
		],
	});
};
