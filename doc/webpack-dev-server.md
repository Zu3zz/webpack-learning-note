# webpack-dev-server

## 为了不用每一次改变代码都需要再重新使用 webpack 打包一次 可以使用一下三种方法

1. 在 package.json 文件中配置命令`"watch": "webpack --watch"`
    这样在运行 `yarn run watch`时可以实现自动监听

2. 直接启动`"start":"webpack-dev-server"`可以自动起一个 node 服务 自动刷新 自动打开浏览器等

    ```javascript
    devServer: {
      // 启动的服务器的根路径
      contentBase: './dist',
      // 可以自动打开浏览器
      open: true,
      // vue-cli等脚手架底层proxy原理
      proxy: {
        'api': 'http://localhost:3000'
      },
      port: 8080
    }
    ```

3. 再在 package.json 中创建一个指令`"middleware": "node server.js"`

- 也可以直接使用 express+webpackDevMiddleWare 配合使用 启一个属于自己的服务器
- 在根目录下创建 server.js 文件 并且在 package.json 中配置相关命令

    ```javascript
    const express = require('express');
    const webpack = require('webpack');
    const webpackDevMiddleWare = require('webpack-dev-middleware');
    // 引入webpack当前的配置文件
    const config = require('./webpack.config.js');
    // webpack配置文件 用来做编译的
    const compiler = webpack(config);
    // 启一个express的服务器
    const app = express();
    // 使用中间件
    app.use(webpackDevMiddleWare(compiler, {
      // 用的话需要在webpack.config.js中间配置output下的publicPath
      // publicPath: config.output.publicPath
    }))

    app.listen(3000, () => {
      console.log('server is running');
    })
    ```
