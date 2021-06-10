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
// ejs JS模板
const ejs = require('ejs');
// 事件流处理
const {SyncHook} = require('./tapable.js');

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

    // 初始化钩子
    this.hooks = {
      compile: new SyncHook(),
      afterCompile: new SyncHook(),
      afterPlulgins: new SyncHook(),
      run: new SyncHook(),
      emit: new SyncHook(),
      done: new SyncHook()
    }

    // plugins插件处理
    const plugins = this.config.plugins;
    if (Array.isArray(plugins)){
      plugins.forEach(plugin => {
        // 将当前 compiler 传入
        plugin.apply(this);
      })
      // 插件处理完成
      this.hooks.afterPlulgins.call();
    }
  }

  // 读取模块数据
  getSource(modulePath){

    // 获取模块内容
    let source = fs.readFileSync(modulePath,'utf-8');

    // 获取loader配置的rules
    const rules = this.config.module.rules;
    for(let i=0; i < rules.length; i++){
      const rule = rules[i];
      if (rule.test.test(modulePath)){

        // console.log(rule,'rule =>>>>>');

        // 匹配到 loader模块
        let len = rule.use.length - 1;
        
        // 递归倒序遍历要处理的loader
        function normalLoader(){
          // 加载loader
          let loader = require(rule.use[len]);
          len--;
          // 执行loader
          source = loader(source);
          if (len >= 0){
            normalLoader();
          }
        }
        normalLoader();
      }
    }

    return source;
  }

  /**
   * 解析并改造源码
   * @param {源码} source 
   * @param {父目录} parentPath 
   */
  parse(source,parentPath){
    // console.log(source,'=======>>');
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
          moduleName = ('./' + path.join(parentPath,moduleName)).replace(/\\/g,'/');

          // 添加到依赖列表
          dependencies.push(moduleName);

          // 替换源码
          node.arguments = [t.stringLiteral(moduleName)];
        }
      }
    })

    // 生成源码
    let sourceCode = generator(ast).code;
    // console.log('parse end <<<<<');
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
    const moduleName = ('./'+path.relative(this.root,modulePath)).replace(/\\/g,'/');
    // console.log(moduleName,'moduleName');

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
    // 开始发射文件
    this.hooks.emit.call();

    // 输出的路径
    const outFilePath = path.join(this.config.output.path,this.config.output.filename);

    // 读取模板数据
    const templateStr = this.getSource(path.join(__dirname,'template.ejs')).toString();

    // 使用模板引擎渲染数据 
    const code = ejs.render(templateStr,{entryId: this.entryId,modules: this.modules});

    // 资源文件列表
    this.assets = {};
    this.assets[outFilePath] = code;

    // 生成文件
    fs.writeFileSync(outFilePath,code);
    
    // 打包完成
    this.hooks.done.call();
    // console.log('文件打包成功！');
  }

  // 运行并编译
  run(){

    // 开始运行
    this.hooks.run.call();
    // 开始编译
    this.hooks.compile.call();

    // 构建模块
    this.buildModule(path.resolve(this.root,this.entry),true);

    // 编译完成
    this.hooks.afterCompile.call();

    // 生成文件
    this.emitFile();
  }
}

module.exports = Compiler