const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleWare = require('webpack-dev-middleware');
const config = require('./webpack.config.js');
const compiler = webpack(config);

const app = express();
app.use(webpackDevMiddleWare(compiler, {
  publicPath: config.output.publicPath
}))

app.listen(3000, () => {
  console.log('server is running');
})