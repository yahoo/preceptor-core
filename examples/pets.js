// Copyright 2014-2015, Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var Base = require('../').Base;

/**
 * @class Pet
 * @extends Base
 * @properties {string} _type Type of pet
 * @properties {string} _name Name of pet
 */
var Pet = Base.extend(/**
	 * Constructor of Pet
	 *
	 * @constructor
	 * @param {string} type Type of pet
	 * @param {string} name Name of pet
	 */
	function (type, name) {

		// Call the parent constructor
		this.__super();

		// Save property on the current object
		this._type = type;
		this._name = name;

		// Add instance descriptor
		this.NAME = type + ':' + name;

		// Define here all dynamic values, values that should not be shared between multiple instances of "Pet".
	},

	/** @lends Pet.prototype */
	{ // Properties assigned to the prototype of "Pet"

		/**
		 * Make sound of pet
		 *
		 * @method makeSound
		 * @param {string} sound
		 * @return {string}
		 */
		makeSound: function (sound) {
			this.emit('sound', this.getName(), sound);
			return this.getName() + " says: " + sound;
		},

		/**
		 * Gets the name of the pet
		 *
		 * @return {string}
		 */
		getName: function () {
			return this._name;
		}

		// ...
		// Any other functions and values assigned to the prototype.

		// These properties can be accessed after instantiation with ```petInstance.makeSound()```.

		// You can also define here all values that should be available in instances of "Pet" that should be shared
		// across all object instances.
	},

	/** @lends Pet */
	{ // Properties assigned to the constructor of "Pet"

		/**
		 * @type {string}
		 */
		TYPE: "Pet"

		// ...
		// Any other constructor functions and values.

		// These properties can be accessed with ```Pet.TYPE```.
	});

/**
 * @class Cat
 * @extends Pet
 */
var Cat = Pet.extend(/**
	 * Constructor of Cat
	 *
	 * @constructor
	 * @param {string} name Name of pet
	 */
	function (name) {
		this.__super("cat", name);
	},

	/** @lends Cat.prototype */
	{ // Properties assigned to the prototype of "Cat"
		/**
		 * Make sound of cat
		 *
		 * @method makeSound
		 * @return {string}
		 */
		makeSound: function () {
			return this.__super("miau");
		}
	},

	/** @lends Cat */
	{ // Properties assigned to the constructor of "Cat"
		/**
		 * @type {string}
		 */
		TYPE: "Cat"
	});

/**
 * @class Dog
 * @extends Pet
 */
var Dog = Pet.extend(/**
	 * Constructor of Dog
	 *
	 * @constructor
	 * @param {string} name Name of pet
	 */
	function (name) {
		this.__super("dog", name);
	},

	/** @lends Dog.prototype */
	{ // Properties assigned to the prototype of "Dog"
		/**
		 * Make sound of cat
		 *
		 * @method makeSound
		 * @return {string}
		 */
		makeSound: function () {
			return this.__super("barf");
		}
	},

	/** @lends Dog */
	{ // Properties assigned to the constructor of "Dog"
		/**
		 * @type {string}
		 */
		TYPE: "Dog"
	});

module.exports = {
	Pet: Pet, Cat: Cat, Dog: Dog
};
