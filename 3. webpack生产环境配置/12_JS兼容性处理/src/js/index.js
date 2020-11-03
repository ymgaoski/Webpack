import 'core-js/modules/es.object.to-string';
import 'core-js/modules/es.promise';
import 'core-js/modules/web.timers';

// 引入JS兼容性处理
// import '@babel/polyfill'
const sum = function sum(x, y) {
  return x + y;
};

const result = sum(1, 3);
console.log('\u57FA\u672C\u517C\u5BB9'.concat(result));
const promise = new Promise(((resolve) => {
  setTimeout(() => {
    // eslint-disable-next-line
    alert('调用Promise');
    resolve();
  }, 1000);
}));
console.log(promise, 'promise');
