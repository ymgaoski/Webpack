// 同步钩子
class SyncHook{
  constructor(args){
    this.events = [];
  }

  // 注册事件
  tap(eventName,fn){
    this.events.push({
      eventName,
      fn
    })
  }

  // 触发事件
  call(...args){
    this.events.forEach(event => {
      event.fn(...args)
    })
  }
}

// 异步（并行）钩子
class AsyncParallelHook{
  constructor(args){
    this.events = [];
  }

  // 注册事件
  tapAsync(eventName,fn){
    this.events.push({
      eventName,
      fn
    })
  }

  // 注册事件- Promise版
  tapPromise(eventName,fn){
    this.events.push({
      eventName,
      fn
    })
  }

  // 触发事件
  callAsync(...args){
    const cb = args.pop();
    let count = this.events.length;
    this.events.forEach(event => {

      event.fn(...args,() =>{
        count--;
        if (count == 0){
          cb();
        }
      });
    })
  }

  // 触发事件 - Promise版
  promise(...args){
    let count = this.events.length;
    return new Promise((resolve,reject) => {
      this.events.forEach(event => {
        event.fn(...args).then(() =>{
          count--;
          if (count == 0){
            resolve();
          }
        })
      })
    })
  }
}

// 异步（串行）钩子
class AsyncSeriesHook{
  constructor(args){
    this.events = [];
  }

  // 注册事件
  tapAsync(eventName,fn){
    this.events.push({
      eventName,
      fn
    })
  }

  // 触发事件
  callAsync(...args){

    const cb = args.pop();
    let eventIndex = 0;
    callEvent.call(this,this.events[eventIndex]);

    // 递归调用事件
    function callEvent(event){
      // console.log(event,'event');
      if (eventIndex < this.events.length){
        event.fn(...args,() => {
          callEvent.call(this,this.events[eventIndex]);
        });
        eventIndex++;
      }else{
        cb();
      }
    }
  }
}

module.exports = {
  SyncHook,
  AsyncParallelHook,
  AsyncSeriesHook
}