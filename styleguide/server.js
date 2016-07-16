const config = require('./webpack.config.dev');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

new WebpackDevServer(webpack(config), {
  contentBase: 'public',
  historyApiFallback: { index: '/styleguide/index.html' },
  hot: true,
  publicPath: config.output.publicPath,
}).listen(3003, 'localhost', function (err) {
  if (err) { return console.log(err); }

  console.log('Listening at http://localhost:3003/');
});
