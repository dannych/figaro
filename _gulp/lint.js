module.exports = function lint(gulp) {
  var jshint = require('gulp-jshint');
  
  gulp.src(['./**/*.js','!node_modules/**/*'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
};