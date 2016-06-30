const path = require('path');

module.exports = {
  devtool: 'eval',
  entry: ['./src/index.js'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'coreui.js',
    library: 'CoreUI',
    libraryTarget: 'umd',
  },
  resolve: { extensions: ['', '.js'] },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        loaders: ['babel'],
      },
    ],
  },
  externals: {
    'react-dom': {
      root: 'ReactDOM',
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
    },
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
    },
  },
};
