// Copyright 2014, Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var Base = require('./lib/base');
var utils = require('./lib/utils');

module.exports = {

    /**
     * Base class
     *
     * @property Base
     * @type {Base}
     */
    Base: Base,

    /**
     * Utils functions
     *
     * @property utils
     * @type {object}
     */
    utils: utils,


    /**
     * Abstract logger
     *
     * @property AbstractLogger
     * @type {AbstractLogger}
     */
    AbstractLogger: require('./lib/abstractLogger'),

    /**
     * Log-Manager class
     *
     * @property logManager
     * @type {LogManager}
     */
    LogManager: require('./lib/logManager'),


    /**
     * Version of the selenium server
     *
     * @type {string}
     */
    version: require('./package.json').version
};