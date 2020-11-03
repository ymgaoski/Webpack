/**
 * Lazy Loading  懒加载
 * 通过 JS import动态引入实现
 */

// NodeJS路径处理模块 
const path = require('path');
// HTML处理插件
const HtmlWebpackPlugin = require('html-webpack-plugin');

// webpack配置
module.exports = {
  // 单入口
  entry: './src/js/index.js',

  // 输出
  output: {
    // [name] 自动获取 entry 配置的(main,test) 做为文件名
    filename: 'js/[name].[contenthash:10].js',
    path: path.resolve(__dirname,'build')
  },

  // loader
  module : {
    rules : [
       
    ]
  },

  // 插件
  plugins: [
    // html处理插件
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

  // 模式
  // 生产环境模式就会自动开启js压缩
  mode: 'production',

  // 配置优化
  optimization: {
    // 开启chunk分割
    splitChunks: {
      chunks: 'all'
    }
  }

}
