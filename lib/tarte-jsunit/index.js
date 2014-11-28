'use strict';

var tarte = require('./lib/tarte-dev.js');
var fs = require('fs');

var testsuite = function(desc, testFn, events) {
  var suite = new tarte.dev.unit.TestSuite(desc, testFn);
  suite.runTest(events);
};

var jsunit = {
  testsuite: testsuite,
  run: function(jspath) {
    eval(fs.readFileSync(jspath, { encoding:'utf8' }));
  }
};

module.exports = jsunit;

