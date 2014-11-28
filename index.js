'use strict';

var tarte = require('./lib/tarte-jsunit/lib/tarte-dev.js');
var fs = require('fs');

var jsunit = {
  run: function(jspath, cb) {
    if (typeof(cb) === 'function') {
      var f = cb; cb.pass = cb.fail = cb.rterr = f;
    }

    var Ascii = tarte.dev.unit.xenv.node.Ascii;

    var Async = tarte.dev.unit.xenv.Async;

    var testsuite = function(desc, testFn, events) {
      if (!events) { events = {}; }
      var post = ('post' in events) ? events.post : null;
      events.post = function(t, e) {
        if (post) { post(t, e); }
        if (Object.keys(e).length > 0) {
          if ('rterr' in cb) { cb.rterr(e); }
        } else if (t.hasErrors()) {
          if ('fail' in cb) { cb.fail(); }
        } else {
          if ('pass' in cb) { cb.pass(); }
        }
      };
      var suite = new tarte.dev.unit.TestSuite(desc, testFn);
      suite.runTest(events);
    };

    try {
      eval(fs.readFileSync(jspath, { encoding:'utf8' }));
    } catch (e) {
      if ('pgerr' in cb) { cb.pgerr(e); } else { throw e; }
    }
  }
};

module.exports = jsunit;
