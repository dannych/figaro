var jshint = require('gulp-jshint'),
    lint = require('./lint');

module.exports = function (gulp) {
  return lint(gulp)
    .pipe(jshint.reporter('fail'));
};