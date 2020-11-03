/**
 * css单独提取插件
 * cnpm i mini-css-extract-plugin -D
 * 
 * 不用插件之前：之前css是保存在js中的，如果js文件过大，页面请求的时候样式可能会出现闪现，体验不好
 * 用插件后：将css字符串单独提取到css文件中，这样js和css就分离了，页面加载也不会出现闪现的问题了，因为样式一般都很小一下就加载好了
 */
const path = require('path');
// 引入插件
// html处理插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// css单独提取插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // 入口
  entry: './src/js/index.js',

  // 输出
  output: {
    filename: './js/build.js',
    path: path.resolve(__dirname,'build')
  },

  // loader
  module: {
    rules:[
      // css的配置
      {
        test: /\.css$/,
        use:[
          // 'style-loader',
          // css单独提取插件loader，需要替换掉之前的 style-loader
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      // scss的配置
      {
        test: /\.scss$/,
        use:[
          // 'style-loader',
          // css单独提取插件loader，需要替换掉之前的 style-loader
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },

  // 模式
  mode: 'development',

  // 插件配置
  plugins:[
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      // 对输出的css文件进行重命名与归档文件夹
      filename: 'css/build.css'
    })
  ]
}