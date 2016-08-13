var assets = require('gulp-bower-assets');
var babel = require('gulp-babel');
var bower = require('gulp-bower');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');
var gulp = require('gulp');
var gutil = require('gulp-util');
var pkg = require('./package.json');
var runSequence = require('run-sequence');
var Server = require('karma').Server;
var sourcemaps = require('gulp-sourcemaps');

gulp.task('build', ['build_js'], function() {
});

gulp.task('build_js', function() {
  return gulp.src('src/main/js/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('public/js'));
});

gulp.task('default', ['build', 'tdd'], function() {
  gulp.watch('public/**/*.*').on('change', browserSync.reload);
  gulp.watch('src/main/js/**/*.*', ['build_js']);

  browserSync.init({
    port: 3636,
    server: {baseDir: './'},
    startPath: '/public'
  });
});

gulp.task('dist', function() {
  return gulp.src('src/main/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat(pkg.name + '.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
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

gulp.task('lint', ['lint_js'], function() {
});

gulp.task('lint_js', function() {
  return gulp.src('src/main/js/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('test', function(done) {
  runSequence('lint', 'test_unit', done);
});

gulp.task('test_unit', function(done) {
  return new Server({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

gulp.task('tdd', function() {
  gutil.log(gutil.colors.yellow('Test-driven development'));

  return new Server({
    configFile: __dirname + '/karma.conf.js',
    autoWatch: true,
    logLevel: 'info',
    singleRun: false
  }).start();
});
