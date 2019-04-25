const path              = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const {port, devServer, jsSubDirectory} = require('./constants');
let fullDevServerUrl = devServer + ':' + port + '/';

module.exports = (env, options) => {
    // the mode variable is passed in package.json scripts (development, production)

    return {
        entry        : "./src/index.js",
        output       : {
            // __dirname is the absolute path to the root directory of our app
            path          : path.resolve(__dirname, 'dist'),
            filename      : jsSubDirectory + "bundle.[hash].js",
            // used for the lazy loaded component
            chunkFilename : jsSubDirectory + "[name].[hash].js",
            publicPath    : '/',
        },
        optimization : {
            // used to avoid duplicated dependencies from node modules
            splitChunks : {
                chunks : 'all'
            },
        },
        resolve      : {
            extensions : ['*', '.js', '.jsx']
        },
        module       : {
            rules : [
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
                    test    : /\.js|jsx$/,
                    loader  : 'babel-loader',
                    exclude : /node_modules/
                },
                {
                    test: /\.(png|jp(e*)g|svg)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[hash].[ext]',
                                outputPath: 'images',
                                publicPath: options.mode === 'development ' ? fullDevServerUrl + 'images' : '',
                            },
                        },
                    ],
                },
                {
                    test: /\.(ttf|eot|woff|woff2)$/,
                    exclude : /node_modules/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[hash].[ext]',
                                outputPath: 'fonts',
                                publicPath: options.mode === 'development ' ? fullDevServerUrl + 'fonts' : '',
                            },
                        },
                    ],
                },
            ]
        },
        plugins      : [
            new HtmlWebpackPlugin({
                title    : 'Webpack React',
                template : __dirname + '/src/index.html',
                filename : "index.html",
                inject   : 'body',
                favicon  : "./src/assets/favicon.png"
            })
        ]
    };
};