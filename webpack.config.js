const path = require('path');
const merge = require('webpack-merge');

const mode = process.env.WEBPACK_SERVE ? 'development' : 'production';
const config = require(`./build-config/${mode}`);

module.exports = merge(
  {
    mode,
    entry: './src',
    output: {
      publicPath: '/dist/',
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        }
      ]
    }
  },
  config
);
