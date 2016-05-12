var path = require('path');

var gulp = require('gulp'),
    nodemon = require('nodemon'),
    jshint = require('gulp-jshint');
 
gulp.task('lint', lint);

gulp.task('default',[
  'lint',
  'serve'
]);

gulp.task('serve', function() {
  nodemon({
    script: 'index.js',
    ext: 'js',
    env: { 
      'NODE_ENV': 'development' 
    },
    tasks: function (changedFiles) {
      var tasks = [];
      changedFiles.forEach(function (file) {
        if (path.extname(file) === '.js') tasks.push('lint');
        // if (path.extname(file) === '.css' && !~tasks.indexOf('cssmin')) tasks.push('cssmin');
      });
      return tasks;
    },
  })
  .on('restart', lint);
});

function lint() {
  gulp.src(['./**/*.js','!node_modules/**/*'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
}