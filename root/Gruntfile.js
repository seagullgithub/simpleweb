/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

    // Task configuration.
    sass: {
        dist: {
                options: {
                    //style: "nested"
                },
                files: {
                    'style.css': 'style.scss'
                }
        }
    },

    // watch task for general work
    watch: { 
         options: { livereload: 35730, },
      sass: {
        files: ['*.scss'],
        tasks: ['sass'],
      },
      html: {
        files: ['*.html']
      },
      js: {
        files: ['*.js']
      }
    },

    'http-server': {
      'dev': {

       // the server root directory
       root: '',

       // the server port
       // can also be written as a function, e.g.
       // port: function() { return 8282; }
       port: 80,
       

       // the host ip address
       // If specified to, for example, "127.0.0.1" the server will 
       // only be available on that ip.
       // Specify "0.0.0.0" to be available everywhere
       host: "0.0.0.0",

       cache: 0,
       showDir : true,
       autoIndex: true,

       // server default file extension
       ext: "html",

       // run in parallel with other tasks
       runInBackground: true

       }
    }



  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-http-server');

  // Default task.
  grunt.registerTask('default', 'start watch (all files) and localserver', function(arg) {
    grunt.log.writeln('using livereload:'['green']);
    let livereload_snippet = '<script src="//localhost:' + grunt.config.get('watch.options.livereload') + '/livereload.js"></script>'
    grunt.log.writeln(livereload_snippet['green'].bold);
grunt.task.run(['http-server','watch']);
});

};
