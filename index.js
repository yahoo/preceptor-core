// Copyright 2014, Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var Base = require('./lib/base');
var utils = require('./lib/utils');

module.exports = {
    Base: Base,
    utils: utils,

    /**
     * Version of the selenium server
     *
     * @type {string}
     */
    version: require('./package.json').version
};