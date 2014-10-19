// Generated on <%%= (new Date).toISOString().split('T')[0] %> using
// <%%= pkg.name %> <%%= pkg.version %>

'use strict';

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);
    
    // measures the time each task takes
    require('time-grunt')(grunt);

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
                files: ['<%%= pkg.app %>/assets/styles/**/*.scss'],
                tasks: ['compass'],
            },
            html: {
                files: ['<%%= pkg.app %>/index.html'],
                tasks: ['copy:dist', 'useminPrepare:html', 'usemin:html'],
            },
            livereload: {
                options: {
                    livereload: true
                },
                files: [
                    '<%%= pkg.app %>/*.html', '<%%= pkg.app %>/assets/styles/*.css'
                ]
            }
        },

        <% if (projectType == "HTML") { %>
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
        <% } %>

        wiredep: {
            app: {
                src: [
                    <% if (projectType == "HTML") { %>
                    '<%%= pkg.app %>/index.html'
                    <% } else{ %>
                    '<%%= pkg.app %>/index.php'
                    <% } %>
                ]
            }
        },

        //Clean folders
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%%= pkg.dist %>/*',
                        '!<%%= pkg.dist %>/.git*'
                    ]
                }]
            },
            postBuild: {
                files: [{
                    dot: true,
                    src: [
                        '<%%= pkg.dist %>/assets/scripts/vendor',
                        '<%%= pkg.dist %>/assets/scripts/plugins.js',
                    ]
                }]
            },
            server: '.tmp'
        },

        useminPrepare: {
            options: {
                dest: '<%%= pkg.dist %>/index.html'
            },
            html: '<%%= pkg.dist %>/index.html'
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            html: ['<%%= pkg.dist %>/{,*/}*.html']
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%%= pkg.app %>/assets/scripts/{,*/}*.js'
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
                    '<%%= pkg.dist %>/assets/scripts/vendor/jquery.js', 
                    //'<%%= config.dist %>/js/vendor/jquery.flexslider.js',
                ],
                dest: '<%%= pkg.dist %>/assets/scripts/plugins.js',
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
                srcPrefix: '<%%= pkg.app %>/bower_components/'
            },
            scripts: {
                options: {
                    destPrefix: '<%%= pkg.dist %>/assets/scripts/'
                },
                files: {
                     //Example
                     'vendor/jquery.js': 'jquery/jquery.js',
                     'vendor/modernizr.js': 'modernizr/modernizr.js'
                }
            }
            /*,
            Use this in case there is some css thats needs to be moved from bower_components folder
            styles: {
                options: {
                    destPrefix: '<%%= pkg.dist %>/assets/styles'
                },
                files: {
                    //Example
                    //'vendor/flexslider.css': 'flexslider/flexslider.css',
                }
            }*/
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
                        cwd: '<%%= pkg.app %>',
                        dest: '<%%= pkg.dist %>',
                        src: [
                            '.htaccess',
                            '{,*/}*.html',
                        ]
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%%= pkg.app %>/assets/styles',
                        dest: '<%%= pkg.dist %>/assets/styles',
                        src: '{,*/}*.css'
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%%= pkg.app %>/assets/fonts',
                        dest: '<%%= pkg.dist %>/assets/fonts',
                        src: '**'
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%%= pkg.app %>/assets/images',
                        dest: '<%%= pkg.dist %>/assets/images',
                        src: '**'
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%%= pkg.app %>/assets/scripts',
                        dest: '<%%= pkg.dist %>/assets/scripts',
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
                    cwd: '<%%= pkg.dist %>/assets/images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: '<%%= pkg.dist %>/assets/images/'
                }]
            }
        },

        uglify: {
            scripts: {
                files: {
                    '<%%= pkg.dist %>/assets/scripts/plugins.min.js': ['<%%= pkg.dist %>/assets/scripts/plugins.js']
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
                'uglify:scripts'
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
            }
        }

    });


    /*--
     Define Grunt tasks
    --*/

    grunt.registerTask('default',[
        <% if (projectType == "HTML") { %>
        'connect:server', 
        'notify:server',
        <% } %>
        'jshint',
        'watch'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'concurrent:dist',
        'clean:postBuild'
    ]);

};