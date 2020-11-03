/**
 * HMR： hot module replacement 热模块替换 / 模块热更新
 *  作用： 一个模块发生了变化，只重新加载这一个模块，而不是打包所有模块，极大的提高了打包速度，主要是用于 开发环境的，不需要用于生产环境
 *  启动HMR：在 devServer 配置中添加 hot: true
 * 
 *  样式文件：可以开启HMR功能
 *  JS文件：默认不能开启HMR功能，解决：通过 module.hot.accept 代码来实现指定文件修改监听，注意：只能监听除了非入口js文件以外的其它js文件，因为入口文件已经引入了所有其它模块JS，如果重新加载，其它文件也会重新加载，没有任何意义
 *  HTML文件：默认不能开启HMR功能，而且自动刷新功能也失效，不开启HMR是可以刷新的， 解决：在 entry入口配置添加 index.html 文件
 *            webpack就一个html页面，不像JS有很多模块，改一个只加载那一个，html就一个HMR在HTML上作用不大
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
  ],

  // 模式 (develpment/production)
  mode: 'development',

  // 开发服务配置
  devServer:{
    // 项目构建后的路径
    contentBase: path.resolve(__dirname,'build'),
    // 端口
    port: 8001,
    // 开启gzip压缩
    compress: true,
    // 自动打开浏览器
    open: true,
    // 开启HMR热更新功能
    hot: true
  }
}