// FILL THIS OUT
// import the Item class
const { Item } = require('./item');

class Food extends Item {
  constructor(name, description, nutrition) {
    super(name, description);
    this.nutrition = nutrition;
  }
}

module.exports = {
  Food,
};
