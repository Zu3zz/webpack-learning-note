# webpack 和 code splitting

* 首先安装lodash
  `yarn add lodash`
  * 为了防止lodash打包过大 单独创建一个文件（假设 在webpack.common.js中添加如下配置

  ```js
  // 这是/src/lodash.js文件
  import _ from 'lodash'
  ```

  ```js
  // 这是webpack.common.js
  entry: {
    lodash: './src/lodash.js',
    main: './src/index.js'
  }
  ```

  * 这样就可以不用顾忌引入的包过大 在index.js中只专注于业务逻辑即可
