// Copyright 2014, Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var AbstractLogger = require('../abstractLogger');

/**
 * @class CallbackLogger
 * @extends AbstractLogger
 * @constructor
 */
var CallbackLogger = AbstractLogger.extend(
    {
        /**
         * Initializes the instance
         *
         * @method initialize
         */
        initialize: function () {
            this.__super();
            this._listeners = [];
        },


        /**
         * Adds a listener
         *
         * @param {function} fn
         */
        addListener: function (fn) {
            this._listeners.push(fn);
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
            this._listeners.forEach(function (listenerFn) {
                listenerFn(batchId, level, data);
            });
        }
    });

module.exports = CallbackLogger;
