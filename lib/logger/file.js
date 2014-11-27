// Copyright 2014, Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var AbstractLogger = require('../abstractLogger');
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');

/**
 * @class ConsoleLogger
 * @extends AbstractLogger
 * @constructor
 */
var ConsoleLogger = AbstractLogger.extend(
    {
        /**
         * Initializes the instance
         *
         * @method initialize
         */
        initialize: function () {

            var localPath;

            this.__super();

            // Create folder if none given
            localPath = this.getPath();
            localPath = path.resolve(localPath);
            mkdirp.sync(path.dirname(localPath));

            // Delete previous file if there
            if (this.shouldClear() && fs.existsSync(localPath)) {
                fs.unlinkSync(localPath);
            }
        },


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
            fs.appendFileSync(this.getPath(), data + "\n");
        },

        /**
         * Path to log-file
         *
         * @method getPath
         * @return {string}
         */
        getPath: function () {
            return this.getOptions().path || ("log_" + (new Date()) + ".log");
        },

        /**
         * Should log be cleared when setup?
         *
         * @method shouldClear
         * @return {boolean}
         */
        shouldClear: function () {
            return this.getOptions().clear;
        }
    });

module.exports = ConsoleLogger;
