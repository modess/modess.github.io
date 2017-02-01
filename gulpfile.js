var gulp = require('gulp'),
    cssnano = require('gulp-cssnano'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat');

gulp.task('styles', function() {
  return gulp.src(['public/css/poole.css', 'public/css/syntax.css', 'public/css/hyde.css', 'public/css/custom.css'])
    .pipe(cssnano())
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('public/dist'))
});

gulp.task('images', function() {
  return gulp.src('public/images/**/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('public/images'));
});

gulp.task('watch', function() {
  gulp.watch('public/css/*', ['styles']);
});

gulp.task('default', function() {
    gulp.start('styles', 'images');
});
