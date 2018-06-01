const path = require('path');

module.exports = {
  entry: './src',
  output: {
    publicPath: '/dist/',
    path: path.resolve('dist'),
    filename: 'bundle.js'
  },
  devServer: {
    open: true,
    port: 3000
  },
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' }]
  }
};
