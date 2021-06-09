// 异步并行

// const {AsyncParallelHook} = require("tapable");

// 自定义实现
const {AsyncParallelHook} = require("./src/tapable");


// 自定义对象
class Person{

  constructor(){
    // 创建钩子
    this.hooks = new AsyncParallelHook(['name']);
  }

  // 注册事件
  tap(){
    this.hooks.tapAsync('node',(name,cb) => {
      console.log('start node');
      setTimeout(() => {
        console.log(name,'学习了 node');
        cb();
      }, 1000);
    })
    this.hooks.tapAsync('react',(name,cb) => {
      console.log('start react');
      setTimeout(() => {
        console.log(name,'学习了 react');
        cb();
      }, 1000);
    })
    
    // // promise版本
    // this.hooks.tapPromise('vue',(name) => {
    //   return new Promise((resolve,reject) => {
    //     console.log('start vue');
    //     setTimeout(() => {
    //       console.log(name,'学习了 vue');
    //       resolve();
    //     }, 1000);
    //   })
    // })

    // // promise版本
    // this.hooks.tapPromise('css',(name) => {
    //   return new Promise((resolve,reject) => {
    //     console.log('start css');
    //     setTimeout(() => {
    //       console.log(name,'学习了 css');
    //       resolve();
    //     }, 1000);
    //   })
    // })
  }

  // 触发事件
  call(...args){
    this.hooks.callAsync(...args);
  }

  // 触发事件 promise
  promise(...args){
    this.hooks.promise(...args).then(() => {
      console.log('ko...');
    });
  }
}

// 使用
const person = new Person();
person.tap();

person.call('xgao',function(){
  console.log('over...');
});

// person.promise('xgao');
