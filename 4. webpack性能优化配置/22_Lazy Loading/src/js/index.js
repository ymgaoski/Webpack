
// 注：无论是用普通回调还是promise封装懒加载都不行，打包生成不了单独的文件，使用的时候会报错
/*
function lazyLoad(filePath,reslove){

  import(filePath).then(({...args}) => { 
    reslove(...args);
  })
}
*/

// 点击事件
// 只有点击了按钮后才加载js，多次调用只会加载一次文件，其它会直接读取缓存
document.getElementById('mulBtn').onclick = function(){

  /**
   * webpackPrefetch：预加载
   *  等浏览器其它正常资源都加载完后，空闲后，再加载这个JS，在浏览器请求中会设置 Request Headers 的 Purpost: prefetch
   *  解决多个不重要或不需要立即执行的文件一开始访问就和重要的文件一起加载，拖慢网络请求，增加服务器压力
   */
  import(/* webpackChunkName: 'test', webpackPrefetch: true */'./test').then(({sub,mul}) => { 
    let mulResult = mul(10,5);
    console.log(mulResult,'mul');
  })
}

document.getElementById('subBtn').onclick = function(){

  import(/* webpackChunkName: 'test', webpackPrefetch: true */'./test').then(({sub,mul}) => { 
    let subResult = sub(10,5);
    console.log(subResult,'sub');
  })

}