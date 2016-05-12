var gulp = require('gulp'),
    nodemon = require('nodemon');

gulp.task('default', function() {
  nodemon({
    script: './index.js',
    ext: 'js json',
    tasks: ['browserify'],
    env: { 
      'NODE_ENV': 'development' 
    }
  });
});