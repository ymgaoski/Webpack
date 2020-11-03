/**
 * SourceMap  提供源代码与构建后的代码映射技术（如果构建后代码出错，通过映射可以追踪到源代码错误）
 * 开启：添加配置 devtool: 'source-map'
 * 
 * 多种模式：
 * [inline-|hidden|eval][nosources-][cheap-[module-]]source-map
 * 
 * 生成的sourceMap有两种：
 *    1、内联（sourceMap保存在js文件里面，构建速度更快，体积会更大一些）
 *    2、外部（单独创建map文件，构建速度稍慢，体积小）
 * 
 * 各模式对比：
 *    1: eval
 *        内联，不生成sourceMap，而是直接指向对应源码，速度是最快的，【有准确错误提示，点击能进入查看源码】
 *    2：source-map           
 *        外部，每个模块生成一个独立的sourcemap文件，【有准确错误提示，点击能进入查看源码】
 *    3：inline
 *        内联，将.map文件内容以dataURL的形式插入【有准确错误提示，点击能进入查看源码】
 *    4：inline-source-map    
 *        内联，sourceMap在文件的结尾一块区域，【有准确错误提示，点击能进入查看源码】
 *    5: hidden-source-map       
 *        外部，【有准确错误提示，点击能进入只能查看构建后的代码】
 *    6: eval-source-map
 *        内联，每个模块会生成一个eval函数块，【有准确错误提示，点击能进入查看源码，错误信息只能定位到行，不能定位到列】
 *    7: nosources-source-map         
 *        外部，【有准确错误提示，不能查看源码信息】
 *    8: cheap-source-map 
 *        外部，【有准确错误提示，点击能进入查看源码，错误信息只能定位到行，不能定位到列】，cheap就是忽略行的意思
 *    9: cheap-module-source-map
 *        外部，【有准确错误提示，点击能进入查看源码，错误信息只能定位到行，不能定位到列】
 *        只是另外包含了不同loader模块之间的sourcemap
 *  
 *    
 *    一：开发环境：速度快，调试更友好
 *      速度快（eval>inline>cheap>...）
 *        eval-cheap-souce-map
 *        eval-souce-map
 *      调试更友好
 *        source-map
 *        cheap-module-source-map
 *      
 *      选择：eval-source-map (vue脚手架默认用这个) / eval-cheap-module-source-map  
 *    
 *    二：生产环境：源码要不要隐藏？调试要不要更友好？
 *      内联会让代码体积变大，所以生产环境中不要用内联
 *      nosources-source-map    全部隐藏
 *      hidden-source-map       只隐藏源代码，还是能看到构建后的代码
 *      
 *      选择：source-map / cheap-module-source-map
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
  },

  // 开启SourceMap
  devtool: 'eval-cheap-souce-map'
}