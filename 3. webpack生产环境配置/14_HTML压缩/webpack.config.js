/**
 * HTML压缩
 * 使用 html-webpack-plugin 插件进行压缩配置
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
      template: './src/index.html',

      // HTML压缩配置（新版本不配置，在生产模式下默认已经开启了压缩）
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true
      }
    })
  ],

  // mode
  mode: 'production'
}