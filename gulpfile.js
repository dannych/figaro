var gulp = require('gulp'),
    _ = require('lodash');
 
gulp.task('default',[
  'lint',
  'serve'
]);

gulp.task('lint', _.partial(require('./_gulp/lint'),gulp));
gulp.task('serve', _.partial(require('./_gulp/nodemon'),gulp));
