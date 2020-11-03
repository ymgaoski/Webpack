/**
 * css样式兼容性处理
 * 
 * 需要安装一个loader一个loader的插件:
 * cnpm i postcss-loader postcss-preset-env -D
 * postcss需要读取 package.json中的 browserslit 配置
 * 
 * 如下：
   "browserslist": {
     // 开发环境，要开户开发环境需要设置node的环境变量  process.env.NODE_ENV = 'development'
    "development": [
      // 兼容最后一个chrome的版本
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ],
    // 正式环境，默认是正式环境
    "production": [
      // 全球超过0.2%的人使用的浏览器
      ">0.2%",
      // 兼容IE9及以上
      "not ie <= 9",
      // 不兼容已经死了的浏览器
      "not dead",
      // 不兼容所有的opera浏览器
      "not op_mini all"
    ]
  }
 * */

// 设置node的环境变量为开发环境，默认是 生产环境 production
// process.env.NODE_ENV = 'development';

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
      // scss的配置
      {
        test: /\.scss$/,
        use:[
          // 'style-loader',
          // css单独提取插件loader，需要替换掉之前的 style-loader
          MiniCssExtractPlugin.loader,
          'css-loader',
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
          },
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