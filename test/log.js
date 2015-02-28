/*global describe, it, before, beforeEach, after, afterEach */

// Copyright 2015, Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var log = require('../').log;
var expect = require('chai').expect;

describe('log', function () {

	beforeEach(function () {
	});

	it('should have a default level', function () {
		expect(log.getLevel()).to.be.equal('INFO');
	});

	it('should change the level', function () {
		log.setLevel('DEBUG');
		expect(log.getLevel()).to.be.equal('DEBUG');
	});

	it('should get the internal logger', function () {
		expect(log._getInternalLogger()).to.be.not.undefined;
	});

	describe('Logger', function () {

		it('should get a logger', function () {
			log.getLogger(__filename);
		});

		it('should log', function () {
			var logger = log.getLogger(__filename);
			logger.info('Info message', { test: 23 });
		});

		it('should flush', function () {
			log.flush();
		});
	});
});
