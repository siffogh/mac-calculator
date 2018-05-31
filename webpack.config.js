const path = require('path');
const DashboardPlugin = require('webpack-dashboard/plugin');

const port = 1234;

module.exports = {
  entry: './src',
  output: {
    publicPath: '/dist/',
    path: path.resolve('dist'),
    filename: 'bundle.js'
  },
  devServer: {
    open: true,
    port
  },
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' }]
  },
  plugins: [new DashboardPlugin({ port })]
};
