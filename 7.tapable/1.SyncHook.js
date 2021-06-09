// 同步

// const {SyncHook} = require("tapable");

// 自定义实现
const {SyncHook} = require("./src/tapable");


// 自定义对象
class Person{

  constructor(){
    // 创建钩子
    this.hooks = new SyncHook(['name','age']);
  }

  // 注册事件
  tap(){
    this.hooks.tap('fly',(name,age) => {
      console.log(name,age,'fly');
    })
    this.hooks.tap('say',(name,age) => {
      console.log(name,age,'say');
    })
  }

  // 触发事件
  call(...args){
    this.hooks.call(...args);
  }
}

// 使用
const person = new Person();
person.tap();
person.call('xgao',28);