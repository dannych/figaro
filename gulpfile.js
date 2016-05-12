var gulp = require('gulp'),
    nodemon = require('nodemon'),
    jshint = require('gulp-jshint');
 
gulp.task('lint', function () {
  gulp.src(['./**/*.js','!node_modules/**/*'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('default', function() {
  nodemon({
    script: './index.js',
    ext: 'js',
    tasks: ['lint'],
    env: { 
      'NODE_ENV': 'development' 
    }
  });
});