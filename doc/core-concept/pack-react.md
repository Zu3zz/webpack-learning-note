# 如何配置React代码的打包

* 使用命令 `yarn add @babel/preset-react`

* 此时.babelrc中 由于要打包的是业务代码 所以可以使用polyfill
  * 首先 安装react的代码 `yarn add react react-dom`
  * 在index.js中添加react代码

  ```javascript
  import React, { Component } from 'react'
  import ReactDom from 'react-dom'

  class App extends Component {
    render() {
      return <div>Hello World</div>
    }
  }

  ReactDom.render(<App />, document.getElementById('root'))
  ```

  * 此时需要在.babelrc中添加如下配置

  ```js
  presets: ["babel/preset-react"]
  ```
