const path = require('path');
const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = {
  entry : [
    'babel-polyfill',
    'webpack-dev-server/client?http://0.0.0.0:3600',
    'webpack/hot/only-dev-server',
    './app/app',
  ],
  output : {
    publicPath : '/',
    filename   : 'main.js',
  },
  plugins: [
    new DashboardPlugin(),
  ],
  debug   : true,
  devtool : 'source-map',
  module  : {
    loaders : [
      {
        test    : /\.js$/,
        include : path.join(__dirname, 'app'),
        loader  : 'babel-loader',
      },
      {
        test   : /\.css$/,
        loader : 'style!css',
      },
      {
        test   : /\.(png|jpg|pdf)$/,
        loader : 'url?limit=125000',
      },
      {
        test   : /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader : 'url-loader?limit=10000&minetype=application/font-woff',
      },
      {
        test   : /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader : 'file-loader',
      },
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      }
    ],
  },
  worker: {
    output: {
      filename      : 'hash.worker.js',
      chunkFilename : '[id].hash.worker.js'
    }
  },
  devServer: {
    contentBase : './app',
  }
};
