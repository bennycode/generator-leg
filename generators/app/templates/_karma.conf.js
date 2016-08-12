module.exports = function(config) {
  config.set({
    autoWatch: false,
    basePath: '',
    browsers: ['Chrome'],
    colors: true,
    concurrency: Infinity,
    exclude: [],
    files: [
      'public/dependencies/**/*.js',
      'src/main/js/**/*.js',
      'test/unit/js/**/*Spec.js'
    ],
    frameworks: ['jasmine'],
    logLevel: config.LOG_DEBUG,
    port: 9876,
    preprocessors: {},
    reporters: ['progress'],
    singleRun: true
  })
};
