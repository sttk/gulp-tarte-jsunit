'use strict';

var gulp = require('gulp');
var ghelp = require('gulp-showhelp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var grunseq = require('gulp-run-seq');
var events = require('events');
var mapstream = require('map-stream');

var jsunit = require('./index.js');


gulp.task('help', function() {
  ghelp.show();
}).help = 'shows this help message.';


gulp.task('lint-unit', function() {
  var end = grunseq.ender('lint-unit');

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


gulp.task('unit', function() {
  var end = grunseq.ender('unit');
  grunseq.start('lint-unit', function() {
    var js = ghelp.get_argv('js');
    if (js == null) {
      console.log("!ERROR: The option `js' should be specified js path.");
      return;
    }
    jsunit.run(js);

    end();
  });
}).help = {
  '': 'runs a unit test.',
  '--js=v': 'specifys a js path containing a unit test code',
  '[ --report-file=v ]': 'specifys a path of a report file.'
};


gulp.task('default', [ 'help' ]);
