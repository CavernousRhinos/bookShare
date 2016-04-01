module.exports = function(grunt){
  grunt.initConfig({
    shell: {
      webpack: {
        command: function () {
          return 'node_modules/.bin/webpack';
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'client/**/*.js', 'server/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    sass: {
      dist: {
        files: {
          './client/build/style/style.css':'./client/assets/style/base.scss',
        }
      }
    },
    clean:[
      'client/build/js/components.js',
      'client/build/style/style.css',
      'client/build/style/style.css.map',
      '.sass-cache/**',
    ],
    babel: {
      options: {
        sourceMap: true,
        presets: ['es2015', 'react']
      },
      dist: {
        files: {
          'client/build/js/components.js': 'client/components/App.jsx'
        }
      }
    },
    watch: {
      files: ['./client/assets/style/base.scss',
              './client/**/*.jsx',
              './client/**/*.js' ,
              './client/build/index.html',
              '!./client/build/bundle.js'],
      tasks: ['clean', 'sass', 'shell:webpack']
    },
    nodemon: {
      dev: {
        script: 'server/server.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('build', ['clean','sass', 'shell:webpack']);
  grunt.registerTask('run', ['clean','sass', 'shell:webpack', 'nodemon']);
}