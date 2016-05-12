var lint = require('./lint');

module.exports = function(gulp) {
  var nodemon = require('nodemon');
    
  return nodemon({
    script: 'index.js',
    ext: 'js',
    env: { 
      'NODE_ENV': 'development' 
    }
  })
  .on('restart', lint);
};
