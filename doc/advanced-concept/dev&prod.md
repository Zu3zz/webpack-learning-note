# development和production模式的区分打包

* dev环境
  * source-map在development中比较重要 因为需要看出代码的问题所在
  * dev环境中不需要进行压缩
* prod环境
  * 而source-map在prod中用处没那么大 因为项目已经上线
  * prod环境中 通常需要压缩代码

## 如何进行开发环境下的切换

* 此时 可以再新建一个webpack.common.js用来存放dev和prod中相同的配置 代码如下

  ```js // webpack.common.js
  const path = require('path')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const CleanWebpackPlugin = require('clean-webpack-plugin')

  module.exports = {
    entry: {
      main: './src/index.js'
    },
    module: {
      rules: [...]
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
      path: path.resolve(__dirname, 'dist')
    }
  }
  ```

* 安装一个插件 webpack-merge用来合并webpack配置

* 将webpack.config.js重命名为webpack.dev.js
  * 在package.json中添加新的scripts命令

    `"dev": "webpack-dev-server --config webpack.dev.js"`

    此时webpack.dev.js配置如下

  ```js
  const webpack = require('webpack')
  const merge = require('webpack-merge')
  const commonConfig = require('./webpack.common')

  const devConfig = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
      contentBase: './dist',
      open: true,
      port: 8080,
      hot: true
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ],
    optimization: {
      usedExports: true
    }
  }

  module.exports = merge(commonConfig, devConfig)
  ```

* 新建一个webpack.prod.js用作开发环境下的配置
  * prod.js中不需要webpack devServer再生成一个服务器 可以直接去掉
  * 在package.json中添加新的scripts命令
  `"build": "webpack --config webpack.prod.js"`
  * HMR的插件也可以去掉
  * optimize也可以去掉
  * 完整配置如下

  ```js
  // 此时webpack.prod.js中只剩下如下代码
  const webpack = require('webpack')
  const merge = require('webpack-merge')
  const commonConfig = require('./webpack.common')

  const prodConfig = {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  }

  module.exports = merge(commonConfig, prodConfig)
  ```
