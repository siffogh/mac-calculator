const path = require('path');
const merge = require('webpack-merge');

module.exports = (env, { mode }) => {
  const config = require(`./build-config/${mode}`);
  return merge(
    {
      entry: './src',
      output: {
        publicPath: '/dist/',
        path: path.resolve('dist'),
        filename: 'bundle.js'
      },
      module: {
        rules: [{ test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' }]
      }
    },
    config
  );
};
