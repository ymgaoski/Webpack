// 引入样式文件
import '../css/index.scss'
import '../css/iconfont/iconfont.css'
import print from './print'

console.log('index文件加载了~~');

print();

// 判断是否开启了 HMR
if (module && module.hot){
  
  // 添加文件修改监听
  // print.js被监听后，再修改它就不会重新打包其它文件了，会回调后面那个函数
  module.hot.accept('./print.js',function(){
    console.log('print文件有改变！');
    // 重新执行要监听js文件的初始化代码
    print();
  })
}