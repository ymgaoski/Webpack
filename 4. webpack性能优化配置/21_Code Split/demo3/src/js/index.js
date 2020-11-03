// 使用node_modules中的插件，通过配置optimization的splitChunks可以单独打包
import $ from 'jquery'
$('body').css('background','red');
console.log($,'index jquery');

/**
 * 使用代码实现js模块单独打包成一个chunk
 * import 动态导入语法：能将某个文件单独打包
 * 使用 注释 webpackChunkName 设置打包后的文件名
 */
import(/* webpackChunkName: 'test' */'./test').then(({sub,mul}) => { 

  let subResult = sub(10,5);
  console.log(subResult,'sub');

  let mulResult = mul(10,5);
  console.log(mulResult,'mul');
})
