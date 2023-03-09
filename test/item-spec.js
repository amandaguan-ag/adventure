const { expect } = require("chai");

const { Player } = require("../class/player.js");
const { Room } = require("../class/room.js");
const { Item } = require("../class/item.js");
const { Food } = require("../class/food.js");
const { World } = require("../class/world");

const worldData = require("../data/world-data");

describe("Item", function () {
  it("should have name and description attributes", function () {
    let item = new Item("rock", "just a simple rock");

    expect(item.name).to.equal("rock");
    expect(item.description).to.equal("just a simple rock");
  });

  //Overall, this test is checking that the getItemByName() function of the Player class is able to retrieve an item object from the player's inventory based on its name, and returns the correct object.
  it("can be retrieved from player inventory by name", function () {
    //a unit test for a function getItemByName() in a Player class
    let item = new Item("rock", "just a simple rock"); //creates a new Item object with the name "rock" and description "just a simple rock"
    let room = new Room("Test Room", "A test room"); //creates a Room object and a Player object with the name "player"
    let player = new Player("player", room); //and assigns the Room object to the Player's location.

    player.items.push(item); //adds the Item object to the Player's inventory by pushing it to the items array of the Player object
    expect(player.items.length).to.equal(1); //indicates that the item was successfully added to player's inventory

    expect(player.getItemByName("rock")).to.equal(item); //calls the getItemByName() function on the Player object with the argument "rock" and expects the returned item object to be equal to the Item object created earlier.
  });
  //Overall, this test is checking that the getItemByName() function of the Room class is able to retrieve an item from a room by its name, and returns the correct object.
  it("can be retrieved from a room by name", function () {
    let item = new Item("rock", "just a simple rock");
    let room = new Room("Test Room", "A test room");

    room.items.push(item); //adds the created item to the items array of the room instance.
    expect(room.items.length).to.equal(1); //indicates that the item was successfully added to the room.

    expect(room.getItemByName("rock")).to.equal(item);
  });
  //Overall, this test verifies that the system can correctly add and remove items from rooms and players and search for items by name.
  it("can be picked up from a room by a player", function () {
    let item = new Item("rock", "just a simple rock");
    let room = new Room("Test Room", "A test room");
    let player = new Player("player", room);

    room.items.push(item); //item is added to the room's item list
    expect(room.items.length).to.equal(1); //checks if the item was successfully added to the room
    expect(player.items.length).to.equal(0); //checks that the player doesn't have any items

    player.takeItem("rock");

    expect(room.items.length).to.equal(0); //verifies that the item was removed from the room's item list
    expect(player.items.length).to.equal(1); //checks that the player now has the item in its item list

    expect(player.getItemByName("rock")).to.equal(item);
  });
  //Overall, this test verifies that the system can correctly add and remove items from rooms and players and search for items by name.
  it("can be dropped into a room by a player", function () {
    let item = new Item("rock", "just a simple rock");
    let room = new Room("Test Room", "A test room");
    let player = new Player("player", room);

    player.items.push(item); //pushes the Item object into the Player object's items array
    expect(room.items.length).to.equal(0); //checks that the Room object's items array is empty
    expect(player.items.length).to.equal(1); //Player object's items array has one item

    player.dropItem("rock");

    expect(room.items.length).to.equal(1); //checks that the Room object's items array has one item
    expect(player.items.length).to.equal(0); //Player object's items array is empty

    expect(room.getItemByName("rock")).to.equal(item);
  });
  //his test is ensuring that the world simulation program is correctly loading world data and storing items in the appropriate rooms. Specifically, it ensures that the "rock" item exists in the "Crossroad" room.
  it("a rock should exist within the Crossroad", function () {
    let world = new World(); //World class is a container for the rooms and items in the simulated world. It has a loadWorld method that takes world data as an argument and initializes the world's rooms and items based on that data.
    world.loadWorld(worldData); //first creating Room objects for each room in the world, using the Room constructor. It then connects the rooms together by their id properties, which are defined in the worldData object. Finally, it creates Item objects for each item in the world, using either the Item or Food constructor depending on whether the item is food or not. It adds each item to the appropriate Room object's items array.

    room = world.rooms[1]; //World class is a container for the rooms and items in the simulated world. It has a loadWorld method that takes world data as an argument and initializes the world's rooms and items based on that data.
    roomItems = room.items; //items property is an array that contains all the items in the room.
    expect(roomItems[0].name).to.equal("rock"); //checks whether the first item in the "Crossroad" room's items array has a name of "rock"
  });
});

describe("Food", function () {
  it("should have name and description attributes", function () {
    let food = new Food("sandwich", "a delicious sandwich");

    expect(food.name).to.equal("sandwich");
    expect(food.description).to.equal("a delicious sandwich");
  });
//checking whether an instance of the Food class is also an instance of the Item and Food classes, and whether an instance of the Item class is an instance of only the Item class and not the Food class.
  it("should be an instance of Item and Food", function () {
    let food = new Food("sandwich", "a delicious sandwich");
    let item = new Item("rock", "just a simple rock");

    expect(food instanceof Item).to.be.true;//expects that food is an instance of both Item and Food
    expect(food instanceof Food).to.be.true;

    expect(item instanceof Item).to.be.true;//item is an instance of only the Item class and not the Food class.
    expect(item instanceof Food).to.be.false;
  });
//checking if the function eatItem on the Player object removes a food item from the player's inventory when the player eats it
  it("can be eaten by a player", function () {
    let food = new Food("sandwich", "a delicious sandwich");
    let room = new Room("Test Room", "A test room");
    let player = new Player("player", room);

    player.items.push(food);

    expect(player.items.length).to.equal(1);

    player.eatItem("sandwich");

    expect(player.items.length).to.equal(0);
  });

  it("cannot be eaten by a player if not food", function () {
    let item = new Item("rock", "just a simple rock");
    let room = new Room("Test Room", "A test room");
    let player = new Player("player", room);

    player.items.push(item);

    expect(player.items.length).to.equal(1);

    player.eatItem("rock");

    expect(player.items.length).to.equal(1);
  });

  it("a sandwich should exist at the Northern point", function () {
    let world = new World();
    world.loadWorld(worldData);

    room = world.rooms[2];
    roomItems = room.items;
    expect(roomItems[0].name).to.equal("sandwich");
  });
});
