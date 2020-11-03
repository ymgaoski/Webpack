/**
 * TreeShaking 树摇，就是将树上多余死了的叶子摇下来
 *  作用：打包后将一些没有用到的js，或者css 不进行打包输出，减少代码体积，加快请求速度
 *  启用（满足下面两个条件就会自动开启）：
 *    1、使用ES6模块化
 *    2、mode设置为 production
 *   
 *  清理所有副作用文件
 *  在 package.json 中 配置 "sideEffects": false
 *    问题：会导致css/@babel/plyfill （副作用）这些文件都不打包
 *    解决：sideEffects: ["*.css"]    设置css文件不是副作用文件
 * 
 *  webpack4 tree shaking 的问题：如果js有嵌套引用的，将无法到达预期效果，比如，a 引用 b ，b再引用 c ，无论c有没有被使用，都会被编译
 *  webpack5 解决了上面的问题，并且提升的打包速度与更小的打包体积
 */

// NodeJS路径处理模块 
const path = require('path');
// HTML处理插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// css单独提取插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// css压缩
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");


// Css兼容性处理
// 还需要配置 package.json 中 browserslist
const postCssLoader = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    // 使用postcss插件
    plugins: () => {
      // 注意后面的括号，需要执行
      require('postcss-preset-env')()
    }
  }
}

// CSS单独提取
const extractCssLoader = {
  loader: MiniCssExtractPlugin.loader,
  options: {
    // 设置css提取时url的路径往上一层，解决提取css文件后，图片地址对不上的问题
    publicPath: '../'
  }
}

// webpack配置
module.exports = {
  // 入口
  entry: './src/js/index.js',

  // 输出
  output: {
    filename: 'js/build.[contenthash:10].js',
    path: path.resolve(__dirname,'build')
  },

  // loader
  module : {
    rules : [
        {
          // oneOf配置
          oneOf: [

            // Css处理
            {
              test: /\.css$/,
              use: [
                // 'style-loader',
                // 使用CSS提取loader，替换原有的
                {...extractCssLoader},
                'css-loader',
                // Css兼容性处理
                {...postCssLoader}
              ]
            },

            // Scss处理
            {
              test: /\.scss$/,
              use: [
                // 'style-loader',
                // 使用CSS提取loader，替换原有的
                {...extractCssLoader},
                'css-loader',
                // Css兼容性处理
                {...postCssLoader},
                'sass-loader'
              ]
            },

            // 样式文件中的图片处理
            {
              test: /\.(png|jpg|gif)/,
              loader: 'url-loader',
              options: {
                // 10KB以下转换成base64
                limit: 10 * 1024,
                // 关闭ES6模块化
                // 问题：旧版本 url-loader 使用的是es6模块化解析,而html-loader用的是commonJS模块化处理
                // 解析出现的问题：两个会不兼容导致 img 的src引用地址会是一个 [object Module] 字符串
                // 解决方法：关闭es6模块化
                // 新版本好像已经不是用 ES6模块化解析了，用的就是CommonJS，所以下面这句也不用配置了
                esModule: false,
                // 自定义文件名 前10位哈希值
                name: '[contenthash:10].[ext]',
                // 自定义目录名
                outputPath: 'img'
              }
            },

            // HTML中的图片地址处理
            {
              test: /\.html/,
              loader: 'html-loader'
            },

            // 打包其它资源 (不做任何修改直接打包出去)
            {
              exclude: /\.(png|jpg|gif|html|js|json|css|scss)/,
              loader: 'file-loader',
              options: {
                // 自定义文件名 前10位哈希值
                name: '[contenthash:10].[ext]',
                // 自定义目录名
                outputPath: 'file'
              }
            },

            // JS兼容性处理
            /*
              基础包：babel-loader @babel/core
              三种方案：
                1：@babel/preset-env 基础语法兼容，像promise高级语法无法转换
                2：@babel/polyfill   全部语法转换，生成文件太大，无论你用没用到都生成ES6所有的方法转成对应的ES5方法
                3: core-js           按需处理JS兼容性（安装到生产环境：打包成生产环境后会引用到core-js的js文件,cnpm i core-js --save）
            */
            {
              test: /\.js$/,
              // 排除第三方库文件
              exclude: /node_modules/,
              loader: 'babel-loader',
              options: {
                // 预设：指示babel做怎么样的兼容性处理
                presets: [
                  [  
                    '@babel/preset-env',
                    // core-js 配置
                    {
                      // 设置为按需加载
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
                ],

                // 开启缓存
                cacheDirectory: true
              }
            }
          ] 
        }
    ]
  },

  // 插件
  plugins: [
    // html处理插件
    new HtmlWebpackPlugin({
      template: './src/index.html',
      // HTML压缩配置（新版本不配置，在生产模式下默认已经开启了压缩）
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true
      }
    }),
    // 单独提取CSS文件插件
    new MiniCssExtractPlugin({
      // 对输出的css文件进行重命名与归档文件夹
      filename: 'css/build.[contenthash:10].css'
    }),
    // css压缩
    new OptimizeCssAssetsWebpackPlugin()
  ],

  // 模式
  // 生产环境模式就会自动开启js压缩
  mode: 'production',

  // 开启sourceMap
  devtool: 'source-map'

}
