// Copyright 2014, Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var utils = require('../../').utils;

console.log(utils.combine('-', '', '', ''));
// Output: -

console.log(utils.combine('-', 'test1', 'test2'));
// Output: test1-test2

console.log(utils.combine('-', '-test1-', '-test2-'));
// Output: -test1-test2-

console.log(utils.combine('-', 'test1-', 'test2'));
// Output: test1-test2

console.log(utils.combine('-', 'test1', '-test2'));
// Output: test1-test2

