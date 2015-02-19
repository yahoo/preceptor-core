// Copyright 2014, Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var Base = require('./base');
var utils = require('./utils');
var _ = require('underscore');
var AbstractLogger = require('./abstractLogger');
var path = require('path');

var defaults = require('./defaults/logger');

/**
 * @class LogManager
 * @extends Base
 *
 * @property {object} _options
 * @property {object} _loggerList
 * @property {AbstractLogger[]} _activeLogger
 * @property {AbstractLogger} _loggerListener
 */
var LogManager = Base.extend(

    /**
     * Log-Manager constructor
     *
     * @param {object} options
     * @constructor
     */
    function (options) {
        this.__super();

        this._options = utils.deepExtend({}, [defaults, options || {}]);

        this._loggerList = {};
        this._activeLogger = [];
        this._loggerListener = null;

        this.initialize();
    },

    {
        /**
         * Initializes the instance
         *
         * @method initialize
         */
        initialize: function () {

            // Initialize registries
            this._initializeLoggerRegistry();
            this._initializeEventLogger();

            // Make sure the configuration has the correct structure
            this.validate();

            // Augment options with outside data
            this.augment();
        },

        /**
         * Initializes the log registry
         *
         * @method _initializeLogRegistry
         * @private
         */
        _initializeLoggerRegistry: function () {
            var defaultElements = [
                { name: 'callback', fileName: 'callback' },
                { name: 'console', fileName: 'console' },
                { name: 'event', fileName: 'event' },
                { name: 'file', fileName: 'file' }
            ];

            defaultElements.forEach(function (entry) {
                entry.path = path.join(__dirname, 'logger', entry.fileName);
                entry.fn = utils.require(entry.path);
            }, this);

            this.registerLoggerRange(defaultElements);
        },

        /**
         * Initializes the shared event-logger
         *
         * @private
         */
        _initializeEventLogger: function () {
            this._loggerListener = new AbstractLogger();
            this._loggerListener._logRange = this._triggerOnLogger.bind(this);
        },


        /**
         * Triggers a log-event on all active loggers
         *
         * @method _triggerOnLogger
         * @param {string} level
         * @param {string[]} args
         * @param {string} [data]
         * @private
         */
        _triggerOnLogger: function (level, args, data) {
            this.getActiveLogger().forEach(function (logger) {
                logger.log(level, args, data);
            }, this);
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
         * Validate data given
         *
         * @method validate
         */
        validate: function () {
            // Nothing yet
        },

        /**
         * Augment data with default values
         *
         * @method augment
         */
        augment: function () {
            // Nothing yet
        },


        /**
         * Gets a dictionary of registered logger
         *
         * @method getLogList
         * @return {object}
         */
        getLoggerList: function () {
            return this._loggerList || {};
        },

        /**
         * Checks if a logger is registered
         *
         * @method hasLogger
         * @param {string} name
         * @return {boolean}
         */
        hasLogger: function (name) {
            return !!this.getLoggerList()[name.toLowerCase()];
        },

        /**
         * Gets a specific registered logger
         *
         * @method getLogger
         * @param {string} name
         * @return {function}
         */
        getLogger: function (name) {
            return this.getLoggerList()[name.toLowerCase()];
        },

        /**
         * Registers a logger
         *
         * @method registerLogger
         * @param {string} name
         * @param {function} contr
         */
        registerLogger: function (name, contr) {
            this._loggerList[name.toLowerCase()] = contr;
        },

        /**
         * Registers a list of loggers
         *
         * @method registerLoggerRange
         * @param {object[]} list `{ name: <string>, fn: <function> }`
         */
        registerLoggerRange: function (list) {
            list.forEach(function (entry) {
                this.registerLogger(entry.name, entry.fn);
            }, this);
        },


        /**
         * Gets all the active logger
         *
         * @method getActiveLogger
         * @return {AbstractLogger[]}
         */
        getActiveLogger: function () {
            return this._activeLogger || [];
        },

        /**
         * Adds a new logger to the list of active loggers
         *
         * @method addLogger
         * @param {string} name
         * @param {object} [options]
         * @return {AbstractLogger}
         */
        addLogger: function (name, options) {
            var Class = this.getLogger(name.trim().toLowerCase()),
                instance;

            if (!Class) {
                throw new Error('Unknown logger "' + name.trim().toLowerCase() + '"');
            }

            options = options || {};

            instance = new Class(options);
            this.getActiveLogger().push(instance);
            return instance;
        },

        /**
         * Adds a new logger to the list of active loggers
         *
         * @method addLoggerRange
         * @param {string|string[]|object|object[]} logger
         * @return {AbstractLogger[]}
         */
        addLoggerRange: function (logger) {
            var result = [];

            logger = this._normalizeLogger(logger);

            logger.forEach(function (entry) {
                result.push(this.addLogger(entry.type, entry.configuration || {}));
            }, this);

            return result;
        },

        /**
         * Normalizes the logger
         *
         * @method _normalizeLogger
         * @param {string|string[]|object|object[]} logger
         * @return {object[]}
         * @private
         */
        _normalizeLogger: function (logger) {
            var newLogger,
                localLogger = logger;

            // Convert to array
            if (_.isString(localLogger)) {
                localLogger = [localLogger];
            } else if (!_.isArray(localLogger) && _.isObject(localLogger)) {
                localLogger = [localLogger];
            }

            // Format array as needed by the function
            if (_.isArray(localLogger)) {

                newLogger = [];
                localLogger.forEach(function (currentLogger) {

                    if (_.isString(currentLogger)) {
                        newLogger.push({ type: currentLogger });

                    } else if (_.isObject(currentLogger)) {
                        newLogger.push(currentLogger);
                    }
                });
                localLogger = newLogger;
            }

            return localLogger;
        },


        /**
         * Returns the shared event-logger
         *
         * @returns {AbstractLogger}
         */
        logger: function () {
            return this._loggerListener;
        }
    },

    {
        /**
         * @property TYPE
         * @type {string}
         * @static
         */
        TYPE: 'LogManager'
    });

module.exports = LogManager;
