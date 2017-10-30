const path = require('path');

module.exports = {
  entry: './public/javascripts/app.js',
  output: {
    path: path.join(__dirname, './public/dist'),
    filename: 'bundle.js'
  },
  watch: false,
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|browser_components)/,
        use: ['babel-loader'],
      }
    ],
  },
};