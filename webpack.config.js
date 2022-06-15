const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const PATH = {
  source: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'app'),
};

const MODE = process.env.NODE_ENV;

module.exports = {
  mode: MODE,
  watch: MODE === 'development',
  devtool: MODE === 'production' ? '' : 'inline-source-map',
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
      name: false,
    },
  },
  entry: {
    background: `${PATH.source}/background/app.js`,
    content: `${PATH.source}/content/app.js`,
  },
  output: {
    path: PATH.build,
    filename: '[name]/bundle.js'
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
      '@': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  corejs: 3,
                  targets: {
                    browsers: [
                      'last 5 Chrome versions',
                      'last 5 firefox versions',
                    ],
                  },
                  useBuiltIns: 'usage',
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|eot|svg|otf|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 500000,
        },
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([{ from: 'static' }], { ignore: ['manifests/**/*'] }),
    new MiniCssExtractPlugin({ filename: '[name]/styles.css' }),
    new LodashModuleReplacementPlugin({
      collections: true,
      paths: true,
    }),
    // ...prodPlugins,
  ]
};