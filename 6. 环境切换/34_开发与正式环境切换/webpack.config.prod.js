const {merge} = require('webpack-merge');
const base = require('./webpack.config.base.js');

module.exports = merge(base,{
  mode: 'production',

  // 开启SourceMap
  devtool: 'eval-cheap-source-map',
})