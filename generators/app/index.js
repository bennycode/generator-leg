'use strict';

var chalk = require('chalk');
var path = require('path');
var wrench = require('wrench');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function() {
    var parentDirectory = path.resolve(process.cwd());
    var currentDirectory = path.basename(parentDirectory);

    this.log(yosay(
      'Welcome to the phenomenal ' + chalk.yellow('generator-leg') + ' generator!'
    ));

    var organizationName = {
      message: 'Your project name is "' + chalk.yellow(currentDirectory) + '".\r\n'
      + 'Please tell me now the name of your GitHub organization:',
      name: 'organizationName',
      type: 'input'
    };

    var prompts = [organizationName];

    return this.prompt(prompts).then(function(props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
      this.props.projectName = currentDirectory;
    }.bind(this));
  },
  configuring: {},
  default: {},
  writing: {
    writeMainFiles: function() {
      this.log(`Writing files for ${chalk.yellow(this.props.organizationName + '/' + this.props.projectName)}...`);

      // .idea
      this.template('_.idea/_codeStyleSettings.xml', '.idea/codeStyleSettings.xml', this, {});
      this.template('_.idea/_misc.xml', '.idea/misc.xml', this, {});
      this.template('_.idea/_modules.xml', '.idea/modules.xml', this, {});
      this.template('_.idea/_project.iml', '.idea/' + this.props.projectName + '.iml', this, {});
      // this.template('_.idea/_vcs.xml', '.idea/vcs.xml', this, {});
      this.template('_.idea/_watcherTasks.xml', '.idea/watcherTasks.xml', this, {});

      // public
      wrench.copyDirSyncRecursive(this.templatePath('public'), this.destinationPath('public'), {forceDelete: true});

      // src
      wrench.copyDirSyncRecursive(this.templatePath('src'), this.destinationPath('src'), {forceDelete: true});

      // test
      wrench.copyDirSyncRecursive(this.templatePath('test'), this.destinationPath('test'), {forceDelete: true});

      this.template('_.babelrc', '.babelrc', this, {});
      this.template('_.editorconfig', '.editorconfig', this, {});
      this.template('_.gitattributes', '.gitattributes', this, {});
      this.template('_.gitignore', '.gitignore', this, {});
      this.template('_bower.json', 'bower.json', this, {});
      this.template('_bower_assets.json', 'bower_assets.json', this, {});
      this.template('_gulpfile.js', 'gulpfile.js', this, {});
      this.template('_karma.conf.js', 'karma.conf.js', this, {});
      this.template('_package.json', 'package.json', this, {});
    }
  },
  install: {
    installDependencies: function() {
      this.log('\r\nRunning ' + chalk.yellow('npm install') + ' for you...\r\n');
      this.npmInstall();
    }
  }
});
