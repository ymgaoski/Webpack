import $ from 'jquery'

$('.item').css('background','green').width(100).height(100);
console.log($,'test jquery');


// 减法
export function sub(x,y){
  return x - y;
}

// 乘法
export function mul(x,y){
  return x * y;
}

