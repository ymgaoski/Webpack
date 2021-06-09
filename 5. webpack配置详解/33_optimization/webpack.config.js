
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
// webpack 4.26 以上已经换成这个插件压缩JS和CSS了
const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = {
  // 入口
  entry:'./src/index.js',

  // 输出
  output:{
    filename: 'js/[name].[contenthash:10].js',
    path: path.resolve(__dirname,'build'),
    chunkFilename: 'js/[name]_[contenthash:10]_chunk.js'
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

  // 优化
  optimization: {

    // 分割chunk优化
    splitChunks: {
      // 开启 异步sync和非异步async 的chunk优化，默认为 async  
      chunks: 'all',

      // ---- 以下是默认配置

      // 分割chunk最小为30kb
      minSize: 30 * 1000,
      // 最大值，0为不限制
      maxSize: 0,
      // 要提取的chunk最少被引用1次
      minChunks: 1,
      // 按需加载时并行加载的文件最大数量
      maxAsyncRequests: 5,
      // 入口js文件最大并行请求数量
      maxInitialRequests: 3,
      // 名称连接符，如： verndors~xxx.js
      automaticNameDelimiter: '~',
      // 可以使用命名规则
      name: true,
      // 分割chunk组
      cacheGroups: {
        // 分割chunk的组名
        // node_moduels文件会被打包到 vendors 组的chunk中，如：vendors~xxx.js
        // 满足上面的公共规则，如：大小超过30kb,至少被引用一次
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          // 优先级
          priority: -10
        },
        default: {
          // 会覆盖上面的这条规则
          minChunks: 2,
          // 值越小优先级越低
          priority: -20,
          // 如果当前要打包的模块和之前已经被提取的模块是同一个，就会复用，而不是重新打包模块
          reuseExistingChunk: true
        }
      }

    },

    // 解决之前代码分割的一个bug
    // 将当前模块的记录其它模块的hash单独打包为一个文件 runtime
    // 默认 index.js 引用了 sum.js，如果 sum.js一改变，那index.js和sum.js的contenthash都会变
    // 原因：index.js 打包成 main.js 后，需要引用sum.js，main.js中有保存sum.js文件的contenthash，如果当sum.js的contenthash变了，那main.js中的hash肯定也要跟着变，从而导致main.js会重新打包
    // 解决：新增一个runtime中间文件用来关联打包main.js和sum.js，index.html 中会同时引用 runtime和main,main和sum，runtime就没有任何关系了,如果 sum.js有改变只会重新打包 sum.js和 runtime文件
    runtimeChunk: {
      name: entrypoint => `runtime-${entrypoint.name}`
    },

    // 代码压缩配置 
    minimizer: [
      // 配置生产环境压缩方案： js和css
      new TerserWebpackPlugin({
        // 开启缓存 
        cache: true,
        // 开启多进程打包
        parallel: true,
        // 启动source-map
        sourceMap: true
      })
    ]

  }

}