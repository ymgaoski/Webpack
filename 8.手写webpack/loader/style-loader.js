const fs = require('fs');

function loader(source){

  // 使用JSON.stringify 可以去掉源码中的换行
  let styleStr = `
    const style = document.createElement('style');
    style.innerHTML = ${JSON.stringify(source)};
    document.head.appendChild(style);
  `;
  return styleStr;
}

module.exports = loader;