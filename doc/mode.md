# 关于mode的切换问题

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
