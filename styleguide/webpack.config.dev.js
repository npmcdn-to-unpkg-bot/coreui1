const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'public', 'styleguide');

const config = {
  entry: [
    'react-hot-loader/patch',
    'babel-polyfill',
    'webpack-dev-server/client?http://localhost:3003',
    'webpack/hot/only-dev-server',
    path.resolve(__dirname, 'src/index.js'),
  ],
  resolve: {
    extensions: ['', '.js', '.md', '.txt'],
    alias: {
      // coreui requires will be searched in src folder, not in node_modules
      coreui: path.resolve(__dirname, '../src'),
    },
  },
  devtool: 'eval',
  output: {
    path: buildPath,
    filename: 'app.js',
    publicPath: '/styleguide/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [
      { exclude: /node_modules/, loaders: ['babel'], test: /\.js$/ },
      { loader: 'json-loader', test: /\.json$/ },
      {
        include: path.resolve(__dirname, 'src/app/components/raw-code'),
        loader: 'raw-loader',
        test: /\.txt$/,
      },
      { loader: 'raw-loader', test: /\.md$/ },
      { loader: 'style-loader!css-loader', test: /\.css$/ },
    ],
  },
  eslint: { configFile: '../.eslintrc.json' },
};

module.exports = config;
