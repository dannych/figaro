var nodemon = require('nodemon'),
    lint = require('./lint');

module.exports = function(gulp) {
  nodemon({
    script: 'index.js',
    ext: 'js',
    env: { 
      'NODE_ENV': 'development' 
    }
  })
  .on('restart', lint);
};