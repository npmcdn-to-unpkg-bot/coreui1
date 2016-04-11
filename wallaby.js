module.exports = function (wallaby) {
  return {
    files: [
      { pattern: 'src/**/*.js' },
    ],

    tests: [
      { pattern: 'test/**/*Spec.js' },
    ],

    compilers: {
      '**/*.js': wallaby.compilers.babel(),
    },

    env: {
      params: {
        env: 'NODE_PATH=src',
      },
      type: 'node',
    },

    setup: function () {
      const chai = require('chai');
      
      chai.use(require('dirty-chai'));
      chai.use(require('skin-deep/chai'));
    },
  };
};
