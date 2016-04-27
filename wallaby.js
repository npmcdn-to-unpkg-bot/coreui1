module.exports = function (wallaby) {
  return {
    compilers: { '**/*.js': wallaby.compilers.babel() },

    env: { params: { env: 'NODE_PATH=src' }, type: 'node' },

    files: [{ pattern: 'src/**/*.js' }],

    setup: function () {
      const chai = require('chai');

      chai.use(require('dirty-chai'));
      chai.use(require('skin-deep/chai'));
    },

    tests: [{ pattern: 'test/**/*Spec.js' }],
  };
};
