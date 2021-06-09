// 异步串行

// const {AsyncSeriesHook} = require("tapable");

// 自定义实现
const {AsyncSeriesHook} = require("./src/tapable");


// 自定义对象
class Person{

  constructor(){
    // 创建钩子
    this.hooks = new AsyncSeriesHook(['name']);
  }

  // 注册事件
  tap(){
    this.hooks.tapAsync('node',(name,cb) => {
      console.log('start node 1');
      setTimeout(() => {
        console.log(name,'学习了 node 1');
        cb();
      }, 2000);
    })
    this.hooks.tapAsync('react',(name,cb) => {
      console.log('start react 2');
      setTimeout(() => {
        console.log(name,'学习了 react 2');
        cb();
      }, 2000);
    })
  }

  // 触发事件
  call(...args){
    this.hooks.callAsync(...args);
  }
}

// 使用
const person = new Person();
person.tap();
person.call('xgao',function(){
  console.log('over...');
});