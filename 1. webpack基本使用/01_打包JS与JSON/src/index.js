/**
  Webpack命令
  
  5大核心：
    1、入口文件 entry
    2、输出目录 output
    3、loader (用于对模块源码的转换,需要安装)
    4、plugins (解决loader无法实现的其它事，如打包优化、压缩、重新定义环境变量，需要安装并引入)
    5、mode模式（开发development/生产production）
  打包命令：
    开发环境: webpack ./src/index.js -o ./build/build.js --mode=development     能让代码本地调试运行的环境
    正式环境: webpack ./src/index.js -o ./build/build.js --mode=production      能让代码优化上线运行的环境
  Webpack只能对js/json文件进行打包，css/图片 需要设置loader才可以打包
  打包命令：webpack
 */
import data from './json/data.json';
console.log(data,'dataJson');

function sum(x,y){
  console.log(x+y,'sum');
}
sum(10,30);