// Copyright 2014-2015, Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var pets = require('./pets');

// Get objects from the pets file
var Cat = pets.Cat;
var Dog = pets.Dog;

// Create instance
var tomTheCat = new Cat("Tom");
var zeusTheDog = new Dog("Zeus");

// Listen to events
tomTheCat.on('sound', function (name, sound) {
	console.log("The cat said " + sound);
});
zeusTheDog.on('sound', function (name, sound) {
	console.log("The dog said " + sound);
});

// Make sounds
console.log(tomTheCat.makeSound());
console.log(zeusTheDog.makeSound());

// Print instance identifier
console.log("Cat object: " + Cat.toString());
console.log("Cat instance", tomTheCat.toString());

console.log("Dog object: " + Dog.toString());
console.log("Dog instance", zeusTheDog.toString());

// Output:
// Tom says: miau
// Zeus says: barf
// Cat object: [Cat]
// Cat instance [Cat::cat:Tom(instance1)]
// Dog object: [Dog]
// Dog instance [Dog::dog:Zeus(instance2)]
