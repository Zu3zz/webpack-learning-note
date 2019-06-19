# babel 用来将es6的代码进行转化

* 安装需要的包 `yarn add babel-loader @babel/core @babel/preset-env @babel/polyfill @babel/plugin-transform-runtime @babel/runtime`

* 并且在webpack.config.js中添加规则如下

* polyfill会产生全局污染的情况 使用transform-runtime可以形成闭包 避免污染

  ```javascript
  rules: [{
    test: /\.js$/,
    exclude: /node_modules/,
    // babel-loader只是babel和webpack之间的一个桥梁
    loader: 'babel-loader',
    options: {
      // 还需要@babel/preset-env进行js版本转化
      presets: [['@babel/preset-env', {
        target: {
          chrome: "67",
        },
        // 配置了这个选项之后 polyfill只编译自己所用到的
        // 不用每次所有ES6语法都自己实现一遍
        useBuiltIns: 'usage'
      }]]
    }
  }]
  // options还可以进行如下配置
  // 使用提供的@babel/runtime
  options: {
    "plugins": [["@babel/plugin-transform-runtime", {
      // "corejs": false一般把false写成2
      // 需要额外安装一个包 @babel/runtime-corejs2
      "corejs": 2,
      "helpers": true,
      "regenerator": true,
      "useESModules": false
    }]]
  }
  ```

* 为了方便起见 可以将webpack.config.js中所有关于options的直接拿出来 放到.babelrc中
  * 此时.babelrc文件内容如下所示

  ```javascript
  {
    "plugins": [["@babel/plugin-transform-runtime", {
      "corejs": 2,
      "helpers": true,
      "regenerator": true,
      "useESModules": false
    }]]
  }
  ```
