/**
 * devServer （自动化服务，修改完源码一保存就会 自动编译，自动打开浏览器，自动刷新浏览器）
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
  mode: 'development',

  // devServer配置，它不属于webpack的5大核心
  // 需要安装 webpack-dev-server
  // 安装：cnpm i webpack-dev-server -D
  // 启动命令：npx webpack-dev-server 注：只会在内存中编译打包，不会输出到build目录，webpack命令就会输出
  // 因为这个命令没有全局安装，所有需要用 npx 来启动，像 webpack 命令就不需要npx，因为它是全局安装的
  devServer: {
    // 项目构建后的目录路径
    contentBase: path.resolve(__dirname,'build'),
    // 启用gzip压缩
    compress: true,
    // 端口号
    port: 8001,
    // 自动打开浏览器
    open: true
  }
}