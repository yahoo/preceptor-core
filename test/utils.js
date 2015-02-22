/*global describe, it, before, beforeEach, after, afterEach */

// Copyright 2014, Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var path = require('path');
var fs = require('fs');

var utils = require('../').utils;
var expect = require('chai').expect;

describe('utils', function () {

    describe('extendApply', function () {

        beforeEach(function () {
            this.obj1 = {
                "name": "obj1",
                "entry1": 23,
                "entry2": 46
            };

            this.obj2 = {
                "name": "obj2",
                "entry2": 78,
                "entry3": 2
            };
        });

        it('should simply extend', function () {
            var result;

            result = utils.extendApply({ "entry0": 0 }, [this.obj1, this.obj2]);

            expect(result).to.be.deep.equal({
                entry0: 0,
                name: 'obj2',
                entry1: 23,
                entry2: 78,
                entry3: 2
            });
        });

        it('should extend with apply function', function () {
            var result;

            result = utils.extendApply({ "entry0": 0 }, [this.obj1, this.obj2], function (value) {
                return value + 1;
            });

            expect(result).to.be.deep.equal({
                entry0: 0,
                name: 'obj21',
                entry1: 24,
                entry2: 79,
                entry3: 3
            });
        });
    });

    describe('deepExtend', function () {

        describe('Simple copy', function () {

            it('should ignore direct scalars', function () {
                var obj1 = 123;

                expect(utils.deepExtend({}, [obj1])).to.be.deep.equal({});
            });

            it('should copy scalars', function () {
                var obj1,
                    result;

                obj1 = {
                    test1: 123,
                    test2: "hello world"
                };

                result = utils.deepExtend({}, [obj1]);
                obj1.test1 = 789;

                expect(result).to.be.deep.equal({
                    test1: 123,
                    test2: "hello world"
                });
            });

            it('should copy functions', function () {
                var fn = function () {},
                    result,
                    obj1;

                obj1 = {
                    test1: 123,
                    test2: fn
                };

                result = utils.deepExtend({}, [obj1]);
                obj1.test1 = 567;

                expect(result).to.be.deep.equal({
                    test1: 123,
                    test2: fn
                });
            });

            it('should copy objects', function () {
                var obj1,
                    result;

                obj1 = {
                    element1: {
                        test1: 123,
                        test2: "hello world"
                    }
                };

                result = utils.deepExtend({}, [obj1]);
                obj1.element1.test1 = 888;

                expect(result).to.be.deep.equal({
                    element1: {
                        test1: 123,
                        test2: "hello world"
                    }
                });
            });

            it('should copy direct arrays', function () {
                var obj1,
                    result;

                obj1 = [
                    123,
                    "hello world"
                ];

                result = utils.deepExtend([], [obj1]);
                obj1[0] = 45;

                expect(result).to.be.deep.equal([
                    123,
                    "hello world"
                ]);
            });

            it('should copy arrays', function () {
                var obj1,
                    result;

                obj1 = {
                    element1: [
                        123,
                        "hello world"
                    ]
                };

                result = utils.deepExtend({}, [obj1]);
                obj1.element1[0] = 4564;

                expect(result).to.be.deep.equal({
                    element1: [
                        123,
                        "hello world"
                    ]
                });
            });

            it('should deep-copy arrays with objects', function () {
                var result,
                    obj1;

                obj1 = {
                    element1: [
                        123,
                        {
                            item1: 42
                        },
                        "hello world"
                    ]
                };

                result = utils.deepExtend({}, [obj1]);
                obj1.element1[1].item1 = 56;

                expect(result).to.be.deep.equal({
                    element1: [
                        123,
                        {
                            item1: 42
                        },
                        "hello world"
                    ]
                });
            });

            it('should deep-copy arrays with arrays', function () {
                var result,
                    obj1;

                obj1 = {
                    element1: [
                        123,
                        [ "item1", 42 ],
                        "hello world"
                    ]
                };

                result = utils.deepExtend({}, [obj1]);
                obj1.element1[1][1] = 56;

                expect(result).to.be.deep.equal({
                    element1: [
                        123,
                        [ "item1", 42 ],
                        "hello world"
                    ]
                });
            });
        });

        describe('Multiple copies', function () {

            it('should ignore scalars', function () {
                var result,
                    obj1 = {
                        test1: 123,
                        test2: "hello world"
                    },
                    obj2 = 567;

                result = utils.deepExtend({}, [obj1, obj2]);
                obj1.test1 = 564;
                obj2 = 54;

                expect(result).to.be.deep.equal({
                    test1: 123,
                    test2: "hello world"
                });
            });

            it('should ignore unknown', function () {
                var result,
                    obj1 = {
                        test1: 123,
                        test2: "hello world"
                    };

                result = utils.deepExtend({}, [obj1, undefined]);
                obj1.test1 = 45;

                expect(result).to.be.deep.equal({
                    test1: 123,
                    test2: "hello world"
                });
            });

            it('should copy scalars', function () {
                var result,
                    obj1 = {
                        test1: 123,
                        test2: "hello world"
                    },
                    obj2 = {
                        test3: 567
                    };

                result = utils.deepExtend({}, [obj1, obj2]);
                obj1.test1 = 87;
                obj2.test3 = 98;

                expect(result).to.be.deep.equal({
                    test1: 123,
                    test2: "hello world",
                    test3: 567
                });
            });

            it('should copy objects', function () {
                var result,
                    obj1 = {
                        element1: {
                            test1: 123,
                            test2: "hello world"
                        }
                    },
                    obj2 = {
                        element2: {
                            test3: 567
                        }
                    };

                result = utils.deepExtend({}, [obj1, obj2]);
                obj1.element1.test1 = 6768;
                obj2.element2.test3 = 455;

                expect(result).to.be.deep.equal({
                    element1: {
                        test1: 123,
                        test2: "hello world"
                    },
                    element2: {
                        test3: 567
                    }
                });
            });

            it('should copy arrays', function () {
                var result,
                    obj1 = {
                        element1: [123, "hello world"]
                    },
                    obj2 = {
                        element2: [567]
                    };

                result = utils.deepExtend({}, [obj1, obj2]);
                obj1.element1[0] = 54;
                obj2.element2[0] = 44;

                expect(result).to.be.deep.equal({
                    element1: [ 123, "hello world" ],
                    element2: [ 567 ]
                });
            });
        });

        describe('Copy with overwrite', function () {

            it('should copy scalars', function () {
                var result,
                    obj1 = {
                        test1: 123,
                        test2: "hello world"
                    },
                    obj2 = {
                        test1: 567
                    };

                result = utils.deepExtend({}, [obj1, obj2]);
                obj1.test1 = 88;
                obj2.test1 = 556;

                expect(result).to.be.deep.equal({
                    test1: 567,
                    test2: "hello world"
                });
            });

            it('should copy objects', function () {
                var result,
                    obj1 = {
                        element1: {
                            test1: 123,
                            test2: "hello world"
                        }
                    },
                    obj2 = {
                        element1: {
                            test3: 567
                        }
                    };

                result = utils.deepExtend({}, [obj1, obj2]);
                obj1.element1.test1 = 88;
                obj2.element1.test3 = 96;

                expect(result).to.be.deep.equal({
                    element1: {
                        test1: 123,
                        test2: "hello world",
                        test3: 567
                    }
                });
            });

            it('should append arrays', function () {
                var result,
                    obj1 = {
                        element1: [123, "hello world"]
                    },
                    obj2 = {
                        element1: [567]
                    };

                result = utils.deepExtend({}, [obj1, obj2]);
                obj1.element1[0] = 46;
                obj2.element1[0] = 23;

                expect(result).to.be.deep.equal({
                    element1: [ 123, "hello world", 567 ]
                });
            });

            it('should replace arrays', function () {
                var result,
                    obj1 = {
                        element1: [123, "hello world"]
                    },
                    obj2 = {
                        element1: [567]
                    };

                result = utils.deepExtend({}, [obj1, obj2], { replace: true });
                obj1.element1[0] = 89;
                obj2.element1[0] = 96;

                expect(result).to.be.deep.equal({
                    element1: [ 567, "hello world" ]
                });
            });
        });

        describe('Advanced Usage', function () {

            beforeEach(function () {
                this.obj1 = {
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

                this.obj2 = {
                    "entry2": [8, 9],
                    "entry3": 2,
                    "entry5": {
                        "entry7": 21,
                        "entry10": 11
                    }
                };

                this.srcObj = {
                    "entry0": 0,
                    "entry2": [7],
                    "entry5": {
                        "entry0": "zero"
                    }
                };
            });

            it('should deeply extend without replacement', function () {
                var result;

                result = utils.deepExtend(this.srcObj, [this.obj1, this.obj2]);

                expect(result).to.be.deep.equal(
                    {
                        entry0: 0,
                        entry2: [ 7, 5, 6, 8, 9 ],
                        entry5: {
                            entry0: 'zero',
                            entry6: 22,
                            entry7: 21,
                            entry8: {
                                entry9: 9
                            },
                            entry10: 11
                        },
                        entry1: [ 1, 2, 3 ],
                        entry4: 23,
                        entry3: 2
                    }
                );
            });

            it('should deeply extend with replacement', function () {
                var result;

                result = utils.deepExtend(this.srcObj, [this.obj1, this.obj2], { replace: true });

                expect(result).to.be.deep.equal(
                    {
                        entry0: 0,
                        entry2: [ 8, 9 ],
                        entry5: {
                            entry0: 'zero',
                            entry6: 22,
                            entry7: 21,
                            entry8: {
                                entry9: 9
                            },
                            entry10: 11
                        },
                        entry1: [ 1, 2, 3 ],
                        entry4: 23,
                        entry3: 2
                    }
                );
            });
        });
    });

    describe('combine', function () {

        it('should combine only one string', function () {
            expect(utils.combine('-', '', '', '')).to.be.equal('-');
        });

        it('should combine only one string', function () {
            expect(utils.combine('-', 'test1', 'test2')).to.be.equal('test1-test2');
        });

        it('should combine only one string', function () {
            expect(utils.combine('-', '-test1-', '-test2-')).to.be.equal('-test1-test2-');
        });

        it('should combine only one string', function () {
            expect(utils.combine('-', 'test1-', 'test2')).to.be.equal('test1-test2');
        });

        it('should combine only one string', function () {
            expect(utils.combine('-', 'test1', '-test2')).to.be.equal('test1-test2');
        });
    });

    describe('superWrapper', function () {

        it('should create a __super wrapper', function () {

            var newFn,
                result;

            newFn = utils.superWrapper(function (value) {
                return this.__super(123, value);
            }, function (value1, value2) {
                return "Method test in object 1 and values " + value1 + " and " + value2;
            });

            result = newFn(88);

            expect(result).to.be.equal('Method test in object 1 and values 123 and 88');
        });

        it('should ignore non-functions', function () {
            expect(utils.superWrapper(123, 567)).to.equal(123);
        });

        it('should provide a standard function if no value is available', function () {
            var result = utils.superWrapper(function () {
                this.__super();
                return "hello world";
            }, undefined);

            expect(result()).to.equal("hello world");
        });
    });

    describe('fileNameSafe', function () {

        it('should create safe strings', function () {
            expect(utils.fileNameSafe("03 this-is-+a?te%@*st string/12")).to.be.equal("03-this-is--a-te---st-string-12");
        });
    });

    describe('require', function () {

        it('should load a file', function () {
            var filePath = path.join(__dirname, 'resource', 'value.js');

            // Guard
            expect(fs.existsSync(filePath)).to.be.true;

            // Execute & Verify
            expect(utils.require(filePath, 24)).to.be.equal(23);
        });

        it('should fail loading unknown file', function () {
            var filePath = path.join(__dirname, 'resource', 'nonExisting.js');

            // Guard
            expect(fs.existsSync(filePath)).to.be.false;

            // Execute & Verify
            try {
                utils.require(filePath);
                expect(true).to.be.false; // Fail when reaching here
            } catch (err) {
                // Do nothing
            }
        });

        it('should use a default value', function () {
            var filePath = path.join(__dirname, 'resource', 'nonExisting.js');

            // Guard
            expect(fs.existsSync(filePath)).to.be.false;

            // Execute & Verify
            expect(utils.require(filePath, 24)).to.be.equal(24);
        });
    });
});
