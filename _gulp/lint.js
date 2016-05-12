var jshint = require('gulp-jshint');

module.exports = function lint(gulp) {
  gulp.src(['./**/*.js','!node_modules/**/*'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
};