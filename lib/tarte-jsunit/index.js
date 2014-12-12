'use strict';

var tarte = require('./lib/tarte-dev.js');
var fs = require('fs');

var jsunit = {
  testsuite: function(desc, testFn, events) {
    var suite = new tarte.dev.unit.TestSuite(desc, testFn);
    suite.runTest(events);
  },
  Ascii: tarte.dev.unit.xenv.node.Ascii,
  Async: tarte.dev.unit.xenv.Async,

  run: function(jspath, cb) {
    if (typeof(cb) === 'function') {
      var f = cb; cb = {}; cb.pass = cb.fail = cb.rterr = f;
    }
    var Ascii = tarte.dev.unit.xenv.node.Ascii;
    var Async = tarte.dev.unit.xenv.Async;

    var testsuite = function(desc, testFn, events) {
      var ev = {}, postFn = null;
      if (events != null) {
        if ('pre' in events) {
          ev.pre = function(t) { events.pre(t); };
        }
        if ('error' in events) {
          ev.error = function(e, t) { events.error(e, t); };
        }
        if ('post' in events) {
          postFn = function(t) { events.post(t); };
        }
      }

      ev.post = function(t) {
        if (postFn != null) { postFn(t); }
        if (t.hasErrors()) {
          if ('rterr' in cb) { cb.rterr(); }
        } else if (t.hasFaults()) {
          if ('fail' in cb) { cb.fail(); }
        } else {
          if ('pass' in cb) { cb.pass(); }
        }
      };

      var suite = new tarte.dev.unit.TestSuite(desc, testFn);
      suite.runTest(ev);
    };

    try {
      eval(fs.readFileSync(jspath, { encoding:'utf8' }));
    } catch (e) {
      if ('pgerr' in cb) { cb.pgerr(e); } else { throw e; }
    }
  }
};

module.exports = jsunit;
