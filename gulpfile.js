var config = {
  'root': 'app/',
  'src': 'app/assets/'
}

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minify = require('gulp-minify'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin'),
    connect = require('gulp-connect');

gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});

gulp.task('sass', function () {
  return gulp.src(config.src + 'scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
    }))
    .pipe(rename(function (path) {
      path.basename += ".min";
    }))
    .pipe(gulp.dest(config.src + 'css'))
    .pipe(connect.reload());
});

gulp.task('javascript', function() {
  return gulp.src(config.src + 'js/src/*.js')
    .pipe(minify({
      ext:{
          src:'.js',
          min:'.min.js'
      },
      ignoreFiles: ['.min.js'],
      noSource: true
    }))
    .pipe(gulp.dest(config.src + 'js'))
    .pipe(connect.reload());
});

gulp.task('images', function() {
  return gulp.src(config.src + 'img/*')
    .pipe(imagemin())
    .pipe(gulp.dest(config.src + 'img'))
    .pipe(connect.reload());
});

gulp.task('html', function () {
  return gulp.src(config.root + '*.html')
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch(config.src + 'scss/**/*.scss', ['sass']);
  gulp.watch(config.src + 'js/src/*.js', ['javascript']);
  gulp.watch(config.root + '*.html', ['html']);
});

gulp.task('default', ['connect', 'watch'], function() {

});
