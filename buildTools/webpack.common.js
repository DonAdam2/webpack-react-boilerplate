const path = require('path'),
  //used to check if the given file exists
  fs = require('fs'),
  //dotenv
  dotenv = require('dotenv'),
  //plugins
  { DefinePlugin } = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  EsLintPlugin = require('eslint-webpack-plugin'),
  //constants
  {
    port,
    devServer,
    jsSubDirectory,
    isCssModules,
    metaInfo: { title, description, url, keywords },
  } = require('./constants'),
  PATHS = require('./paths'),
  fullDevServerUrl = `${devServer}:${port}`;

module.exports = (env, options) => {
  // the mode variable is passed in package.json scripts (development, production)
  const isDevelopment = options.mode === 'development',
    /*================ setup environments variables ===================*/
    // create a fallback path (the production .env)
    basePath = `${PATHS.environments}/.env`,
    // concatenate the environment name to the base path to specify the correct env file!
    envPath = `${basePath}.${options.mode}`,
    // check if the file exists, otherwise fall back to the production .env
    finalPath = fs.existsSync(envPath) ? envPath : basePath,
    // set the path parameter in the dotenv config
    fileEnv = dotenv.config({ path: finalPath }).parsed,
    // create an object from the current env file with all keys
    envKeys = Object.keys(fileEnv).reduce((prev, next) => {
      prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
      return prev;
    }, {});
  /*================ finish setup environments variables ===================*/

  return {
    entry: `${PATHS.src}/index.js`,
    output: {
      // __dirname is the absolute path to the root directory of our app
      path: PATHS.outputSrc,
      // hashes are very important in production for caching purposes
      filename: jsSubDirectory + 'bundle.[contenthash:8].js',
      // used for the lazy loaded component
      chunkFilename: jsSubDirectory + '[name].[contenthash:8].js',
      publicPath: '/',
      assetModuleFilename: (pathData) => {
        //allows us to have the same folder structure of assets as we have it in /src
        const filepath = path.dirname(pathData.filename).split('/').slice(1).join('/');
        return `${filepath}/[name].[hash][ext][query]`;
      },
    },
    optimization: {
      // used to avoid duplicated dependencies from node modules
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            enforce: true,
            chunks: 'all',
          },
        },
      },
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
      // declaring alias for reducing the use of relative path
      alias: {
        '@/js': `${PATHS.src}/js`,
        '@/scss': `${PATHS.src}/scss`,
        '@/img': `${PATHS.src}/assets/images`,
        '@/jest': PATHS.jest,
      },
    },
    module: {
      rules: [
        {
          test: /\.js|jsx$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: { cacheDirectory: true },
          },
        },
        {
          test: /\.(jpe?g|svg|png|gif|ico|eot|ttf|woff2?)(\?v=\d+\.\d+\.\d+)?$/i,
          type: 'asset/resource',
        },
        {
          test: /\.s?[ac]ss$/,
          //removed (exclude: /node_modules/) to enable using external styles
          use: [
            {
              // style-loader => insert styles in the head of the HTML as style tags or in blob links
              // MiniCssExtractPlugin => extract styles to a file
              loader: isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
              //if source map is set to true from previous loaders => this loader will be true as well
            },
            {
              //Resolves @import statements
              loader: 'css-loader',
              options: {
                // used for debugging the app (to see from which component styles are applied)
                sourceMap: isDevelopment,
                // Number of loaders applied before CSS loader (which is postcss-loader)
                importLoaders: 3,
                // the following is used to enable CSS modules
                ...(isCssModules
                  ? {
                      modules: {
                        //exclude external styles from css modules transformation
                        auto: (resourcePath) => !resourcePath.includes('node_modules'),
                        mode: (resourcePath) => {
                          if (/global.scss$/i.test(resourcePath)) {
                            return 'global';
                          }

                          return 'local';
                        },
                        localIdentName: isDevelopment ? '[name]_[local]' : '[contenthash:base64]',
                        localIdentContext: PATHS.src,
                        localIdentHashSalt: 'react-boilerplate',
                        exportLocalsConvention: 'camelCaseOnly',
                      },
                    }
                  : {}),
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  ident: 'postcss',
                  plugins: [
                    'postcss-flexbugs-fixes',
                    [
                      'postcss-preset-env',
                      {
                        autoprefixer: {
                          flexbox: 'no-2009',
                        },
                        stage: 3,
                      },
                    ],
                    // Adds PostCSS Normalize as the reset css with default options,
                    // so that it honors browserslist config in package.json
                    // which in turn let's users customize the target behavior as per their needs.
                    'postcss-normalize',
                  ],
                },
                sourceMap: isDevelopment,
              },
            },
            {
              //Rewrites relative paths in url() statements based on the original source file
              loader: 'resolve-url-loader',
              options: {
                //needs sourcemaps to resolve urls (images)
                sourceMap: true,
              },
            },
            {
              //Compiles Sass to CSS
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
      new EsLintPlugin({
        extensions: ['.js', '.jsx', '.json'],
      }),
      new HtmlWebpackPlugin({
        title,
        template: `${PATHS.src}/index.html`,
        filename: 'index.html',
        inject: 'body',
        favicon: `${PATHS.src}/assets/images/favicon.png`,
        meta: {
          description,
          keywords,
          url: isDevelopment ? fullDevServerUrl : url,
          'apple-mobile-web-app-capable': 'yes',
          'mobile-web-app-capable': 'yes',
        },
      }),
      new DefinePlugin(envKeys),
    ],
  };
};
