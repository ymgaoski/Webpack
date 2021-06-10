const sass = require('sass');

function loader(source){
  // 使用sass将scss转css
  const sassObj = sass.renderSync({data: source});
  // console.log(sassObj.css.toString());
  
  // 需要将 \n 转成 \\n 不然源码将无法运行，一个\是转义，\\n就表式换行了
  return sassObj.css.toString().replace(/\n/g,'\\n');
}

module.exports = loader;