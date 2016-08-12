'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-leg:app', function() {
  before(function() {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({
        skipInstall: true
      })
      .withPrompts({
        projectName: 'awesome-webapp',
        organizationName: 'welovecoding'
      })
      .toPromise();
  });

  it('creates files', function() {
    assert.file([
      '.editorconfig',
      '.gitattributes',
      '.gitignore',
      'bower.json',
      'bower_assets.json',
      'gulpfile.js',
      'karma.conf.js',
      'package.json',
    ]);
  });
});
