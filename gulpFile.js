var gulp = require('gulp');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var replace = require('gulp-replace');
//var obfuscate = require('gulp-obfuscate');

gulp.task('compress', function() {
  return gulp.src('public/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('public/min-js'));
});

gulp.task('minify-css', function() {
  return gulp.src('public/css/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('public/min-css'));
});

var gulpos = true;

if (gulpos) {
    gulp.task('replace-references', function() {
        return gulp.src('views/*.ejs')
        .pipe(replace('script src="/assets/js/', 'script src="/assets/min-js/'))
        .pipe(replace('link href="/assets/css/', 'link href="/assets/min-css/'))
        .pipe(gulp.dest('views'));
    });
} else {
    gulp.task('replace-references', function() {
        return gulp.src('views/*.ejs')
          .pipe(replace('script src="/assets/min-js/', 'script src="/assets/js/'))
          .pipe(replace('link href="/assets/min-css/', 'link href="/assets/css/'))
          .pipe(gulp.dest('views'));
      });

}

gulp.task('default', gulp.series('compress', 'minify-css', 'replace-references'));
