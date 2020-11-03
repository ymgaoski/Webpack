
const sum = function sum(x, y) {
  return x + y;
};

const result = sum(1, 3);
console.log('基本兼容'.concat(result));

const promise = new Promise((resolve) => {
  setTimeout(() => {
    console.log('高级兼容，调用了Promise');
    resolve();
  }, 1000);
});
console.log(promise, 'promise');
