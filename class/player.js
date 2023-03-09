const { Item } = require('./item');
const { Food } = require('./food');

class Player {
  constructor(name, startingRoom) {
    this.name = name;
    this.currentRoom = startingRoom;
    this.items = [];
  }

  move(direction) {
    const nextRoom = this.currentRoom.getRoomInDirection(direction);

    // If the next room is valid, set the player to be in that room
    if (nextRoom) {
      this.currentRoom = nextRoom;

      nextRoom.printRoom(this);
    } else {
      console.log("You cannot move in that direction");
    }
  }

  printInventory() {
    if (this.items.length === 0) {
      console.log(`${this.name} is not carrying anything.`);
    } else {
      console.log(`${this.name} is carrying:`);
      for (let i = 0; i < this.items.length; i++) {
        console.log(`  ${this.items[i].name}`);
      }
    }
  }

  takeItem(itemName) {
    // Fill this in
    const item = this.currentRoom.getItemByName(itemName);
    if (item) {
      this.items.push(item);
      this.currentRoom.items = this.currentRoom.items.filter((i) => i !== item);
    }
  }

  dropItem(itemName) {
    // Fill this in
    const item = this.getItemByName(itemName);
    if (item) {
      this.currentRoom.items.push(item);
      this.items = this.items.filter((i) => i !== item);
    }
  }

  eatItem(itemName) {
    // Fill this in
    const item = this.getItemByName(itemName);
    if (item instanceof Food) {
      this.items = this.items.filter((i) => i !== item);
      console.log(`You have eaten ${item.name}.`);
    } else {
      console.log("You can't eat that!");
    }
  }

  getItemByName(name) {
    // Fill this in
    return this.items.find((item) => item.name === name);
  }
}

module.exports = {
  Player,
};
