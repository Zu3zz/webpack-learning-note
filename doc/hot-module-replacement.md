# Hot Module Replace 的用法

## 如果页面样式变动 那么页面会重新被刷新 所以需要HMR来只改变页面上的样式css 样式总体布局不变

* 需要在webpack.config.js中做如下配置

  ```js
  devServer: {
    contentBase: './dist',
    open: true,
    port: 8080,
    // hot为true就是打开了HMR
    hot: true,
    // 如果HMR失效 false的时候页面会被刷新
    hotOnly: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new CleanWebpackPlugin(),
    // 同时需要新加一个webpack自带的plugin
    new webpack.HotModuleReplacementPlugin()
  ]
  ```

* 为了引入一个js模块时保证页面模块的热加载 需要添加代码如下 vue react中已经内置了HMR的实现

  ```javascript
  import xxx from './xxx.js'
  // 执行相应的方法
  xxx();
  if(module.hot) {
    module.hot.accept('./xxx', () => {
      document.body.removeChild(document.getElementById('xxx'))
      xxx();
    })
  }
  ```
