// Generated using generator-jpgWebApp

'use strict';

module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    /*--
     Define the configuration for all the tasks
    --*/
    grunt.initConfig({

        // contains some project configuration properties
        pkg: require('./package.json'),

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
                files: ['<%= pkg.app %>/sass/**/*.scss'],
                tasks: ['compass'],
            },
            html: {
                files: ['<%= pkg.app %>/index.html'],
                tasks: ['copy:dist', 'useminPrepare:html', 'usemin:html'],
            },
            livereload: {
                options: {
                    livereload: true
                },
                files: [
                    '<%= pkg.app %>/*.html', '<%= pkg.app %>/css/*.css'
                ]
            }
        },

        //Run http server and open browser
        connect: {
            server: {
                options: {
                    base: 'app',
                    open: true,
                    port: 9000,
                    livereload: 35729,
                    hostname: '0.0.0.0'
                }
            }
        },

        //Clean folders
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= pkg.dist %>/*',
                        '!<%= pkg.dist %>/.git*'
                    ]
                }]
            },
            postBuild: {
                files: [{
                    dot: true,
                    src: [
                        '<%= pkg.dist %>/js/vendor',
                        '<%= pkg.dist %>/js/plugins.js',
                    ]
                }]
            },
            server: '.tmp'
        },

        useminPrepare: {
            options: {
                dest: '<%= pkg.dist %>/index.html'
            },
            html: '<%= pkg.dist %>/index.html'
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            html: ['<%= pkg.dist %>/{,*/}*.html']
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
                    '<%= pkg.dist %>/js/vendor/jquery.js', 
                    //'<%= config.dist %>/js/vendor/jquery.flexslider.js',
                    //'<%= config.dist %>/js/vendor/customForms.js',
                    //'<%= config.dist %>/js/vendor/spritespin.js'
                ],
                dest: '<%= pkg.dist %>/js/plugins.js',
            },
        },


        /*--
          End of concat method
          Remove this when you update the files correctly
        --*/

        /*--
          Files that needs to be moved from bower_components folder
          This needs to be updated based on the project preferences
        --*/
        bowercopy: {
            options: {
                srcPrefix: '<%= pkg.app %>/bower_components'
            },
            scripts: {
                options: {
                    destPrefix: '<%= pkg.dist %>/js/'
                },
                files: {
                     //Example
                     // 'vendor/jquery.js': 'jquery/jquery.js',
                     // 'vendor/jquery.flexslider.js': 'flexslider/jquery.flexslider.js'
                }
            },
            styles: {
                options: {
                    destPrefix: '<%= pkg.dist %>/css/'
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
                        cwd: '<%= pkg.app %>',
                        dest: '<%= pkg.dist %>',
                        src: [
                            '.htaccess',
                            '{,*/}*.html',
                        ]
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= pkg.app %>/css',
                        dest: '<%= pkg.dist %>/css',
                        src: '{,*/}*.css'
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= pkg.app %>/fonts',
                        dest: '<%= pkg.dist %>/fonts',
                        src: '**'
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= pkg.app %>/images',
                        dest: '<%= pkg.dist %>/images',
                        src: '**'
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= pkg.app %>/js',
                        dest: '<%= pkg.dist %>/js',
                        src: '{,*/}*.js',
                    }
                ]
            }
        },

        /*--
          End of copy method
          Remove this when you update the files correctly
        --*/

        // Optimize images
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: '<%= pkg.dist %>/images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: '<%= pkg.dist %>/images/'
                }]
            }
        },

        uglify: {
            scripts: {
                files: {
                    '<%= pkg.dist %>/js/plugins.min.js': ['<%= pkg.dist %>/js/plugins.js']
                }
            }
        },

        concurrent: {
            dist: [
                'bowercopy',
                'copy:dist',
                'imagemin',
                'useminPrepare',
                'concat',
                'usemin',
                'uglify:scripts',
            ]
        },

        notify: {
            server: {
                options: {
                    message: 'Server up and running!'
                }
            },
            build: {
                options: {
                    message: 'Build completed!'
                }
            },
            watch: {
                options: {
                    message: 'Changes reloaded!'
                }
            }
        }

    });


    /*--
     Define Grunt tasks
    --*/

    grunt.registerTask('default',[
        'connect:server', 
        'notify:server',
        'jshint',
        'watch'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'concurrent:dist',
        'clean:postBuild'
    ]);

};