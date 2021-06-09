/**
 * Webpack配置文件
 * 作用：指示 webpack 干哪些活（当你运行 webpack 指令时，会加载里面的配置）
 *
 * webpack（其它所有构建工具）都是基于node.js运行的，里面使用的是 commonjs 的模块化，不是ES6的模块化（项目中都是用ES6模块化）
 */

// path是Nodejs里面的一个模块
const path = require("path");

module.exports = {
  // 配置入口文件
  entry: "./src/index.js",

  // 输出
  output: {
    filename: "built.js",
    // resolve 用于绝对路径地址拼接
    // __dirname 代表当前文件目录的绝对路径
    path: path.resolve(__dirname, "build"),
  },

  // loader配置
  module: {
    rules: [
      // 详细loader配置（loader都是需要额外安装）
      {
        // 匹配哪些文件后缀（css样式文件）
        test: /\.css$/,
        // 使用哪些loader,注意顺序：从下向上执行loader,别搞反了
        // cnpm i style-loader css-loader -D
        use: [
          // 将js中的css字符串生成style节点，添加到 html head 的style标签中
          // 对象配置方式
          {
            loader: 'style-loader'
            options: {
              // 将样式插入到页面的最上面，防止覆盖原来html中Style的样式
              insertAt: 'top'
            }
          },
          // 将css文件使用commonjs模块化的方式加入到js中
          // 字符串配置模式
          "css-loader",
        ],
      },
      {
        // scss loader配置
        // sass 3之后就叫 scss了
        test: /\.scss$/,
        // node-sass 不是loader但也需要安装，需要用到
        // cnpm i sass-loader node-sass -D
        use: [
          "style-loader",
          "css-loader",
          // 将 Sass 编译成 CSS
          "sass-loader",
        ],
      },
    ],
  },

  // plugins 插件配置
  plugins: [
    // 详细插件配置
  ],

  // mode模式配置
  mode: "development", // 开发模式
  // mode: 'production'  // 生产模式
};
