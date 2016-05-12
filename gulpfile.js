var gulp = require('gulp'),
    _ = require('lodash');
 
gulp.task('default',[
  'lint',
  'serve'
]);

gulp.task('test', _.partial(require('./_gulp/test'),gulp));
gulp.task('lint', _.partial(require('./_gulp/lint'),gulp));
gulp.task('serve', _.partial(require('./_gulp/serve'),gulp));