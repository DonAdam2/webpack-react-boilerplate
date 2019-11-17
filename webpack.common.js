const path = require('path');
//plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
//constants
const { port, devServer, rootDirectory, jsSubDirectory } = require('./constants');
let fullDevServerUrl = devServer + ':' + port + '/';

module.exports = (env, options) => {
	// the mode variable is passed in package.json scripts (development, production)

	return {
		entry: `./${rootDirectory}/index.js`,
		output: {
			// __dirname is the absolute path to the root directory of our app
			path: path.resolve(__dirname, 'dist'),
			// hashes are very important in production for caching purposes
			filename: jsSubDirectory + 'bundle.[hash:8].js',
			// used for the lazy loaded component
			chunkFilename: jsSubDirectory + '[name].[hash:8].js',
			publicPath: '/',
		},
		// cheap-module-eval-source-map => (build speed: medium, rebuild speed: fast)
		// cheap-module-source-map => (build speed: medium, rebuild speed: pretty slow)
		// source mappings are very useful for debugging and returning the original source code
		devtool:
			options.mode === 'development' ? 'cheap-module-eval-source-map' : 'cheap-module-source-map',
		optimization: {
			// used to avoid duplicated dependencies from node modules
			splitChunks: {
				chunks: 'all',
			},
		},
		resolve: {
			extensions: ['*', '.js', '.jsx'],
		},
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/, // include .js files
					exclude: [/node_modules/],
					enforce: 'pre',
					use: {
						loader: 'eslint-loader',
						options: {
							emitError: true,
							emitWarning: true,
						},
					},
				},
				{
					test: /\.js|jsx$/,
					loader: 'babel-loader',
					exclude: /node_modules/,
				},
				{
					test: /\.(png|jp(e*)g|svg)$/,
					use: {
						loader: 'file-loader',
						options: {
							name: '[name].[hash].[ext]',
							outputPath: 'assets/images',
							publicPath: options.mode === 'development' ? fullDevServerUrl + 'assets/images' : '',
						},
					},
				},
				{
					test: /\.(ttf|eot|woff|woff2)$/,
					exclude: /node_modules/,
					use: {
						loader: 'file-loader',
						options: {
							name: '[name].[hash].[ext]',
							outputPath: 'assets/fonts',
							publicPath: options.mode === 'development' ? fullDevServerUrl + 'assets/fonts' : '',
						},
					},
				},
				{
					test: /\.s?[ac]ss$/,
					exclude: /node_modules/,
					use: [
						{
							// style-loader => insert styles in the head of the HTML as style tags or in blob links
							// MiniCssExtractPlugin => extract styles to a file
							loader: options.mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
							options: {
								// used for debugging the app (to see from which component styles are applied)
								sourceMap: options.mode === 'development',
							},
						},
						{
							loader: 'css-loader',
							options: {
								sourceMap: options.mode === 'development',
								// Number of loaders applied before CSS loader (which is postcss-loader)
								importLoaders: 3,
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
								sourceMap: true,
								plugins: [autoprefixer()],
							},
						},
						{
							loader: 'resolve-url-loader',
							options: {
								//needs sourcemaps to resolve urls
								sourceMap: true,
								engine: 'rework',
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
			new HtmlWebpackPlugin({
				title: 'Webpack React',
				template: __dirname + `/${rootDirectory}/index.html`,
				filename: 'index.html',
				inject: 'body',
				favicon: `./${rootDirectory}/assets/images/favicon.png`,
			}),
		],
	};
};
