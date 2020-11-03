/**
 * entry  入口，有以下三种配置模式
 *    1: String   --> './src/index.js' ，
 *       单入口 
 *       打包只生成一个chunk,输出一个bundle文件，此时默认的chunk名称为 main
 * 
 *    2: Array  --> ['./src/index.js','./src/index.html']
 *      多入口
 *      主要用于开发模式开启了HRM功能后，解决html无法热加载的问题
 *  
 *    3: Object
 *      多入口
 *      有几个入口文件就会生成几个chunk，可以打包成多个文件
 *      此时chunk的名称是 key
 *      entry: {
          index: './src/index.js',
          sum: './src/sum.js'
        }
 */
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // 单入口
  // entry:'./src/index.js',
  // 多入口
  // entry:['./src/index.js','./src/sum.js'],
  // 多入口
  entry: {
    index: './src/index.js',
    sum: './src/sum.js'
  },

  // 输出
  output:{
    filename: '[name].js',
    path: path.resolve(__dirname,'build')
  },

  // 插件
  plugins:[
    // 不配置template默认会生成一个html
    new HtmlWebpackPlugin()
  ],

  // 模式
  mode: 'development'

}