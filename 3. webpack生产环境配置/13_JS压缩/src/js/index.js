// 引入JS兼容性处理
// import '@babel/polyfill'

const sum = (x, y) => {
  return x + y;
}

const result = sum(1, 3);
console.log('基本兼容'+result);

let promise = new Promise(function(succ,fail){

  setTimeout(() => {
    alert('调用Promise')
  }, 1000);
})
console.log(promise,'promise');