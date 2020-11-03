
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
        use:['style-loader','css-loader']
      },
      {
        test: /\.js$/,
        // 单个loader
        loader:'eslint-loader',
        // 优先执行 post 延后执行，默认是中间执行
        enforce: 'pre',
        // 排除node_modules 下的js文件
        exclude: /node_modules/,
        // 只检查 src 下的js文件
        include: path.resolve(__dirname,'src'),
        // 选项
        options:{}
      },
      {
        // 里面配置的loader，只执行一次，一但匹配就不往下执行了
        oneOf:[
          
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
  mode: 'development'

}