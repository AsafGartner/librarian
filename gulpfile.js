var gulp = require('gulp');
var browserify = require('gulp-browserify');
var sass = require('gulp-sass');
var del = require('del');

gulp.task('clean', function(cb) {
  // You can use multiple globbing patterns as you would with `gulp.src`
  del(['build/**/*.*'], cb);
});

gulp.task('scripts', function() {
  gulp.src('static/js/app.js')
    .pipe(browserify())
    .pipe(gulp.dest('build/js'));

  gulp.src('static/js/vendor/**/*.js')
    .pipe(gulp.dest('build/js'));
});

gulp.task('scss', function() {
  gulp.src('static/css/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('build/css'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch('static/js/**/*.js', ['clean', 'scripts', 'scss']);
  gulp.watch('static/css/**/*.scss', ['clean', 'scripts', 'scss']);
});

gulp.task('default', ['clean', 'scripts', 'scss', 'watch']);