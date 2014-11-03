// Copyright 2014, Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var utils = require('../../').utils;
var result;

var obj1 = {
    "entry1": [1, 2, 3],
    "entry2": [5, 6],
    "entry4": 23,
    "entry5": {
        "entry6": 22,
        "entry7": 24,
        "entry8": {
            "entry9": 9
        }
    }
};

var obj2 = {
    "entry2": [8, 9],
    "entry3": 2,
    "entry5": {
        "entry7": 21,
        "entry10": 11
    }
};

var srcObj = {
    "entry0": 0,
    "entry2": [7],
    "entry5": {
        "entry0": "zero"
    }
};

utils.deepExtend(srcObj, [obj1, obj2]);
console.log(srcObj);

// Output:
// { entry0: 0,
//    entry2: [ 7, 5, 6, 8, 9 ],
//    entry5:
//    { entry0: 'zero',
//        entry6: 22,
//        entry7: 21,
//        entry8: { entry9: 9 },
//        entry10: 11 },
//    entry1: [ 1, 2, 3 ],
//        entry4: 23,
//    entry3: 2 }


result = utils.deepExtend({}, [obj1, obj2], { replace: true });
console.log(result);

// Output:
// { entry1: [ 1, 2, 3 ],
//    entry2: [ 8, 9 ],
//    entry4: 23,
//    entry5: { entry6: 22, entry7: 21, entry8: { entry9: 9 }, entry10: 11 },
//    entry3: 2 }
