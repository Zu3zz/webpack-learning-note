const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: {
    main: './src/index.js'
  },
  devServer: {
    contentBase: './dist',
    open: true,
    port: 8080,
    hot: true,
    hotOnly: true,
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.(png|jpg|gif)$/,
      use: [{
        loader: 'url-loader',
        options: {
          name: '[name]_[hash].[ext]',
          outputPath: 'images/',
          limit: 2048
        }
      }]
    }, {
      test: /\.(eot|svg|ttf|woff)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      }]
    }, {
      test: /\.scss$/,
      use: [
        'style-loader', {
          loader: 'css-loader',
          options: {
            importLoaders: 2
            // modules: true
          }
        },
        'sass-loader',
        'postcss-loader'
      ]
    }, {
      test: /\.css?$/,
      use: [
        'style-loader',
        'css-loader',
        'postcss-loader'
      ]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    usedExports: true
  },
  output: {
    // publicPath: '/',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}