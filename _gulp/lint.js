var jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish');

module.exports = function lint(gulp) {  
  return gulp.src(['./**/*.js','!node_modules/**/*'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
};
