class DonePlugin{
  // 实现 apply 方法
  apply(compiler){
    compiler.hooks.done.tap('done',function(){
      console.log('打包完成！');
    })
  }
}

module.exports = DonePlugin