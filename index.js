'use strict';

var tarte = require('./lib/tarte-jsunit/lib/tarte-dev.js');
var fs = require('fs');

var testsuite = function(desc, testFn, events) {
  var suite = new tarte.dev.unit.TestSuite(desc, testFn);
  suite.runTest(events);
};

var Ascii = tarte.dev.unit.xenv.node.Ascii;
var Async = tarte.dev.unit.xenv.Async;

var jsunit = {
  testsuite: testsuite,
  Ascii: Ascii,
  Async: Async,
  run: function(jspath) {
    eval(fs.readFileSync(jspath, { encoding:'utf8' }));
  }
};

module.exports = jsunit;

