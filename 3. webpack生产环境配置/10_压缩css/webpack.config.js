/**
 * 压缩css (去掉各种换行符，多于的空格，让代码变成一行)
 * 
 * 需要用到一个插件:
 * cnpm i optimize-css-assets-webpack-plugin -D
 * 
 * */

const path = require('path');
// 引入插件
// html处理插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// css单独提取插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// css压缩插件
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

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
      // scss的配置
      {
        test: /\.scss$/,
        use:[
          // 'style-loader',
          // css单独提取插件loader，需要替换掉之前的 style-loader
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          // 配置postcss-loader
          {
            loader: 'postcss-loader',
            options:{
              ident: 'postcss',
              // postcss的插件
              plugins: () => [
                require('postcss-preset-env')()
              ]
            }
          }
        ]
      }
    ]
  },

  // 模式
  mode: 'production',

  // 插件配置
  plugins:[
    // html处理插件
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    // css单独提取插件
    new MiniCssExtractPlugin({
      // 对输出的css文件进行重命名与归档文件夹
      filename: 'css/build.css'
    }),
    // css压缩插件
    new OptimizeCssAssetsWebpackPlugin()
  ]
}