
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // 入口
  entry:'./src/index.js',

  // 输出
  output:{
    filename: 'js/[name].js',
    path: path.resolve(__dirname,'build')
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

  // 开发服务器
  devServer: {
    // 提供的方法 钩子，用来前端模拟数据
    before(app){
      app.get('/api/user', (req,res) => {
        res.json({name:'xgao'});
      })
    },
    // 项目主目录
    contentBase: path.resolve(__dirname,'build'),
    // 监听目录中任意文件变动就重新加载
    watchContentBase: true,
    watchOptions: {
      // 忽略不需要监听的文件或文件夹
      ignored: /node_modules/
    },
    // 端口
    port: 8001,
    // 域名
    host: 'localhost',
    // 启动gzip压缩
    compress: true,
    // 自动打开浏览器
    open: true,
    // 开记HMR功能
    hot: true,
    // 不要显示启动服务器日志信息
    clientLogLevel: 'none',
    // 除了一些基本启动信息以外，其它信息都不显示
    quiet: true,
    // 如果出错了，不要全屏提示
    overlay: false,

    // 服务器代理 --> 解决开发环境调试服务器跨域的问题
    porxy: {
      // 将访问当前  http://localhost:8001/api 转到 http://10.122.20.22:8001/api 中去
      // 因为是服务器请求服务器，就不会有跨域问题了
      '/api': {
        target: 'http://10.122.20.22:8001/api',
        // 路径重写，发起请求时，将 /api/xxx  转成 /xxx (去掉/api)
        pathRewrite: {
          '^/api': ''
        }
      }
    }

  }

}