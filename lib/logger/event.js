// Copyright 2014, Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var AbstractLogger = require('../abstractLogger');

/**
 * @class EventLogger
 * @extends AbstractLogger
 * @constructor
 */
var EventLogger = AbstractLogger.extend(
    {
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

            if (this.isActiveLevel(level)) {
                this.emit('message', level, args, data);
            }
        }
    });

module.exports = EventLogger;
