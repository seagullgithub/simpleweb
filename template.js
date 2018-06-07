'use strict';
let path = require("path");
let child_process = require('child_process');



// basic template description. will show up with 'grunt-init --help'
exports.description = 'create project structure for simpleweb project';

// notes will be shown before questions prompts
exports.notes = '';

// if wildcard pattern or array of wildcard patterns is matched, Grunt will abort with a warning.
exports.warnOn = ['index.html', 'main.js', 'style.scss', 'style.css'];

exports.after = '\nhave a nice day!';



//
// The actual init template.
//
exports.template = function(grunt, init, done) {

  init.process({}, [
    // start for prompting for input for the decision tree.
    init.prompt('name', init.destpath().split('\\').pop()),
  ], function(err, props) {

    //
    // gettering project data
    //

    // path to the template e.g. C:\Users\username\.grunt-init\simpleweb
    //props.templateDir = __dirname; 

    // path to the project e.g. C:\Users\username\seagull\table_fixed_header
    props.cwd = path.resolve("./");

    // directory name of the project e.g. table_fixed_header
    props.dir = props.cwd.split('\\').pop();

    // project name (if directoryName == projectName)
    props.projectName = props.dir.replace(/_/g, ' ');



    //
    // (create folders) & copy files
    //

    // Files to copy (and process).
    var files = init.filesToCopy(props);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);


    //
    //  create package.json
    //


    // If package_json == true, generate package.json
    if (props.package_json) {
      var devDependencies = {
        'grunt': '~0.4.5',
        'grunt-contrib-sass': '1.0.0',
        'grunt-contrib-watch': '1.0.0'
      };


      // Generate package.json file
      init.writePackageJSON('package.json', {
        node_version: '>= 0.10.0',
        devDependencies: devDependencies
      });
    }

    // spwan a childprocess to run `npm install`
    // `stdio: 'inherit'` will ensure, that the formating from `npm` will be used
    grunt.util.spawn({
        cmd: 'npm',
        args: ['install'],
        opts: {
          stdio: 'inherit'
        },
      },



      function(err, result, code) {
        done();
      });
  });
};


// cowsay -f bunny have a nice day
