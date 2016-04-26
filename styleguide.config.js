'use strict';

var path = require('path');
module.exports = {
  title: 'Core UI Style Guide',
  components: './src/components/**/*.js',
  serverPort: 3001,
  updateWebpackConfig: function(webpackConfig, env) {
    // Your source files folder or array of folders, should not include node_modules
    let dir = path.join(__dirname, 'src');
    webpackConfig.module.loaders.push(
      // Babel loader will use your project’s .babelrc
      {
        test: /\.jsx?$/,
        include: dir,
        loader: 'babel',
      }
    );
    return webpackConfig;
  },
};
