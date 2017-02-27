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
    'app/index.jsx'
  ];

  var tasks = entries.map(function(entry) {
    return browserify({entries: ['./assets/javascripts/' + entry]})
      .transform(babelify)
      .bundle()
      .on("error", function (err) { console.log("Error : " + err.message); })
      .pipe(source(entry))
      .pipe(rename({
        extname: '.bundle.js'
      }))
      .pipe(gulp.dest('./public/javascripts/'))
  });
});

gulp.task('sass', function() {
  var entries = [
    {
      file: 'app/index.scss',
      dest: 'app'
    }
  ];

  entries.map(function(entry) {
    return gulp.src('./assets/stylesheets/' + entry.file)
              .pipe(sass().on('error', sass.logError))
              .pipe(gulp.dest(function(file) {
                return './public/stylesheets/' + entry.dest
              }))
  })
});

gulp.task('watch', function() {
  gulp.watch('./assets/javascripts/**/*.jsx', ['browserify'])
  gulp.watch('./assets/stylesheets/**/*.scss', ['sass'])
});

gulp.task('default', ['watch']);
