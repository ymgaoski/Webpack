const path = require('path');
const {merge} = require('webpack-merge');
const base = require('./webpack.config.base.js');

// console.log(merge,'merge');

module.exports = merge(base,{
  mode: 'development',

  // 开启SourceMap
  devtool: 'source-map',

  // 开发服务配置
  devServer:{
    // 项目构建后的路径
    contentBase: path.resolve(__dirname,'build'),
    // 端口
    port: 8001,
    // 开启gzip压缩
    compress: true,
    // 自动打开浏览器
    open: true,
    // 开启HMR热更新功能
    hot: true
  }
})