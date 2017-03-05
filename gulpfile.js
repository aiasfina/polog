// http://qiita.com/hkusu/items/e068bba0ae036b447754
// https://fettblog.eu/gulp-browserify-multiple-bundles/

var path = require('path');
var gulp = require('gulp');
var rename = require('gulp-rename')
var babel = require('gulp-babel');
var browserify = require('browserify');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var babelify = require('babelify');

gulp.task('browserify', function() {
  var entries = [
    'admin/javascripts/index.jsx',
    'javascripts/index.js'
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
    },
    {
      file: 'stylesheets/index.scss',
      dest: 'stylesheets'
    }
  ];

  var includePaths = [
    path.join(__dirname, '/node_modules/bootstrap-sass/assets/stylesheets/'),
    path.join(__dirname, '/node_modules/font-awesome/scss/'),
    path.join(__dirname, '/node_modules/bootstrap-tagsinput/dist/'),
    path.join(__dirname, '/node_modules/simplemde/dist/'),
    path.join(__dirname, '/node_modules/dropzone/dist/')
  ]

  entries.map(function(entry) {
    return gulp.src('./assets/' + entry.file)
              .pipe(sass({
                includePaths: includePaths
              }).on('error', sass.logError))
              .pipe(gulp.dest(function(file) {
                return './public/' + entry.dest
              }))
  })
});

gulp.task('watch', function() {
  gulp.watch(['./assets/**/*.jsx', './assets/**/*.js'], ['browserify'])
  gulp.watch('./assets/**/*.scss', ['sass'])
});

gulp.task('default', ['watch']);
