// Copyright 2014-2015, Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var utils = require('../../').utils;

var obj1 = {
	test: function (value1, value2) {
		console.log("Method test in object 1 and values " + value1 + " and " + value2);
	}
};

var obj2 = {
	test: function (value) {
		this.__super(123, value);
		console.log("Method test in object 2 and value " + value);
	}
};

var result = utils.extendApply(obj1, [obj2], utils.superWrapper);
result.test(88);

var newFn = utils.superWrapper(function (value) {
	this.__super(123, value);
	console.log("Method test in object 2 and value " + value);
}, function (value1, value2) {
	console.log("Method test in object 1 and values " + value1 + " and " + value2);
});
newFn(88);

// Output:
// Method test in object 1 and values 123 and 88
// Method test in object 2 and value 88
