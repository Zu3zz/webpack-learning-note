# plugin用法

* plugins 在打包过程的节点中 进行一些操作 需要使用plugins

1. html-webpack-plugin
   如果把dist目录删除 那么可以通过这个插件 在所有文件打包结束之后，自动生成dist目录 并且生成index.html文件 并通过引入bundle.js文件 这样可以正常启动项目
2. clean-webpack-plugin
   **已更新到v2版本 配置更加简单**
   详细配置参考github
   在打包之前自动删除webpack output path下的文件中的内容
