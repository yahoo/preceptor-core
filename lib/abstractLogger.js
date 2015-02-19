// Copyright 2014, Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var Base = require('./base');
var utils = require('./utils');
var util = require('util');
var _ = require('underscore');

var defaults = require('./defaults/logger');

/**
 * @class AbstractLogger
 * @extends Base
 *
 * @property {object} _options
 * @property {int} _batchId
 * @property {string} _level
 */
var AbstractLogger = Base.extend(

    /**
     * Abstract logger constructor
     *
     * @param {object} options
     * @constructor
     */
    function (options) {
        this.__super();

        this._options = utils.deepExtend({}, [defaults, options || {}]);
        this._batchId = 0;
        this._level = this.getOptions().level;

        this.initialize();
    },

    {
        /**
         * Initializes the instance
         *
         * @method initialize
         */
        initialize: function () {
            // Nothing yet
        },


        /**
         * Gets the current batch-id
         *
         * @method getBatchId
         * @return {int}
         */
        getBatchId: function () {
            return this._batchId;
        },

        /**
         * Gets the options
         *
         * @method getOptions
         * @return {object}
         */
        getOptions: function () {
            return this._options || {};
        },

        /**
         * Normalizes the level supplied
         *
         * @method _normalizeLevel
         * @param {string} level
         * @return {string}
         * @private
         */
        _normalizeLevel: function (level) {
            var maps;

            maps = {
                "trace": "TRACE",
                "debug": "DEBUG",
                "info": "INFO ",
                "warn": "WARN ",
                "err": "ERROR",

                "inf": "INFO ",
                "debg": "DEBUG",
                "dbg": "DEBUG",
                "error": "ERROR"
            };

            level = level.trim().toLowerCase();

            if (maps[level]) {
                return maps[level];
            } else {
                return "WARN ";
            }
        },

        /**
         * Gets the value of a level in regards to all other levels
         *
         * @method _levelValue
         * @param {string} level
         * @return {int}
         * @private
         */
        _levelValue: function (level) {
            var maps;

            maps = [
                "TRACE",
                "DEBUG",
                "INFO ",
                "WARN ",
                "ERROR"
            ];

            return maps.indexOf(level) || 10;
        },

        /**
         * Gets the current time-stamp
         *
         * @method _getTime
         * @return {string}
         * @private
         */
        _getTime: function () {
            return (new Date()).toISOString();
        },

        /**
         * Formats a log-entry
         *
         * @method _formatText
         * @param {int} batchId
         * @param {string} time
         * @param {string} level
         * @param {string} text
         * @param {string} [data]
         * @return {string}
         * @private
         */
        _formatText: function (batchId, time, level, text, data) {
            if (data) {
                return util.format("%s %s - %s [%s]", time, level, text, data);
            } else {
                return util.format("%s %s - %s", time, level, text);
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
            throw new Error('Unimplemented function "_output".');
        },

        /**
         * Logs a whole range of entries, all within the same batch and timestamp
         *
         * @method _logRange
         * @param {string} level
         * @param {string[]} args
         * @param {string} [data]
         * @return {int} Id of batch
         * @private
         */
        _logRange: function (level, args, data) {

            var time,
                batchId;

            if (this.isActiveLevel(level)) {

                level = this._normalizeLevel(level);

                this._batchId++;

                time = this._getTime();
                batchId = this.getBatchId();

                if (!_.isArray(args)) {
                    throw new Error('Arguments are not of type array.');
                }

                args.forEach(function (arg) {
                    var outputData = this._formatText(batchId, time, level, arg, data);
                    this._output(batchId, level, outputData);
                }, this);

                return batchId;
            } else {
                return -1;
            }
        },

        /**
         * Is the level active for logging?
         *
         * @method _isActiveLevel
         * @param {string} level
         * @return {boolean}
         */
        isActiveLevel: function (level) {
            level = this._normalizeLevel(level);
            return (this._levelValue(level) >= this._levelValue(this._level));
        },


        /**
         * Logs an info entry
         *
         * @method info
         * @return {int} Id of batch
         */
        info: function () {
            return this._logRange("INFO ", Array.prototype.slice.call(arguments));
        },

        /**
         * Logs a debug entry
         *
         * @method debug
         * @return {int} Id of batch
         */
        debug: function () {
            return this._logRange("DEBUG", Array.prototype.slice.call(arguments));
        },

        /**
         * Logs a trace entry
         *
         * @method debug
         * @return {int} Id of batch
         */
        trace: function () {
            return this._logRange("TRACE", Array.prototype.slice.call(arguments));
        },

        /**
         * Logs a warning entry
         *
         * @method info
         * @return {int} Id of batch
         */
        warn: function () {
            return this._logRange("WARN ", Array.prototype.slice.call(arguments));
        },

        /**
         * Logs an error entry
         *
         * @method err
         * @return {int} Id of batch
         */
        err: function () {
            return this._logRange("ERROR", Array.prototype.slice.call(arguments));
        },


        /**
         * Logging generic entry
         *
         * @param {string} level
         */
        log: function (level) {
            var args = Array.prototype.slice.call(arguments);
            args.shift();

            level = this._normalizeLevel(level);
            if (!_.isArray(args[0])) {
                args[0] = [args[0]];
            }

            return this._logRange(level, args[0], args[1]);
        }
    },

    {
        /**
         * @property TYPE
         * @type {string}
         * @static
         */
        TYPE: 'AbstractLogger'
    });

module.exports = AbstractLogger;
