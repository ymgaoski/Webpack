import 'core-js/modules/es.object.to-string';
import 'core-js/modules/es.promise';
import 'core-js/modules/web.timers';


import '../css/index.scss';
import '../css/iconfont/iconfont.css';

const sum = function sum(x, y) {
  return x + y;
};

const result = sum(1, 3);
console.log('基本兼容'.concat(result));
const promise = new Promise(((resolve) => {
  setTimeout(() => {
    // eslint-disable-next-line
    alert('高级兼容，调用了Promise');
    resolve();
  }, 1000);
}));
console.log(promise, 'promise');
