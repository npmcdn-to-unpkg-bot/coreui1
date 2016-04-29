'use strict';

var path = require('path');
module.exports = {
  title: 'Core UI Style Guide',
  components: './src/components/**/*.js',
  serverPort: 3001,
  updateWebpackConfig: function(webpackConfig, env) {
    webpackConfig.entry.push(path.join(__dirname, 'styleguide/css/apollo.css'));
    webpackConfig.entry.push(path.join(__dirname, 'styleguide/css/react-widgets.css'));
    let dir = path.join(__dirname, 'src');
    let styleguideDir = path.join(__dirname, 'styleguide');
    webpackConfig.module.loaders.push(
      { test: /\.jsx?$/, include: dir, loader: 'babel' },
      { test: /\.css$/, include: styleguideDir, loader: 'style-loader!css-loader' },
      { test: /\.(png|gif|jpg|jpeg)$/, include: styleguideDir, loader: 'file-loader' },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        include: styleguideDir,
        loader: 'file-loader',
      }
    );
    return webpackConfig;
  },
};
