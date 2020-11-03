import '../css/index.css';

// 只引用其中一个方法
import { sub } from './test';

const result = sub(10, 5);
// eslint-disable-next-line
console.log(result, 'result');

/*
  问题：默认eslint不认识 window , navigator 对象，需要配置下 package.json 中的eslintConfig 如下：
  "eslintConfig": {
    "env": {
      // 开启浏览器的全局环境
      "browser": true
    }
  }
*/

// 注册serviceWorker
if ('serviceWorker' in navigator) {
  // 页面加载完后注册
  window.addEventListener('load', () => {
    // service-worker.js 是WorkboxWebpackPlugin插件生成到根目录的，打包后会有
    navigator.serviceWorker.register('./service-worker.js').then(() => {
      // eslint-disable-next-line
      console.log('serviceWorker注册成功！');
    }).catch(() => {
      // eslint-disable-next-line
      console.log('serviceWorker注册失败！');
    });
  });
}
