/**
 * CdoeSplit  代码分割
 * 
 * 三种方案（可以组合使用）：
 *    1：多入口
 *       将用到的JS在入口配置中配置，会将配置的几文件打包成多个文件
 *       缺点就是麻烦，每次有新增的都需要修改，现在一般都是单页面单入口，对node_modules中的插件无法分割
 *       还有就是如果2个JS中引入同一个node_modlues插件，这个插件会同时打包到两个js文件中，配合方案2可以解决
 * 
 *    2：配置optimization中的splitChunks
 *        可以将所有用到node_modules中的插件单独打包一个chunk输出
 *        能自动分析多入口chunk中有没有公共的文件，如果有就会单独提取出来打包一个chunk输出
 *      
 *    3：JS动态引入
 *        使用promise的方式引入其它js文件，能实现对这个引用文件的单独打包
 */

// NodeJS路径处理模块 
const path = require('path');
// HTML处理插件
const HtmlWebpackPlugin = require('html-webpack-plugin');

// webpack配置
module.exports = {
  // 单入口
  // entry: './src/js/index.js',
  // 多入口
  entry:{
    main: './src/js/index.js',
    test: './src/js/test.js'
  },

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
