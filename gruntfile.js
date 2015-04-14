// Gruntfile with the configuration of grunt-express and grunt-open. No livereload yet!
module.exports = function(grunt) {
 
  // Load Grunt tasks declared in the package.json file
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
 
  // Configure Grunt 
  grunt.initConfig({

    htmlbuild: {
        source: {
            src: 'template/source/index.html',
            dest: 'source/index.html',
            options: {
                beautify: true,
                relative: true,
                scripts: {
                    bundle: [
                        'source/js/config/config.js'
                    ]
                },
                styles: {
                    bundle: [ 
                        'source/css/dist/css/bootstrap.css',
                        'source/css/attach.css'
                    ]
                },
                sections: {
                    layout: {
                        header: 'template/source/header.html',
                        footer: 'template/source/footer.html'
                    }
                },
            }
        }
    },

    uglify: {
      my_target: {
        files: [{
            expand: true,
            cwd: 'source/js/lib',
            src: '**/*.js',
            dest: 'distro/js/lib'
        }]
      }
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'source/css',
          src: '**/*.css',
          dest: 'distro/css',
        }]
      }
    },

    bower: {
      dev: {
        dest: 'source/',
        js_dest: 'source/js/lib',
        options: {
          ignorePackages: ['jquery'],
          packageSpecific: {
            bootstrap: {
              css_dest: 'source/css',
              fonts_dest: 'source/css/'
            }
          }
        }
      }
    },

    copy: {
      index: {
        expand: true,
        cwd: 'source/',
        src: 'index.html',
        dest: 'distro/',
      },
      views: {
        expand: true,
        cwd: 'source/views',
        src: '*.html',
        dest: 'distro/views',
      },
      config: {
        expand: true,
        cwd: 'source/js/config',
        src: '*.js',
        dest: 'distro/js/config',
      },
      scripts: {
        expand: true,
        cwd: 'source/js/scripts/',
        src: '**/*.js',
        dest: 'distro/js/scripts/',
      },
      js: {
        expand: true,
        cwd: 'source/js/',
        src: '*.js',
        dest: 'distro/js/',
      }
    },

    concat: {
      distro: {
        src: ['distro/js/lib/**.js',
              'distro/js/lib/dist/js/**.js',
              'distro/js/main.js',
              'distro/js/scripts/app.js',
              'distro/js/scripts/**/*.js'],
        dest: 'distro/js/distro.js'
      }
    },

    jshint: {

      all: ['source/js/scripts/**/*.js',
            'source/js/scripts/*.js',
            'source/js/config/*.js',
            'source/js/*.js'],

      beforeconcat: ['distro/js/lib/**.js',
                    'distro/js/lib/dist/js/**.js',
                    'distro/js/main.js',
                    'distro/js/scripts/app.js',
                    'distro/js/scripts/**/*.js'],
      afterconcat: ['distro/js/distro.js']
    },
   
    //*****************************************************
 
    // grunt-express will serve the files from the folders listed in `bases`
    // on specified `port` and `hostname`
    express: {
      all: {
        options: {
          port: 9000,
          hostname: "0.0.0.0",
          bases: ['source'], // Replace with the directory you want the files served from
                              // Make sure you don't use `.` or `..` in the path as Express
                              // is likely to return 403 Forbidden responses if you do
                              // http://stackoverflow.com/questions/14594121/express-res-sendfile-throwing-forbidden-error
          livereload: true
        }
      }
    },
 
    // grunt-watch will monitor the projects files
    watch: {
      all: {
        // Replace with whatever file you want to trigger the update from
        // Either as a String for a single entry 
        // or an Array of String for multiple entries
        // You can use globing patterns like `css/**/*.css`
        // See https://github.com/gruntjs/grunt-contrib-watch#files
        tasks: ['jshint:all'],
        files: [
                'index.html',
                'source/**/*.js',
                'source/config/**.js',
                'source/scripts/**/*.js',
                'source/css/dist/**.css'],
        options: {
          livereload: true
        }
      }
    },
 
    // grunt-open will open your browser at the project's URL
    open: {
      all: {
        // Gets the port from the connect configuration
        path: 'http://localhost:<%= express.all.options.port%>'
      }
    }
  });
 
  // Creates the `swam` task
  grunt.registerTask('swam', [
    'express',
    'bower',
    'htmlbuild:source',
    'open',
    'watch'
  ]);

  grunt.registerTask('packing', [
    'jshint',
    'uglify',
    'cssmin',
    'copy:index',
    'copy:views',
    'copy:config',
    'copy:scripts',
    'copy:js',
    'concat:distro'
  ]);

};