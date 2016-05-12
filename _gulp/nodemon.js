module.exports = function(gulp) {
  var nodemon = require('nodemon'),
    lint = require('./lint');
    
  nodemon({
    script: 'index.js',
    ext: 'js',
    env: { 
      'NODE_ENV': 'development' 
    }
  })
  .on('restart', lint);
};