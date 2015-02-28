// Copyright 2014-2015, Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var utils = require('../../').utils;
var result;

var obj1 = {
	"name": "obj1", "entry1": 23, "entry2": 46
};

var obj2 = {
	"name": "obj2", "entry2": 78, "entry3": 2
};

var srcObj = {
	"entry0": 0
};


// Simple extend
console.log("Simple extend:");
utils.extendApply(srcObj, [obj1, obj2]);
console.log(srcObj);


// Extent with apply-function
console.log("Extend with function:");
result = utils.extendApply({}, [obj1, obj2], function (value) {
	return value + 1;
});
console.log(result);


// Extend describing parameters
console.log("Extend logging:");
result = utils.extendApply({}, [obj1, obj2], function (srcValue, dstValue, options) {

	console.log("The value '" + srcValue + "' with key '" + options.key + "' from object with name '" + options.currentObject.name + "' was '" + dstValue + "' in the original object");

	return options.objectIndex + ':' + options.valueIndex;
});
console.log(result);

// Output:
// Simple extend:
// { entry0: 0, name: 'obj2', entry1: 23, entry2: 78, entry3: 2 }
//
// Extend with function:
// { name: 'obj21', entry1: 24, entry2: 79, entry3: 3 }
//
// Extend logging:
// The value 'obj1' with key 'name' from object with name 'obj1' was 'undefined' in the original object
// The value '23' with key 'entry1' from object with name 'obj1' was 'undefined' in the original object
// The value '46' with key 'entry2' from object with name 'obj1' was 'undefined' in the original object
// The value 'obj2' with key 'name' from object with name 'obj2' was '0:0' in the original object
// The value '78' with key 'entry2' from object with name 'obj2' was '0:2' in the original object
// The value '2' with key 'entry3' from object with name 'obj2' was 'undefined' in the original object
// { name: '1:0', entry1: '0:1', entry2: '1:1', entry3: '1:2' }
