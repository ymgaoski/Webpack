/**
 * 环境切换
 *  1、添加 webpack-merge 进行配制文件合并
 *  2、将不同环境配置文件配置到 package.json 中生成 dev 与 prod 
 *  webpack --config webpack.conf.dev.js
 *  webpack --config webpack.conf.prod.js
 * */
const path = require('path');
// 引入html处理插件
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 入口
  entry: ['./src/js/index.js','./src/index.html'],
  // 输出
  output: {
    filename: './js/build.js',
    path: path.resolve(__dirname,'build')
  },
  // loader
  module: {
    rules: [
      // 处理css
      {
        test: /\.css$/,
        // loader的运行顺序是从下向上的
        use:[
          // 将js中的css字符串生成style节点，添加到 html head 的style标签中
          'style-loader',
          // 将css文件使用commonjs模块化的方式加入到js中
          'css-loader'
        ]
      },

      // 处理scss
      {
        test: /\.scss/,
        // 多个loader使用use
        use:[
          'style-loader',
          'css-loader',
          // 上面是默认写法，下面是可配置写法，功能一样
          {
            loader:'sass-loader'
          }
        ]
      },

      // 处理样式文件中的图片
      {
        test: /\.(png|jpg|gif)/,
        // 一个loader可直接使用 loader
        // url-loader 就是在file-loader之上加了个将图片转换成 base64的功能
        loader:'url-loader',
        options:{
          // 10KB以下的图片将转换成 base64
          limit: 10 * 1024,
          // 由于旧版用的是ES6模块化处理，和 html-loader 兼容性问题，所以禁用 ES6模块化
          esModule: false,
          // 自定义文件名，取hash值的前10位
          name: '[hash:10].[ext]',
          // 输出目录名
          outputPath:'img'
        }
      },

      // 处理html中的图片
      {
        test: /\.(html|htm)/,
        loader:'html-loader'
      },

      // 打包其它资源文件，不需要做任何处理的文件，如字体之类的
      {
        // 排除需要打包的文件类型
        exclude: /\.(html|js|json|png|jpg|gif|css|scss)/,
        loader: 'file-loader',
        options:{
          // 自定义文件名，取hash值的前10位
          name: '[hash:10].[ext]',
          // 输出目录名
          outputPath:'file'
        }
      }
    ]
  },

  // 插件配置
  plugins:[
    // 设置打包后的默认html页面
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}