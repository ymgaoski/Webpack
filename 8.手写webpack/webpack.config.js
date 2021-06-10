const path = require('path');
const DonePlugin = require('./plugins/donePlugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output:{
    filename: 'bundle.js',
    path: path.resolve(__dirname,'dist')
  },
  module:{
    rules:[
      {
        test:/.scss/,
        use:[
          path.resolve(__dirname,'loader','style-loader'),
          path.resolve(__dirname,'loader','sass-loader'),
        ]
      }
    ]
  },
  plugins:[
    new DonePlugin()
  ]
}