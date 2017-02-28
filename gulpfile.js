// http://qiita.com/hkusu/items/e068bba0ae036b447754
// https://fettblog.eu/gulp-browserify-multiple-bundles/

var gulp = require('gulp');
var rename = require('gulp-rename')
var babel = require('gulp-babel');
var browserify = require('browserify');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var babelify = require('babelify');

gulp.task('browserify', function() {
  var entries = [
    'admin/javascripts/index.jsx'
  ];

  var tasks = entries.map(function(entry) {
    return browserify({entries: ['./assets/' + entry]})
      .transform(babelify)
      .bundle()
      .on("error", function (err) { console.log("Error : " + err.message); })
      .pipe(source(entry))
      .pipe(rename({
        extname: '.bundle.js'
      }))
      .pipe(gulp.dest('./public/'))
  });
});

gulp.task('sass', function() {
  var entries = [
    {
      file: 'admin/stylesheets/index.scss',
      dest: 'admin/stylesheets'
    }
  ];

  entries.map(function(entry) {
    return gulp.src('./assets/' + entry.file)
              .pipe(sass().on('error', sass.logError))
              .pipe(gulp.dest(function(file) {
                return './public/' + entry.dest
              }))
  })
});

gulp.task('watch', function() {
  gulp.watch('./assets/**/*.jsx', ['browserify'])
  gulp.watch('./assets/**/*.scss', ['sass'])
});

gulp.task('default', ['watch']);
