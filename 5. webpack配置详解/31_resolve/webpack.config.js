
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // 入口
  entry:'./src/index.js',

  // 输出
  output:{
    filename: 'js/[name].js',
    path: path.resolve(__dirname,'build')
  },
 
  // loader配置
  module: {
    rules:[
      {
        test: /\.css$/,
        // 多个loader
        use:[
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },

  // 插件
  plugins:[
    // 不配置template默认会生成一个html
    new HtmlWebpackPlugin()
  ],

  // 模式
  mode: 'development',

  // 解析模块的规则 
  resolve: {
    // 路径别名，优点可以简写路径，缺点没有提示，容易填错
    alias: {
      $css: path.resolve('src/css')
    },
    // 入口文件的名字，默认找的是index.js
    // mainFiles:[],
    // 配置省略文件后缀名，就是哪里文件import的时候可以不用填后缀，默认配置了 js 和 json
    extensions: ['.js','.json','.css'],
    // 告诉webpack解析模块去找哪个目录，当前目录找不到就会向上找，默认配置的是 node_modules
    // 可以直接配置node_modules的绝对路径，这样它就不用每次一层一层往上找，速度会稍微快点
    modules: [path.resolve(__dirname,'../../node_modules'),'node_modules']
  }

}