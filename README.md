## webpack learning note

* loaders

1. rules里面是一个数组，每个数组的元素是一个对象，可配置对象分别为test、use等
2. test中填写需要校验的文件格式。
3. iconfont字体文件中 test中需要对.eot .woff .svg .ttf格式的文件进行检验
4. 其余类型的 如scss文件等 就需要对.scss的文件进行打包
5. 如果遇到图片格式的文件，那么就需要对.jpg .png .gif格式的文件进行打包
6. 对于use use所对应的是一个数组 数组中分别需要一个对象，第一个对象是loader。用来申明所需要的loader具体是什么 常用的loader下面有列举
7. loader下还需要声明该loader所需要的一些配置参数

# 共有一下几种常见loader

1. file-loader
   * icon-font字体打包
2. css-loader
   * 打包css
3. scss-loader
   * 打包scss
4. url-loader
   * 用来打包图片gif等
5. style-loader
   * 配合scss使用 用于打包css样式
6. postcss-loader
   * 配合scss使用
   * 777

  ```javascript
  module: {
    rules:[{
      test: /\.(png|jpg|gif)$/,
      use: [{
        loader: 'url-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'images/',
          limit: 2048
        }
      }]
    },{
      test: /\.(eot|svg|ttf|woff)$/,
      use: [{
        loader: 'file-loader'
      }]
    },{
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              // modules: true
            }
          },
          'sass-loader',
          'postcss-loader'
        ]
    }]
  }

  ```


* plugins 在打包过程的节点中 进行一些操作 需要使用plugins

1. html-webpack-plugin
   如果把dist目录删除 那么可以通过这个插件 在所有文件打包结束之后，自动生成dist目录 并且生成index.html文件 并通过引入bundle.js文件 这样可以正常启动项目
2. clean-webpack-plugin
   **已更新到v2版本 配置更加简单**
   详细配置参考github
   在打包之前自动删除webpack output path下的文件中的内容

* sourceMap

1. 关闭打开sourceMap 在webpack.config.js中进行如下配置

   ```javascript
   devtool: 'none'
   ```

2. 用途

* 用来查看报错的具体文件信息 sourceMap本质上是一个映射关系 如果需要打开的话直接在webpack.config.js中进行如下配置即可
  
  ```javascript
  devtool: 'source-map'
  ```

* sourceMap会使得打包速度变慢 因为需要进行映射关系的打包

3.source-map的不同前缀
参考文献:
[1.segmentfalut](https://segmentfault.com/a/1190000008315937)

  * inline: 可以将原本存放映射关系的文件[name].[bundle].js.map中的内容 编码成一个base64的字符串 以整行的形式存放在[name].[bundle].js的结尾 能够一定程度上提高webpack打包的速度
  
  * cheap: 不同于没有cheap的sourceMap 对于错误的出现 可以只精确到具体的哪一行 不用精确到哪一列 所以可以有效的提高webpack的打包速度

  * module: sourceMap只负责业务逻辑代码与最后打包文件之间的关系映射 如果添加了module选项 那么webpack会对其他一些第三方模块如loader等也进行打包处理，这一选项会减慢webpack的打包速度

  * eval: 速度形式最快的打包方法 通过javascript函数中的eval函数 直接映射到打包文件中进行输出

  * 常用配置: cheap-module-eval-source-map 打包速度快 并且报错比较齐全

4. 关于mode的切换问题
    * 对于开发环境中的项目 需要将开发环境切换至开发模式

    ```javascript
    mode: 'development',
    devtool: 'cheap-module-eval-source-map'
    ```
  
    * 在生产环境中 推荐使用

    ```javascript
    mode: 'production',
    devtool: 'cheap-module-source-map'
    ```

5. webpack-dev-server

   ```javascript
   devServer: {
      contentBase: './dist',
      open: true,
      port: 8080
    }
   ```

   * 也可以直接使用express+webpackDevMiddleWare配合使用 启一个属于自己的服务器
   * 在根目录下创建server.js文件 并且在package.json中配置相关命令
  
    ```javascript
    const express = require('express');
    const webpack = require('webpack');
    const webpackDevMiddleWare = require('webpack-dev-middleware');
    const config = require('./webpack.config.js');
    const compiler = webpack(config);

    const app = express();
    app.use(webpackDevMiddleWare(compiler, {
      // publicPath: config.output.publicPath
    }))

    app.listen(3000, () => {
      console.log('server is running');
    })
    ```