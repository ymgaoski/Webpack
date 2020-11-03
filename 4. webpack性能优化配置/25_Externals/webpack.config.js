/*
  externals 指定哪些第三方库不需要打包，从打包中排除掉
    注：排除掉第三方库后，记得在html引入在线的第三方库，不然代码就找不到这个库了了，推荐使用BootCDN上的地址，注意版本号要一样
*/
const path = require('path');
// 引入html插件
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    // 默认不配置的话会自动创建一个 index.html 空页面，然后将index.js里面所引入的资源都引入到这个空的html中，然后打包生成到指定的build目录
    // 可以使用template指定自己写的的html页面，打包时它会先复制一份指定的html页面，然后才再资源引入到那个html中
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    })
  ],

  // 模式
  mode: 'production',

  // 排除不需要打包的库
  externals: {
    // 忽略库名(import后面的那个名字): 外部引入的全局变量名(jQuery代码中全局变量)
    // 下面的意思是将 在引入 jquery 这个库的地方替换成 外部的引入的jQuery全局变量
    jquery: 'jQuery'
  }
}