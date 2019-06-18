# sourceMap

1. 关闭打开sourceMap 在webpack.config.js中进行如下配置

   ```javascript
   devtool: 'none'
   ```

2. sourceMap用途

* 用来查看报错的具体文件信息 sourceMap本质上是一个映射关系 如果需要打开的话直接在webpack.config.js中进行如下配置即可
  
    ```javascript
    devtool: 'source-map'
    ```

* sourceMap会使得打包速度变慢 因为需要进行映射关系的打包

3. source-map的不同前缀 参考文献: [1.segmentfalut](https://segmentfault.com/a/1190000008315937)

* inline: 可以将原本存放映射关系的文件[name].[bundle].js.map中的内容 编码成一个base64的字符串 以整行的形式存放在[name].[bundle].js的结尾 能够一定程度上提高webpack打包的速度
  
* cheap: 不同于没有cheap的sourceMap 对于错误的出现 可以只精确到具体的哪一行 不用精确到哪一列 所以可以有效的提高webpack的打包速度
* module: sourceMap只负责业务逻辑代码与最后打包文件之间的关系映射 如果添加了module选项 那么webpack会对其他一些第三方模块如loader等也进行打包处理，这一选项会减慢webpack的打包速度

* eval: 速度形式最快的打包方法 通过javascript函数中的eval函数 直接映射到打包文件中进行输出

* 常用配置: cheap-module-eval-source-map 打包速度快 并且报错比较齐全
