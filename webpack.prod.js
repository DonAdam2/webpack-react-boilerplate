// the following 2 lines is to merge common webpack configurations with this file
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');

const { cssSubDirectory } = require('./constants');

module.exports = (env, options) => {
	return merge(common(env, options), {
		// will return the original source code (build speed: medium, rebuild speed: pretty slow)
		// source mappings are very useful for debugging
		devtool: 'cheap-module-source-map',
		optimization: {
			// minify the bundled js files
			minimizer: [new TerserJSPlugin(), new OptimizeCSSAssetsPlugin()],
		},
		module: {
			rules: [
				{
					test: /\.s?[ac]ss$/,
					exclude: /node_modules/,
					use: [
						// extract styles to a file
						{ loader: MiniCssExtractPlugin.loader },
						{
							loader: 'css-loader',
							options: {
								// Number of loaders applied before CSS loader (which is postcss-loader)
								importLoaders: 2,
								// the following is used to enable CSS modules
								//								modules: true,
								// unique name of generated selectors
								localIdentName: '[name]__[local]__[hash:base64:5]',
							},
						},
						{
							loader: 'postcss-loader',
							options: {
								ident: 'postcss',
								plugins: [
									autoprefixer({
										browsers: ['ie >= 11', 'last 2 versions'],
									}),
								],
							},
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: true,
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
		],
	});
};
