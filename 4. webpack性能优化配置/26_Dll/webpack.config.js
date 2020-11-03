/*
  dll 将指定第三方库只需要打包一次，后面打包会过滤掉，不再需要再打包
*/
const path = require('path');
// 引入html插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// Webapck自带插件，处理dll
const webpack = require('webpack');
// 添加静态资源插件
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

module.exports = {
  // 入口
  entry: './src/js/index.js',

  // 输出
  output:{
    filename: 'js/biuld.js',
    path: path.resolve(__dirname, "build"),
  },

  // loader
  module:{
    rules:[

    ]
  },

  // plugins
  plugins:[

    new HtmlWebpackPlugin({
      template:'./src/index.html'
    }),

    // 告诉webpack哪些库不参与打包，同时使用时名称也得变
    new webpack.DllReferencePlugin({
      // 指定manifest文件
      manifest: path.resolve(__dirname,'dll/manifest.json')
    }),

    // 将指定的静态文件打包输出，并在html中自动引入该资源（也可以手动去引用，这个自动引用更方便）
    new AddAssetHtmlWebpackPlugin({
      // 引入之前打包好的jquery.js
      filepath: path.resolve(__dirname,'dll/jquery.js')
    })

  ],

  // 模式
  mode: 'production'
}