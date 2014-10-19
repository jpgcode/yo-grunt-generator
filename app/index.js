'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var JpgcodeGenerator = yeoman.generators.Base.extend({
    init: function () {
        var that = this;
        this.pkg = require('../package.json');

        this.on('end', function () {
            if (!this.options['skip-install']) {
                this.installDependencies({callback: function(){
                    that.spawnCommand('grunt', ['wiredep']);
                    that.log(chalk.cyan('Your project is ready, now run grunt and let the magic begin!'));
                }});
            }
        });
    },

    askFor: function () {
        var done = this.async();

        // have Yeoman greet the user
        this.log(this.yeoman);

        // Have Yeoman greet the user.
        this.log(chalk.cyan('Hi, please to meet you! This is gonna be LEGEND... wait-for-it... DARY!'));

        var prompts = [
            {
                name: 'appName',
                message: 'What is your app\'s name?'
            },
            {
                type: 'list',
                name: 'projectType',
                message: 'Your project will be html or PHP?',
                choices: ['HTML', 'PHP']
            }
        ];

        this.prompt(prompts, function (props) {
            this.appName = props.appName;
            this.projectType = props.projectType;

            done();
        }.bind(this));
    },

    createFolders: function(){
        this.mkdir('app');
        this.mkdir('app/assets/scripts');
        this.mkdir('app/assets/styles');
        this.mkdir('app/assets/images');
        this.mkdir('app/assets/fonts');
    },

    copyStyles: function(){
        this.copy('assets/styles/main.scss', 'app/assets/styles/main.scss');
        this.copy('assets/styles/_main.css', 'app/assets/styles/main.css');
        this.copy('assets/styles/_mixins.scss', 'app/assets/styles/_mixins.scss');
        this.copy('assets/styles/_vars.scss', 'app/assets/styles/_vars.scss');
    },

    copyScripts: function(){
        this.copy('assets/scripts/main.js', 'app/assets/scripts/main.js');
        this.copy('assets/scripts/util.js', 'app/assets/scripts/util.js');
    },

    copyPages: function(){
        var context = { appname: this.appName };
        
        var finalURL;
        (this.projectType == "HTML")? finalURL="app/index.html" : finalURL="app/index.php";
        
        this.template("_index.html", finalURL, context);
        
    },

    app: function () {
        this.copy('_bower.json', 'bower.json');
        this.template('_package.json', 'package.json');
        this.template('_gruntfile.js', 'Gruntfile.js');
        
        this.copy('config.rb', 'config.rb');
        this.copy('README.md', 'README.md');

        this.copy('.editorconfig', '.editorconfig');
        this.copy('.jshintrc', '.jshintrc');  
        this.copy('.bowerrc', '.bowerrc');
        this.copy('.gitignore', '.gitignore');
    }
});

module.exports = JpgcodeGenerator;
