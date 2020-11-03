
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // 入口
  entry:'./src/index.js',

  // 输出
  output:{
    // 输出的文件名+目录
    filename: 'js/[name].js',
    // 所有资源打包后的公共目录，都是放到这个目录下
    path: path.resolve(__dirname,'build'),
    // 公共路径，将会在所有引入地址前加上下面的路径，如 img/a.jpg -> ./img/a.jpg
    publicPath: './',
    // 非入口chunk文件的命名，import 和 optimization 可以生成非入口chunk文件
    chunkFilename: 'js/[name]_chunk.js',
    // 整个库向外暴露的变量名, 打包后的main文件会赋值给 main 变量，因为main是默认的chunk名
    library: '[name]',
    // 上面的变量添加到哪上面
    // "var" | "assign" | "this" | "window" | "self" | "global" | "commonjs" | "commonjs2" | "commonjs-module" | "amd" | "amd-require" | "umd" | "umd2" | "jsonp" | "system"
    libraryTarget: 'window',  // 添加到window属性上
  },

  // 插件
  plugins:[
    // 不配置template默认会生成一个html
    new HtmlWebpackPlugin()
  ],

  // 模式
  mode: 'development'

}