'use strict';

testsuite('Unit test sample', function() {
 this.testcase('Usage of asserting functions', function() {
  this.scene('#message', {
   run:function() {
     this.message('a message');
     this.message('string:{1}, number:{2}, boolean:{3}', 'xyz', 123, false);
   }
  });
  this.scene('#hbreak', {
   run:function() {
     this.message('first message');
     this.hbreak();
     this.message('second message');
   }
  });
  this.scene('#pass', {
   run:function() {
     this.pass();
     this.pass('a description.');
   }
  });
  this.scene('#fail', {
   run:function() {
     this.fail();
     this.fail('a description.');
   }
  });
  this.scene('#isTrue', {
   run:function() {
     this.isTrue(true);
     this.isTrue(false);
     this.isTrue(true, 'a description.');
   }
  });
  this.scene('#isFalse', {
   run:function() {
     this.isFalse(false);
     this.isFalse(true);
     this.isFalse(false, 'a description');
   }
  });
  this.scene('#isNull', {
   run:function() {
     this.isNull(null);
     this.isNull(undefined);
     this.isNull('');
     this.isNull(0);
     this.isNull(null, 'a description');
   }
  });
  this.scene('#equal', {
   run:function() {
     this.equal('aaa', 'aaa');
     this.equal('bbb', 'aaa');
     this.equal(123, 123, 'a description');
   }
  });
  this.scene('#match', {
   run:function() {
     this.match('long long long ... string', 'long long long ... string');
     this.match('long long long ... string', 'long long lang ... string');
     this.match('long string', 'long string', 'a description');
   }
  });
 });
 this.testcase('Usage of useful functions', function() {
   this.scene('#matrix', function() {
    this.scene('Show a generated 2d array', {
     run:function() {
       var ar0 = [ 'a', 'b', 'c' ];
       var ar1 = [ 1, 2, 3 ];
       var ar2 = [ true, false ];
       this.matrix(this.showargs, ar0, ar1, ar2);
     }
    });
    this.scene('Pass a generated 2d array to an user function', {
     run:function() {
       var ar0 = [ 1, 2, 3 ];
       var ar1 = [ 4, 5, 6 ];
       this.matrix(this.check, ar0, ar1);
     },
     check:function(v0, v1) {
       function sum(x, y) { return x + y; }
       this.equal(sum(v0, v1), v0 + v1);
     }
    });
    this.scene('Set a function instead of an argument array ', {
     run:function() {
       var ar0 = [ 1, 2, 3 ];
       var ar1 = [ 4, 5, 6 ];
       this.matrix(this.mkar2, ar0, ar1);
     },
     mkar2:function(v0, v1) {
       this.matrix(this.check, [v0], [v1], this.sum);
     },
     sum:function(v0, v1) {
       return (v0 + v1);
     },
     check:function(v0, v1, v2) {
       this.equal(v2, v0 + v1);
     }
    });
   });
   this.scene('#seq', {
    nums: [ 1, 3, 5, 6 ],
    chrs: [ 'v', 'x', 'z' ],
    run:function() {
      this.matrix(this.check_num, this.seq(1, 6, 2));
      this.matrix(this.check_chr, this.seq('v', 'z', 2));
    },
    check_num:function(v) {
      this.equal(this.nums.shift(), v);
    },
    check_chr:function(v) {
      this.equal(this.chrs.shift(), v);
    }
   });
   this.scene('#format', {
    run:function() {
      var msg = this.format('string:{1}, number:{2}, boolean:{3}',
        'xyz', 123, false);
      this.pass(msg);
    }
   });
   this.scene('#formatByArray', {
    run:function() {
      var msg = this.formatByArray('string:{1}, number:{2}, boolean:{3}',
        [ 'xyz', 123, false ]);
      this.pass(msg);
    }
   });
   this.scene('#repeat', {
    repeat: 3,
    run:function() {
      this.pass('This process is repeated 3 times sequencially.');
    }
   });
   this.scene('#pre and #post', {
    repeat: 3,
    run:function() {
      this.pass('run function.');
    },
    pre:function() {
      this.message("This function is called before 'run' function.");
    },
    post:function() {
      this.message("This function is called after 'run' function.");
    }
   });
   this.scene('#commons', function() {
    this.commons({
     mkar1:function(v0) {
       this.matrix(this.check, [v0], this.seq(0, v0.length));
     }
    });
    this.scene('Use commons - (1)', {
     expects: [ 'a', 'b', 'c', '', 'v', 'w', 'x', 'y', 'z', '' ],
     run:function() {
       this.matrix(this.mkar1, ['abc', 'vwxyz']);
     },
     check:function(v0, v1) {
       var c = v0.charAt(v1);
       this.equal(this.expects.shift(), c);
     }
    });
    this.scene('Use commons - (2)', {
     expects: [ '', 'a', 'ab', 'abc', '', 'x', 'xy', 'xyz' ],
     run:function() {
       this.matrix(this.mkar1, ['abc', 'xyz']);
     },
     check:function(v1, v2) {
       var sub = v1.substring(0, v2);
       this.equal(this.expects.shift(), sub);
     }
    });
   });
 });

}, (Ascii) ? {
 pre: function() {
   Async(function() {
     Ascii().underline()
      .fg_cyan().add('\nThis message is printed before test.\n')
      .reset().write();
   }).times(1);
 },
 post: function() {
   Ascii().blink()
     .fg_magenta().add('This message is printed after test.\n\n')
     .reset().write();
 },
 error: function(e) {
   Ascii().blink()
     .fg_red().add('This message is printed when an error is raised\n')
     .fg_yellow().add('=> ' + e).add('\n\n')
     .reset().write();
 }
}:{});
