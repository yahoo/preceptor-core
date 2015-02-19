// Copyright 2014, Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var AbstractLogger = require('../abstractLogger');

/**
 * @class ConsoleLogger
 * @extends AbstractLogger
 * @constructor
 */
var ConsoleLogger = AbstractLogger.extend(
    {
        /**
         * Output of data
         *
         * @method _output
         * @param {int} batchId
         * @param {string} level
         * @param {string} data
         * @private
         */
        _output: function (batchId, level, data) {

            var method,
                maps;

            maps = {
                "TRACE": "info",
                "DEBUG": "info",
                "INFO ": "info",
                "WARN ": "warn",
                "ERROR": "error"
            };

            method = maps[level];
            if (!method) {
                method = "log";
            }

            console[method](data);
        }
    });

module.exports = ConsoleLogger;
