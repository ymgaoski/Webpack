/**
 * JS兼容性处理（ES6 转 ES5）：babel-loader @babel/core
 *  安装到开发环境： cnpm i babel-loader @babel/core @babel/preset-env @babel/polyfill -D
 * 
 *  1:基本JS兼容性处理 --> @babel/preset-env (预设插件)
 *    打包后文件大小：4KB
 *    问题：只能转换基本的语法，如promise高级语法不能转换
 *  
 *  2:全部JS兼容处理 -->> @babel/polyfill
 *    打包后文件大小：418KB
 *    使用：直接在入口JS引入 import '@babel/polyfill' 无需配置
 *    问题：将所有ES6的特殊语法全部转换成ES5的实现，导致打包文件过大，不能按需加载
 *  
 *  3:按需处理JS兼容性  -->> core-js
 *    安装到生产环境（打包成生产环境后会引用到core-js的js文件）：cnpm i core-js --save
 *    打包后文件大小：113KB
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  // 入口
  entry: './src/js/index.js',

  // 输出
  output:{
    filename: 'build.js',
    path: path.resolve(__dirname,'build')
  },

  // loader
  module:{
    rules:[
      {
        test: /\.js$/,
        // 排除第三方库文件
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          //　自动修复eslint错误,修复的不是构建后的，是自己的源代码
          fix: true,
          /**
           * 当一个文件被多个loader处理的时候，要指定执行顺序
           * eslint 要比 babel 先执行，因为es6语法转换成es5后，如 var 变量会提示不好用
           */
        },
        // 优先执行, post 延迟执行
        enforce: 'pre'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          // 预设：指示babel做怎么样的兼容性处理
          presets: [
            [
              '@babel/preset-env',
              // core-js 配置
              {
                // 按需加载
                useBuiltIns: 'usage',
                // 指定core-js版本
                corejs: {
                  version: 3
                },
                // 指定兼容性做到哪个版本浏览器
                targets: {
                  chrome: '60',
                  firefox: '50',
                  ie: '9',
                  safari: '10',
                  edge: '17'
                }
              }
            ]
          ]
        }
      }
    ]
  },

  // plugins
  plugins:[
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],

  // mode
  mode: 'production'
}