const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: {
    lodash: './src/lodash.js',
    main: './src/index.js'
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
    new CleanWebpackPlugin()
  ],
  output: {
    // publicPath: '/',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist')
  }
}