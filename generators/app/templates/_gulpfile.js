var assets = require('gulp-bower-assets');
var bower = require('gulp-bower');
var browserSync = require('browser-sync').create();
var gulp = require('gulp');
var Server = require('karma').Server;
var babel = require('gulp-babel');

gulp.task('build', function() {
  return gulp.src('src/main/js/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('public/js'));
});

gulp.task('default', function() {
  gulp.watch('public/**/*.*').on('change', browserSync.reload);

  browserSync.init({
    port: 3636,
    server: {baseDir: './'},
    startPath: '/public'
  });
});

gulp.task('install', ['install_bower_assets'], function() {
});

gulp.task('install_bower', function() {
  return bower({cmd: 'install'});
});

gulp.task('install_bower_assets', ['install_bower'], function() {
  return gulp.src('bower_assets.json')
    .pipe(assets({prefix: false}))
    .pipe(gulp.dest('public/dependencies'));
});

gulp.task('test', function(done) {
  return new Server({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});
