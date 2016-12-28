const path = require('path');
const fs = require('fs-extra');
const webpack = require('webpack');
const node_modules_dir = path.resolve(__dirname, 'node_modules');

const source = fs.createReadStream('./app/index.html');
const dest = fs.createWriteStream('./build/index.html');

source.pipe(dest);
source.on('end', function() {
  console.log('index copy succeed');
});

source.on('error', function(err) {
  console.log('index copy error');
});

const config = {
  entry   : path.resolve(__dirname, './app/app.js'),
  plugins : [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV' : JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ],
  output : {
    path     : path.resolve(__dirname, 'build'),
    filename : 'main.js'
  },
  debug  : false,
  module : {
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
  worker : {
    output : {
      filename      : 'hash.worker.js',
      chunkFilename : '[id].hash.worker.js'
    }
  },
};

module.exports = config;
