
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * 安装处理样式文件中引入图片的loader
 * cnpm i url-loader file-loader -D
 */
module.exports = {
  // 入口
  entry: './src/index.js',
  // 输出
  output:{
    filename:'build.js',
    path: path.resolve(__dirname,'build')
  },
  // loader配置
  module:{
    rules:[
      // 配置scss的处理
      {
        test: /\.scss$/,
        // 使用多个loader的时候用 use
        use:[
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      // 处理样式文件中的图片
      {
        test: /\.(png|jpg|gif)/,
        // url-loader 需要用到 file-loader ，所以两个都要下载
        // url-loader 就是比 file-loader 多了个将图片转换成 base64 的功能
        loader:'url-loader',
        options:{
          // 设置小于10kb的图片将转换成 base64
          // 优点：减少网络请求，减少服务器压力
          // 缺点：转换成base64后图片文件会变大一点，网页加载速度会慢一点
          limit: 10 * 1024,
          // 问题：旧版本 url-loader 使用的是es6模块化解析,而html-loader用的是commonJS模块化处理
          // 解析出现的问题：两个会不兼容导致 img 的src引用地址会是一个 [object Module] 字符串
          // 解决方法：关闭es6模块化
          // 新版本好像已经不是用 ES6模块化解析了，用的就是CommonJS，所以下面这句也不用配置了
          esModule: false,
          // 自定义图片命名，默认是全hash值，下面是取前10位hash值做为文件名，ext 为图片的扩展名
          name: '[hash:10].[ext]'
        }
      },
      // 默认 url-loader只能处理样式文件中的图片，处理不了html中的img的图片地址
      // 需要用到 html-loader 去处理
      // 安装 cnpm i html-loader -D
      {
        test: /\.html$/,
        loader: 'html-loader'
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