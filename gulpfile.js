var gulp = require('gulp');
var browserify = require('gulp-browserify');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var del = require('del');

gulp.task('clean', function(cb) {
  // You can use multiple globbing patterns as you would with `gulp.src`
  del(['build/**/*'], cb);
});

gulp.task('scripts', function() {
  gulp.src('static/js/**/*.js')
    .pipe(gulp.dest('build/js'));

  gulp.src('static/js/app.js')
    .pipe(browserify())
    .pipe(gulp.dest('build/js'));
});

gulp.task('scss', function() {
  gulp.src('static/css/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('build/css'));
});

gulp.task('fonts', function() {
  gulp.src('static/fonts/**/*')
    .pipe(gulp.dest('build/fonts'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch('static/**/*.*', ['build']);
});

gulp.task('build', ['scripts', 'scss', 'fonts']);

gulp.task('default', ['clean', 'build', 'watch']);