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

        // have Yeoman greet the user
        this.log(this.yeoman);

        // Have Yeoman greet the user.
        this.log(chalk.magenta('Welcome to the LEGEND... wait for it... Jpgcode generator... DARY!'));

        var prompts = [
            {
                name: 'appName',
                message: 'What is your app\'s name?'
            },
            {
                name: 'addServer',
                message: 'Do you want to enable the HTTP server?',
                default: 'Y/n',
            }
        ];

        this.prompt(prompts, function (props) {
            this.appName = props.appName;
            this.addServer = props.addServer;

            done();
        }.bind(this));
    },

    createFolders: function(){
        this.mkdir('app');
        this.mkdir('app/assets/js');
        this.mkdir('app/assets/styles');
        this.mkdir('app/assets/images');
        this.mkdir('app/assets/fonts');
    },

    copyStyles: function(){
        this.copy('assets/styles/main.scss', 'app/assets/styles/main.scss');
        this.copy('assets/styles/_main.css', 'app/assets/styles/main.css');
        this.copy('assets/styles/_customMixins.scss', 'app/assets/styles/_customMixins.scss');
        this.copy('assets/styles/_vars.scss', 'app/assets/styles/_vars.scss');
    },

    copyScripts: function(){
        this.copy('assets/scripts/main.js', 'app/assets/scripts/main.js');
    },

    copyPages: function(){
        var context = { appname: this.appName };
        if (this.addServer == "n") {
            this.template("_index.html", "app/index.php", context);
        }else{
            this.template("_index.html", "app/index.html", context);
        }
    },

    app: function () {
        this.copy('_bower.json', 'bower.json');
        this.template('_package.json', 'package.json');
        if (this.addServer == "n") {
            this.template('_gruntfile-php.js', 'Gruntfile.js');
        }else{
            this.template('_gruntfile.js', 'Gruntfile.js');
        }

        
        this.copy('config.rb', 'config.rb');
        this.copy('README.md', 'README.md');

        this.copy('.editorconfig', '.editorconfig');
        this.copy('.jshintrc', '.jshintrc');  
        this.copy('.bowerrc', '.bowerrc');
        this.copy('.gitignore', '.gitignore');
    }
});

module.exports = JpgcodeGenerator;
