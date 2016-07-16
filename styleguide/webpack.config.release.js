const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'public', 'styleguide');

const config = {
  entry: ['babel-polyfill', path.resolve(__dirname, 'src/index.js')],
  resolve: {
    extensions: ['', '.js', '.md', '.txt'],
    alias: {
      // coreui requires will be searched in src folder, not in node_modules
      coreui: path.resolve(__dirname, '../src'),
    },
  },
  devtool: 'cheap-module-source-map',
  devServer: { contentBase: 'public', outputPath: buildPath },
  output: { filename: 'app.js', path: buildPath },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output: { comments: false },
    }),
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [
      { exclude: /node_modules/, loader: 'babel-loader', test: /\.js$/ },
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
