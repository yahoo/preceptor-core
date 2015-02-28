// Copyright 2015, Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var log = require('../').log;

var logger = log.getLogger('test-23');

console.log('-------------------------------------------');
console.log('Trigger logs but buffer output, using default "INFO"');
logger.trace('Trace: ', 1);
logger.debug('Debug: ', '2');
logger.info('Info: ', { test: 3 });
logger.warn('Warn: ', { testObj: { objData: '4' }});
logger.error('Error: ', 5);

console.log('-------------------------------------------');
console.log('Flushing...');
log.flush();

console.log('-------------------------------------------');
console.log('Change the default to "ALL"');
log.setLevel('ALL');

console.log('Has level: ', log.getLevel());

console.log('Trigger logs for all');
logger.trace('Trace: ', 1);
logger.debug('Debug: ', '2');
logger.info('Info: ', { test: 3 });
logger.warn('Warn: ', { testObj: { objData: '4' }});
logger.error('Error: ', 5);

console.log('-------------------------------------------');
console.log('Change the default to "ERROR"');
log.setLevel('ERROR');

console.log('Has level: ', log.getLevel());

console.log('Trigger logs for all');
logger.trace('Trace: ', 1);
logger.debug('Debug: ', '2');
logger.info('Info: ', { test: 3 });
logger.warn('Warn: ', { testObj: { objData: '4' }});
logger.error('Error: ', 5);

console.log('-------------------------------------------');
console.log('Done.');
