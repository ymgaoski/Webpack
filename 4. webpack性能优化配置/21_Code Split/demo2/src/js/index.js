// 使用node_modules中的插件，通过配置optimization的splitChunks可以单独打包
import $ from 'jquery'
$('body').css('background','red');
console.log($,'index jquery');

// 多入口中已经配置
// import {sub} from './test'
let result = sub(10,5);
console.log(result,'result');


// // 使用代码实现js模块单独打包
// import ('./test').then(function(sub,mul){

//   let sub = sub(10,5);
//   console.log(sub,'sub');

//   let mul = mul(10,5);
//   console.log(mul,'mul');
// })
