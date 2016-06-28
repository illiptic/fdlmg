var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: '#cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    },{
        test: /\.json$/,
        loader: 'json',
        include: path.join(__dirname, 'data')
    },{
      test: /\.css$/,
      loader: "style-loader!css-loader",
      include: path.join(__dirname, 'src', 'assets')
    },{
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "url-loader?limit=10000&mimetype=application/font-woff",
      include: path.join(__dirname, 'src', 'assets')
    },{
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "file-loader",
      include: path.join(__dirname, 'src', 'assets')
    }]
  }
};
