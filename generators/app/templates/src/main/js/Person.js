/**
 * @param {string} name - The person's name.
 * @constructor
 */
function Person(name) {
  this.name = name;
}

/**
 * @returns {string} Greeting sentence
 */
Person.prototype.greet = function() {
  return `Hello, my name is ${this.name}.`;
};
