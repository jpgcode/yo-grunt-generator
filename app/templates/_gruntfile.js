'use strict';

module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Configurable paths
    var config = {
        app: 'app',
        dist: 'build'
    };


    /*--
     Define the configuration for all the tasks
    --*/
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

        // Watch files and trigger tasks
        watch: {
            sass: {
                files: ['<%= config.app %>/sass/**/*.scss'],
                tasks: ['compass'],
            },
            html: {
                files: ['<%= config.app %>/index.php'],
                tasks: ['copy:dist', 'useminPrepare:html', 'usemin:html'],
            },
            livereload: {
                options: {
                    livereload: true
                },
                files: [
                    '<%= config.app %>/*.html', '<%= config.app %>/css/*.css'
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
                '<%= config.dist %>/*',
                '!<%= config.dist %>/.git*'
              ]
            }]
          },
          postBuild: {
            files: [{
              dot: true,
              src: [
                '<%= config.dist %>/js/vendor',
                '<%= config.dist %>/js/plugins.js',
              ]
            }]
          },
          server: '.tmp'
        },

        useminPrepare: {
          options: {
            dest: '<%= config.dist %>/index.html'
          },
          html: '<%= config.dist %>/index.html'
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
          html: ['<%= config.dist %>/{,*/}*.html']
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
          options: {
            jshintrc: '.jshintrc',
            reporter: require('jshint-stylish')
          },
          all: [
            'Gruntfile.js',
            '/js/{,*/}*.js'
          ]
        },

        /*-- 
          Files to concat
          This needs to be updated based on the project preferences
        --*/

        concat: {
          options: {
            separator: ';',
          },

          //All the plugins needs to be configured here
          dist: {
            src: [
              //Example
              '<%= config.dist %>/js/vendor/jquery.js', 
              //'<%= config.dist %>/js/vendor/jquery.flexslider.js',
              //'<%= config.dist %>/js/vendor/customForms.js',
              //'<%= config.dist %>/js/vendor/spritespin.js'
            ],
            dest: '<%= config.dist %>/js/plugins.js',
          },
        },


        /*--
          End of concat method
          Remove this when you update the files correctly
        --*/

        // Optimize images
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>/images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: '<%= config.dist %>/images/'
                }]
            }
        },


        /*--
          Files that needs to be moved from bower_components folder
          This needs to be updated based on the project preferences
        --*/
        bowercopy: {
            options: {
                srcPrefix: '<%= config.app %>/bower_components'
            },
            scripts: {
                options: {
                    destPrefix: '<%= config.dist %>/js/'
                },
                files: {
                     //Example
                     // 'vendor/jquery.js': 'jquery/jquery.js',
                     // 'vendor/jquery.flexslider.js': 'flexslider/jquery.flexslider.js'
                }
            },
            styles: {
                options: {
                    destPrefix: '<%= config.dist %>/css/'
                },
                files: {
                    //Example
                    //'vendor/flexslider.css': 'flexslider/flexslider.css',
                }
            }
        },
        /*--
          End of Bower copy method
          Remove this when you update the files correctly
        --*/

        
        /*--
          Files to copy on build, add here any file specific to your project
          This needs to be updated based on the project preferences
        --*/
        copy: {
          dist: {
            files: [
              {
                expand: true,
                dot: true,
                cwd: '<%= config.app %>',
                dest: '<%= config.dist %>',
                src: [
                  '.htaccess',
                  '{,*/}*.html',
                ]
              },
              {
                expand: true,
                dot: true,
                cwd: '<%= config.app %>/css',
                dest: '<%= config.dist %>/css',
                src: '{,*/}*.css'
              },
              {
                expand: true,
                dot: true,
                cwd: '<%= config.app %>/fonts',
                dest: '<%= config.dist %>/fonts',
                src: '**'
              },
              {
                expand: true,
                dot: true,
                cwd: '<%= config.app %>/images',
                dest: '<%= config.dist %>/images',
                src: '**'
              },
              {
                expand: true,
                dot: true,
                cwd: '<%= config.app %>/js',
                dest: '<%= config.dist %>/js',
                src: '{,*/}*.js',
              }
            ]
          }
        },

        /*--
          End of copy method
          Remove this when you update the files correctly
        --*/
        uglify: {
          scripts: {
            files: {
              '<%= config.dist %>/js/plugins.min.js': ['<%= config.dist %>/js/plugins.js']
            }
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
        'bowercopy',
        'copy:dist',
        'imagemin',
        'useminPrepare',
        'concat',
        'usemin',
        'uglify:scripts',
        'clean:postBuild'
    ]);

};