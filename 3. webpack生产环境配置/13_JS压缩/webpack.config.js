/**
 * JS压缩
 * 将mode 设置为 production生产环境模式就会自动开启压缩
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  // 入口
  entry: './src/js/index.js',

  // 输出
  output:{
    filename: 'build.js',
    path: path.resolve(__dirname,'build')
  },

  // loader
  module:{
    rules:[

    ]
  },

  // plugins
  plugins:[
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],

  // mode
  // 使用生产环境模式就会自动开启js压缩
  mode: 'production'
}