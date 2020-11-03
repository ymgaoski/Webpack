/**
 * Node 简单后台服务
 * 
 * 启动服务命令：
 * 
 * 第一种：
 *  npi i nodemon -g
 *  nodemon server.js
 * 
 * 第二种：
 *  node server.js
 */

 const express = require('express');
 const app = express();

 // 设置项目目录，缓存时间
 app.use(express.static('build',{ maxAge: 1000 * 3600}));

 // 开启监听
 app.listen(3000);