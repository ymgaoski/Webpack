#! /usr/bin/env node
const path = require('path');

// 1、获取 webpack.config.js 配置内容，resolve默认取当前工作目录
const config = require(path.resolve('webpack.config.js'));
// console.log(config,'config');

// 引用编译类
const Compiler = require('../lib/Compiler.js');

// 创建编译类实例
const compiler = new Compiler(config);
// 运行编译
compiler.run();