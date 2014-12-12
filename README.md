# gulp-tarte-jsunit [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]

Gulp plugin of `tarte-jsunit` which is an unit test tool for javascript codes working on Node.js.

`tarte-jsunit` is a part of `js.node` package in `tarte.sourceforge net` project.

## Install

Install `gulp-tarte-jsunit` with npm:

```bash
$ npm install --save-dev gulp-tarte-jsunit
```

## Usage

### Run an unit test

First, load `gulp-tarte-jsunit` module in your gulpfile.js.

```js
var gulp = require('gulp');
var jsunit = require('gulp-tarte-jsunit');
```

Next, write the task to run an unit test like following:

```js
gulp.task('unit', function() {
  jsunit.run('path/of/unit/test/file.js');
});
```

Here, the above string 'path/of/unit/test/file.js' is a Javascript file path containing an unit test program.

Then, you can run an unit test by a following command:

```bash
  $ gulp unit
```

To output a test result to a json file, specify the file path as follows:

```bash
  $ gulp unit --report-file=result.json
```

Moreover, you can specify a test file via a command line argument, you can use this plugin with lint, and so forth.

The `gulpfile.js` in this distribution contains a good example for them.

#### Show a test result with a Web browser

You can show a content of a result json file on a Web browser.
Open `tarte-jsunit-view.html` in this distribution with query string like `?json=result.json`.

### Write a unit test

The structure of test case tree are as follows:

```
   testsuite('description about suite', function() {
     this.testcase('description about case', function() {
       this.scene('description about scene', function() {
         ...
           this.scene('description about end level scene', {
             run: function() {
                ... test process ...
         ...
```

`testsuite` is the top of the tree and it corresponds to a target class normally.
`testcase` is the second level of the tree and it corresponds to methods of a target class normally.
`scene` is the third level or lower of the tree and it corresponds to a condition or a situation normally.

The `tests/test.js` in this distribution is a simplified example how to write a unit test code.


## License

Copyright (C) 2014 Takayuki Sato.

`gulp-tarte-jsunit` is free software under [MIT](http://opensource.org/licenses/MIT) License.
See the file LICENSE in this distribution for more details.

### Dependencies

* `tarte-jsunit` in [tarte/js.node](https://sourceforge.net/projects/tarte/) is free software under [LGPL](http://opensource.org/licenses/lgpl-3.0.html) License.

* `JSON-js` is [public domain](http://creativecommons.org/licenses/publicdomain/) software.

See the file COPYING_DEPEND.md in this distribution for more details.

[npm-image]: http://img.shields.io/badge/npm-v0.2.1-blue.svg
[npm-url]: https://www.npmjs.org/package/gulp-tarte-jsunit
[travis-image]: https://travis-ci.org/sttk/gulp-tarte-jsunit.svg?branch=master
[travis-url]: https://travis-ci.org/sttk/gulp-tarte-jsunit
