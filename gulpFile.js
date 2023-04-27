var gulp = require('gulp');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
//var replace = require('gulp-replace');

gulp.task('compress', function() {
  return gulp.src('public/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('public/js'));
});

gulp.task('minify-css', function() {
  return gulp.src('public/css/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('public/css'));
});

/* gulp.task('replace-references', function() {
  return gulp.src('views/*.ejs')
    .pipe(replace('script src="/js/', 'script src="/minified-js/'))
    .pipe(gulp.dest('views'));
}); */

gulp.task('default', gulp.series('compress', 'minify-css'));