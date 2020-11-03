/**
 * 打包其它资源如 字体，就是将文件原封不动的复制一份过去，不进行任何的转换和压缩
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 入口
  entry: './src/index.js',
  // 输出
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname,'build')
  },
  // loader
  module: {
    rules:[
      {
        test: /.css$/,
        use:[
          'style-loader',
          'css-loader'
        ]
      },
      {
        // 打包其它资源
        // 排除这些以外的文件 为其它资源文件
        exclude: /\.(html|js|json|png|jpg|gif|css|scss)/,
        // 使用 file-loader 打包其它资源文件
        // url-loader 就是比 file-loader 多了个将图片转换成 base64 的功能
        loader: 'file-loader',
        options:{
          // 自定义文件名
          name: '[hash:10].[ext]'
        }
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development'
}