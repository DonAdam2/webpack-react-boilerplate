// the following 2 lines is to merge common webpack configurations with this file
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const autoprefixer      = require('autoprefixer');

const {port} = require('./constants');



module.exports = (env, options) => {
    return merge(common(env, options), {
        // will return the original source code (build speed: medium, rebuild speed: fast)
        // source mappings are very useful for debugging
        devtool      : "cheap-module-eval-source-map",
        module       : {
            rules : [
                {
                    test    : /\.s?[ac]ss$/,
                    exclude : /node_modules/,
                    use     : [
                        {
                            // insert styles in the head of the HTML as style tags or in blob links
                            loader : "style-loader",
                            options: {
                                // used for debugging the app (to see from which component styles are applied)
                                sourceMap: true,
                            },
                        },
                        {
                            loader  : "css-loader",
                            options : {
                                sourceMap: true,
                                // Number of loaders applied before CSS loader (which is postcss-loader)
                                importLoaders  : 2,
                                // the following is used to enable CSS modules
                                modules        : true,
                                // unique name of generated selectors
                                localIdentName : '[name]__[local]__[hash:base64:5]'
                            }
                        },
                        {
                            loader  : "postcss-loader",
                            options : {
                                ident   : 'postcss',
                                sourceMap: true,
                                plugins : [
                                    autoprefixer({
                                        browsers : [
                                            "ie >= 11",
                                            "last 2 versions"
                                        ]
                                    })
                                ]
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                    ]
                }
            ]
        },
        devServer    : {
            // CORS :: https://github.com/webpack/webpack-dev-server/issues/533
            headers            : {
                'Access-Control-Allow-Origin'  : '*',
                'Access-Control-Allow-Methods' : 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
                'Access-Control-Allow-Headers' : 'X-Requested-With, content-type, Authorization',
            },
            port               : port,
            // important for navigating to the app using browser (if you use any route other than /)
            historyApiFallback : true,
        },
    });
};