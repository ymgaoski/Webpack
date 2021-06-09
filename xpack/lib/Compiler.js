const fs = require('fs');
const path = require('path');
// babylon          用于把源码转换成AST
const babylon = require('babylon');
// @babel/types     将遍历好的节点替换
const t = require('@babel/types');
// @babel/traverse  遍历AST节点
const traverse = require('@babel/traverse').default;
// @babel/generator 将替换好的节点生成
const generator = require('@babel/generator').default;

class Compiler{

  constructor(config){
    this.config = config;

    // 需要保存的入口文件路径
    this.entryId = '';
    this.entry = config.entry;
    // 需要保存所有的模块依赖
    this.modules = {};
    // 工作路径
    this.root = process.cwd();
  }

  // 读取模块数据
  getSource(modulePath){
    // 获取模块内容
    const source = fs.readFileSync(modulePath,'utf-8');
    return source;
  }

  /**
   * 解析并改造源码
   * @param {源码} source 
   * @param {父目录} parentPath 
   */
  parse(source,parentPath){
    // AST解析语法树
    let ast = babylon.parse(source);
    // 依赖数组
    let dependencies = [];
    
    // 遍历AST节点
    traverse(ast,{
      CallExpression(p){
        // 对应节点
        let node = p.node;
        if (node.callee.name === 'require'){
          // 修改节点名
          node.callee.name = '__webpack_require__';
          // 获取参数值（'./index.js'）
          let moduleName = node.arguments[0].value;
          // 兼容 './index' or './index.js'
          moduleName = moduleName + (path.extname(moduleName) ? '' : '.js');
          // './src/index.js'
          moduleName = './' + path.join(parentPath,moduleName);

          // 添加到依赖列表
          dependencies.push(moduleName);

          // 替换源码
          node.arguments = [t.stringLiteral(moduleName)];
        }
      }
    })

    // 生成源码
    let sourceCode = generator(ast).code;
    return {sourceCode, dependencies};
  }

  /**
   * 构建模块
   * @param {模块路径} modulePath 
   * @param {是否主入口} isEntry 
   */
  buildModule(modulePath, isEntry){
    // 获取模块内容
    const source = this.getSource(modulePath);
    // console.log(source,'source');

    // 模块ID，需要相对路径如： ./index.js = modulePath - this.rootPath
    const moduleName = './'+path.relative(this.root,modulePath);
    console.log(moduleName,'moduleName');

    if(isEntry){
      this.entryId = moduleName;
    }

    // 解析source源码，并改造，返回改造后的源码与依赖列表（源码中一共有多少个require）
    let {sourceCode,dependencies} = this.parse(source,path.dirname(moduleName))
    // console.log(sourceCode,'sourceCode');
    // console.log(dependencies,'dependencies');

    // 把相对路径和模块中的内容对应起来
    this.modules[moduleName] = sourceCode;

    // 递归加载模块
    dependencies.forEach(dep => {
      this.buildModule(path.join(this.root,dep),false);
    })
  }

  // 发射文件
  emitFile(){

  }

  // 运行并编译
  run(){
    // 构建模块
    this.buildModule(path.resolve(this.root,this.entry),true);
    console.log(this.modules);
    // 生成文件
  }
}

module.exports = Compiler