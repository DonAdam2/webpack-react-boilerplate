const path = require('path'),
  //plugins
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  EsLintPlugin = require('eslint-webpack-plugin'),
  postcssPresetEnv = require('postcss-preset-env'),
  //constants
  {
    devServer,
    jsSubDirectory,
    isCssModules,
    metaInfo: { title, description, keywords },
  } = require('./constants'),
  { publicDirPath, srcPath, outputSrcPath, jestPath } = require('./paths');

module.exports = (env, options) => {
  // the mode variable is passed in package.json scripts (development, production)
  const isDevelopment = options.mode === 'development';

  return {
    entry: `${srcPath}/index.jsx`,
    output: {
      path: outputSrcPath,
      // hashes are very important in production for caching purposes
      filename: jsSubDirectory + 'bundle.[contenthash:8].js',
      // used for the lazy loaded component
      chunkFilename: jsSubDirectory + '[name].[contenthash:8].js',
      publicPath: '/',
      assetModuleFilename: (pathData) => {
        //allows us to have the same folder structure of assets as we have it in /public
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
      // declaring aliases to reduce the use of relative path
      alias: {
        '@/jest': jestPath,
        '@/js': `${srcPath}/js`,
        '@/scss': `${srcPath}/scss`,
        '@/public': publicDirPath,
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            // This is a feature of `babel-loader` for webpack (not Babel itself).
            // It enables caching results in ./node_modules/.cache/babel-loader/
            // directory for faster rebuilds.
            cacheDirectory: true,
            cacheCompression: false,
            compact: !isDevelopment,
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
                        localIdentContext: srcPath,
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
                    postcssPresetEnv({
                      stage: 3,
                      //uncomment the following if you want to prefix grid properties
                      // autoprefixer: { grid: true },
                    }),
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
        template: `${publicDirPath}/index.html`,
        filename: 'index.html',
        inject: 'body',
        favicon: `${publicDirPath}/assets/images/favicon.png`,
        meta: {
          title,
          description,
          keywords,
          //coming from scripts/start.js file
          ...(isDevelopment && { url: `${devServer}:${options.port}` }),
          'apple-mobile-web-app-capable': 'yes',
          'mobile-web-app-capable': 'yes',
        },
      }),
    ],
  };
};
