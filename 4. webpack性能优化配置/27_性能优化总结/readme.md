
### 开发环境优化

* 优化打包构建速度
  * HMR         热更新，实现某一个模块改变就只打包那一个模块
  
* 优化代码调试
  * SourceMap   源码映射，方便代码调试，还可配置不显示源码

### 生产环境优化

* 优化打包构建速度
  * oneOf       对于loader处理的优化，默认一个文件会经过多个loader处理，oneOf是设置成只要一个处理了就不往下处理，
                注意：如果一个文件类型要被多个loader处理，oneOf里面只能放一个loader其它的需要提取出去
  * babel缓存   让babel模块的文件只打包一次 babel里面有很多js文件
  * 多进程打包   可以指定打包进程数，提高打包速度，如果数据很少，用了反而打包更慢
  * Externals   指定哪些模块不进行打包，然后自己在index.html中引入CDN的相关地址
  * Dll         只打包一次，后面打包就不会再去打包，并且可以指定node_modules中哪些库分开打包，解决了Code Split做不到的功能，需要专门新增个dll相关的配置文件

* 优化代码运行性能
  * 文件缓存（三种hash ）
      1：hash         每次打包hash值都不一样
      2: chunkhash    同一个chunk打包的hash值一样，入口文件引用的所有模块默认都是同一个chunk，只要其中一个模块有改变hash值就会变
      3: contenthash  只要文件内容不变，打包的hash值就不会变，推荐使用这种
  * Tree Shakingn   树摇，去除一些没有调用的代码
  * Code Split      代码分割，可以将指定的JS模块与node_moduls引入的文件分开打包，node_moduls引入的会打包成一个
  * Lazy Loading    懒加载/预加载，可以让指定的JS模块用到的时候再去加载，而不是一打开网页就全部加载，或者 等网页数据加载完后默默的再去加载JS（预加载）
  * PWA             离线应用，在没有网络的情况下也能访问网页
