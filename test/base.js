/*global describe, it, before, beforeEach, after, afterEach */

// Copyright 2014, Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var Base = require('../').Base;
var expect = require('chai').expect;

var Cat, Dog;

describe('Base', function () {

	beforeEach(function () {
		this.Class = Base;
	});

	describe('Constructor', function () {

		it('should have a TYPE', function () {
			expect(this.Class.TYPE).to.exist;
			expect(this.Class.TYPE).to.equal('Base');
		});

		it('should be convertible to string', function () {
			expect(this.Class.toString()).to.equal("[" + this.Class.TYPE + "]")
		});
	});

	describe('Instance', function () {

		beforeEach(function () {
			this.instance = new this.Class();
		});

		it('should have a NAME', function () {
			expect(this.instance.NAME).to.exist;
			expect(this.instance.NAME).to.equal('unnamed');
		});

		it('should have a unique id', function () {
			expect(this.instance._uniqueId).to.exist;
			expect(this.instance._uniqueId).to.contain('instance');
		});

		it('should be convertible to string', function () {
			expect(this.instance.toString()).to.equal("[" + this.Class.TYPE + "::" + this.instance.NAME + "(" + this.instance._uniqueId + ")" + "]")
		});
	});

    describe('Inheritance', function () {

        before(function () {
            Cat = require('../example/pets').Cat;
            Dog = require('../example/pets').Dog;
        });

        beforeEach(function () {
            this.tomTheCat = new Cat("Tom");
            this.zeusTheDog = new Dog("Zeus");
        });

        it('should identify new object correctly', function () {
            expect(Cat.toString()).to.be.equal('[Cat]');
            expect(Dog.toString()).to.be.equal('[Dog]');
        });

        it('should identify instance correctly with correct instance counter', function () {
            // Should be the fifth instance!
            expect(this.tomTheCat.toString()).to.be.equal('[Cat::cat:Tom(instance6)]');
            expect(this.zeusTheDog.toString()).to.be.equal('[Dog::dog:Zeus(instance7)]');
        });

        it('should call parent methods', function () {
            expect(this.tomTheCat.makeSound()).to.be.equal('Tom says: miau');
            expect(this.zeusTheDog.makeSound()).to.be.equal('Zeus says: barf');
        });
    });

    it('should use default constructor if none given', function () {
        var Class1 = Base.extend(function () { this.value = 33; }, { item1:1 }),
            Class2 = Class1.extend({ item2:2 }),
            instance = new Class2();

        expect(instance.item1).to.be.equal(1);
        expect(instance.item2).to.be.equal(2);

        expect(instance.value).to.be.equal(33);
    });
});

