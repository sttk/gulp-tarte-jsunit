'use strict';

var gulp = require('gulp');
require('gulp-run-seq');

var ghelp = require('gulp-showhelp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var mapstream = require('map-stream');

var jsunit = require('./index.js');


gulp.task('help', function() {
  ghelp.show();
}).help = 'shows this help message.';


gulp.task('lint-unit', function(end) {
  var js = ghelp.get_argv('js');
  if (js == null) {
    console.log("!ERROR: The option `js' should be specified js path.");
    return;
  }
  function jshintMapper(data, cb) {
    cb((data.jshint.success)?null:new Error(), data);
  }
  gulp.src(js)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(mapstream(jshintMapper))
    .on('error', function(){})
    .on('end', end);
}).help = 'lints unit test codes in the specified js file.';


gulp.task('unit', [ 'lint-unit' ], function(end) {
  var js = ghelp.get_argv('js');
  if (js == null) {
    console.log("!ERROR: The option `js' should be specified js path.");
    return;
  }
  jsunit.run(js, end);
  // This callback function can be set as an object of which properties are:
  //   { pass: cb0,  // If test passed.
  //     fail: cb1,  // If test failed.
  //     rterr: cb2, // If a error was raised in a test code.
  //     pgerr: cb3  // If js code evaluation failed.
  //   }
  // And above code is same as:
  //   jsunit.run(js, { pass:end, fail:end, rterr:end });
}).help = {
  '': 'runs a unit test.',
  '--js=v': 'specifys a js path containing a unit test code',
  '[ --report-file=v ]': 'specifys a path of a report file.'
};


gulp.task('default', [ 'help' ]);
