import {mul} from './mul';
console.log(mul(2,3),'mul');

// 使用import单独引入模块，能会单独创建一个chunk
import('./sum').then(function({sum}){
  console.log(sum(1,2),'sum');
})