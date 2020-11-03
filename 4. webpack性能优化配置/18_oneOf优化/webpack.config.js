/**
 * oneOf优化
 * 默认是 一个文件会对所有loader都过一遍，oneOf是只要有一个匹配成功，就不往下执行了
 * 注意：onOf里面只能有一个loader来处理一种文件类型，不能多个loader处理同一种文件类型，解决方法就是将有多个不一样的抽到外面去，具体实现如下
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
    filename: 'js/build.js',
    path: path.resolve(__dirname,'build')
  },

  // loader
  module : {
    rules : [
      
        // ESlint 语法检查
        /*
          在package.json中还需要配置 eslintConfig
          使用第三方的规则库即可
          "eslintConfig": {
            "extends": "airbnb-base"
          }
        */
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
                name: '[hash:10].[ext]',
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
                name: '[hash:10].[ext]',
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
                ]
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
      filename: 'css/build.css'
    }),
    // css压缩
    new OptimizeCssAssetsWebpackPlugin()
  ],

  // 模式
  // 生产环境模式就会自动开启js压缩
  mode: 'production'

}
