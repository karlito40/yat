var path = require('path');

module.exports = [{
  context: path.join(__dirname, 'public', 'js'),
  entry: 'app',
  output: {
    path: path.join(__dirname, 'public', 'js'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { text: /\.jsx$/, loader: "jsx-loader?harmony" }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: [path.join(__dirname, 'public', 'js')],
    modulesDirectories: ['node_modules']
  }
}];