/**
 * 语法检查 eslink
 * 
 * 需要用到一个插件:
 *  eslint 
 *  eslint-loader
 * 
 * 注意：只检查自己写的源代码，第三方的库不要去检查，需要排除掉
 * 设置检查规则：
 * 
 *  airbnb 比较权威的js语法规则，使用的话需要安装 下面3个插件
 *    eslint-config-airbnb-base 
 *    eslint-plugin-import 
 *    eslint
 *  
 *  在 package.json 中设置 eslintConfig 进行规则配置
   "eslintConfig": {
      // 继承 airbnb-base 的规则
      "extends": "airbnb-base"
    }
 * 
 * 安装命令：
 * cnpm i eslint eslint-loader eslint-config-airbnb-base eslint-plugin-import -D
 * 
 * */

const path = require('path');
// 引入插件
// html处理插件
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
      // eslint-loader配置
      {
        test: /\.js$/,
        // 排除掉 node_modules 不检查
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          //　自动修复eslint错误,修复的不是构建后的，是自己的源代码
          fix: true
        }
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
    })
  ]
}