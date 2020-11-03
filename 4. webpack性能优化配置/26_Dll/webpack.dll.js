/*
  dll 将指定第三方库只需要打包一次，后面打包会过滤掉，不再需要再打包
  默认打包 webpack会使用 webpack.config.js 配置
  webpack.dll.js 需要指定配置文件打包，如下：

  webpack --config webpack.dll.js

*/
const path = require('path');
const webpack = require('webpack');

module.exports = {
  // 打包入口
  entry: {
    // jquery --> 最终打包生成的文件名
    // ['jquery'] --> 要打包的库是jquery
    jquery: ['jquery']
  },

  // 输出
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname,'dll'),
    // 打包的库里面向外暴露出去的内容叫什么名字，使用的时候也需要用这个名字
    library: '[name]_[hash:10]' 
  },

  // 插件
  plugins: [
    // 使用webpack自带的 dll打包插件
    new webpack.DllPlugin({
      // 映射库的暴露的内容名称，和上面一定要一样，不然就会无法使用
      name: '[name]_[hash:10]',
      // 输出文件路径
      // manifest.json 保存了库的映射信息
      path:path.resolve(__dirname,'dll/manifest.json')
    })
  ],

  // 模式
  mode: 'production'
}
