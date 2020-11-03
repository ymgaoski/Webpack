/*
  loader: 1、下载   2、使用（配置）
  plugins:  1、下载   2、引入   3、使用（配置）

  // 安装html插件
  cnpm i html-webpack-plugin -D
*/
const path = require('path');
// 引入html插件
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 入口
  entry: './src/index.js',
  // 输出
  output:{
    filename: 'biuld.js',
    path: path.resolve(__dirname, "build"),
  },
  // loader
  module:{
    rules:[

    ]
  },
  // plugins
  plugins:[
    // 默认不配置的话会自动创建一个 index.html 空页面，然后将index.js里面所引入的资源都引入到这个空的html中，然后打包生成到指定的build目录
    // 可以使用template指定自己写的的html页面，打包时它会先复制一份指定的html页面，然后才再资源引入到那个html中
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    })
  ],
  // 模式
  mode: 'development' // production
}