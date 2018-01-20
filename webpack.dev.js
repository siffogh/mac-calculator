/* eslint import/no-extraneous-dependencies: 0 */

const merge = require('webpack-merge');

const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: 'src',
    open: true
  }
});
