'use strict';

module.exports = function(grunt) {
 
    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Configurable paths
    var config = {
        app: 'app',
        dist: 'dist'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        //Project settings
        config: config,
 
        // Compile Sass files
        compass: {
            dist: {
              options: {
                config: 'config.rb'
              }
            }
        },
 
        // Minify JS
        uglify: {
            options: {
                banner: ''
            },
            target: {
                // Source file
                src: ['<%%= config.app %>/js/scripts.js'],
 
                // Minified new file
                dest: '<%%= config.app %>/js/scripts.min.js'
 
            }
        },
 
        // Optimize images
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: '<%%= config.app %>/images-orig/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: '<%%= config.app %>/images/'
                }]
            }
        },
 
        // Watch files and trigger tasks
        watch: {
            sass: {
                files: ['<%%= config.app %>/sass/**/*.scss'],
                tasks: ['compass'],
            },
            uglify: {
                files: ['<%%= config.app %>/js/*.js'],
                tasks: ['uglify']
            },
            imagemin:{
                files: ['<%%= config.app %>/images-orig/*.{png,jpg,gif}'],
                tasks: ['imagemin']
            },
            livereload: {
                options: {
                    livereload: true
                },
                files: [
                    '<%%= config.app %>/*.html', '<%%= config.app %>/css/*.css'
                ]
            }
        },

        // Empties folders to start fresh
        clean: {
          dist: {
            files: [{
              dot: true,
              src: [
                '.tmp',
                '<%%= config.dist %>/*',
                '!<%%= config.dist %>/.git*'
              ]
            }]
          },
          server: '.tmp'
        },

        // Automatically inject Bower components into the HTML file
        wiredep: {
          app: {
            ignorePath: /^<%%= config.app %>\/|\.\.\//,
            src: ['<%%= config.app %>/index.html']
          },
          sass: {
            src: ['<%%= config.app %>/sass/{,*/}*.{scss,sass}'],
            ignorePath: /(\.\.\/){1,2}bower_components\//
          }
        },

        useminPrepare: {
          options: {
            dest: '<%%= config.dist %>'
          },
          html: '<%%= config.app %>/index.html'
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
          options: {
            assetsDirs: ['<%%= config.dist %>', '<%%= config.dist %>/images']
          },
          html: ['<%%= config.dist %>/{,*/}*.html'],
          css: ['<%%= config.dist %>/css/{,*/}*.css']
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
          options: {
            jshintrc: '.jshintrc',
            reporter: require('jshint-stylish')
          },
          all: [
            'Gruntfile.js',
            '<%= config.app %>/js/{,*/}*.js'
          ]
        },

        // Renames files for browser caching purposes
        rev: {
          dist: {
            files: {
              src: [
                '<%%= config.dist %>/js/{,*/}*.js',
                '<%%= config.dist %>/css/{,*/}*.css',
                '<%%= config.dist %>/images/{,*/}*.*',
                '<%%= config.dist %>/*.{ico,png}'
              ]
            }
          }
        },
        
        copy: {
          dist: {
            files: [{
              expand: true,
              dot: true,
              cwd: '<%%= config.app %>',
              dest: '<%%= config.dist %>',
              src: [
                '*.{ico,png,txt}',
                '.htaccess',
                '{,*/}*.html',
              ]
            }]
          },

          styles: {
            expand: true,
            dot: true,
            cwd: '<%%= config.app %>/css',
            dest: '.tmp/css/',
            src: '{,*/}*.css'
          }
        }

    });

 
    /*--
     Define Grunt tasks
    --*/

    grunt.registerTask('default', ['watch']);

    grunt.registerTask('hint', ['jshint']);

    grunt.registerTask('build', [
        'clean:dist',
        'wiredep',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'copy:dist',
        'rev',
        'usemin'
    ]);
 
};