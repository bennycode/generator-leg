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

      this.template('_.idea/_codeStyleSettings.xml', '.idea/codeStyleSettings.xml', this, {});
      this.template('_.idea/_jsLibraryMappings.xml', '.idea/jsLibraryMappings.xml', this, {});
      this.template('_.idea/_modules.xml', '.idea/modules.xml', this, {});
      this.template('_.idea/_project.iml', '.idea/' + this.props.projectName + '.iml', this, {});
      this.template('_.idea/_watcherTasks.xml', '.idea/watcherTasks.xml', this, {});
      wrench.copyDirSyncRecursive(this.templatePath('public'), this.destinationPath('public'), {forceDelete: true});
      this.template('_.bowerrc', '.bowerrc', this, {});
      this.template('_.gitignore', '.gitignore', this, {});
      this.template('_bower.json', '.bower.json', this, {});
      this.template('_gulpfile.js', 'gulpfile.js', this, {});
      this.template('_package.json', 'package.json', this, {});
      this.fs.copy(
        this.templatePath('npm_install.sh'),
        this.destinationPath('npm_install.sh')
      );
    }
  },
  install: {
    installDependencies: function() {
      if (process.env.TRAVIS) {
        return;
      }

      this.log('\r\nRunning ' + chalk.yellow('npm install') + ' for you...\r\n');
      this.npmInstall();
    }
  }
});
