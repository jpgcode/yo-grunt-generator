'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var JpgcodeGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the LEGEND... wait for it... Jpgcode generator... DARY!'));

    var prompts = [
      {
        name: 'appName',
        message: 'What is your app\'s name?'}
    ];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;
      this.addDemoSection = props.addDemoSection;

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('app');
    this.mkdir('app/css');
    this.mkdir('app/sass');
    this.mkdir('app/js');
    this.mkdir('app/images');
    this.mkdir('app/images-orig');

    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
    this.copy('.bowerrc', '.bowerrc');
    this.copy('.gitignore', '.gitignore');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('_styles.scss', 'app/sass/styles.scss');
    this.copy('styles.css', 'app/css/styles.css');
    this.copy('_scripts.js', 'app/js/scripts.js');
    this.copy('_customMixins.scss', 'app/sass/_customMixins.scss');
    this.copy('_config.rb', 'config.rb');
    this.copy('_gruntfile.js', 'Gruntfile.js');

    var context = { 
        appname: this.appName 
    };

    this.template("_index.html", "app/index.html", context);
  }
});

module.exports = JpgcodeGenerator;
