# loaders的使用方式和技巧

1. rules里面是一个数组，每个数组的元素是一个对象，可配置对象分别为test、use等
2. test中填写需要校验的文件格式。
3. iconfont字体文件中 test中需要对.eot .woff .svg .ttf格式的文件进行检验
4. 其余类型的 如scss文件等 就需要对.scss的文件进行打包
5. 如果遇到图片格式的文件，那么就需要对.jpg .png .gif格式的文件进行打包
6. 对于use use所对应的是一个数组 数组中分别需要一个对象，第一个对象是loader。用来申明所需要的loader具体是什么 常用的loader下面有列举
7. loader下还需要声明该loader所需要的一些配置参数

### 共有一下几种常见loader

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