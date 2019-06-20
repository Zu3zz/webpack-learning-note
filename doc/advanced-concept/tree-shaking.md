# Webpack2.0 后的新概念 Tree Shaking

## 只支持 ES Module 模块的引入 可以将没有引入的方法 函数等摇晃掉 避免打包的模块过大

- 在 webpack.config.js 中定义如下

  ```js 
  // webpack.config.js
  // 如果在mode: production中 需要添加如下的配置
  plugins:[
    new xxxxxx,
    new yyyyyy
  ],
  // production中不需要下面的配置选项
  optimization: {
    usedExports: true
  }
  ```

- 同时 需要在package.json中多配置一个选项

  - 添加这个属性是因为有些模块没有导出内容 所以对这种没有导出文件的需要进行特殊设置 比如@babel/polyfill 或者一些css文件

  ```js 
  // package.json
  "sideEffects": false
  // e.g: "sideEffects": ["*.css", "@babel/polyfill"]
  ```

- 在production mode中 tree shaking已经成功把所有没有用到的全部删除
