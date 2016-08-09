var browserSync = require('browser-sync').create();
var gulp = require('gulp');

gulp.task('dev', function () {
  gulp.watch('public/**/*.*').on('change', browserSync.reload);

  browserSync.init({
    port: 3636,
    server: {baseDir: './'},
    startPath: '/public'
  });
});
