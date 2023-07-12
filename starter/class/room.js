class Room {

  constructor(name, description, secret = {}, locked = false, alternate) {
    this.name = name;
    this.description = description;
    this.secret = secret;
    this.exits = {};
    this.items = [];
    this.locked = locked;
    this.alternate = alternate;
    this.triggers = null;
  }

  getCharacters(type) {
    const { World } = require('./world');
    return World.getCharactersInRoom(type, this);
  }

  getShopkeepers() {
    const { World } = require('./world');

    return World.getCharactersInRoom("shopkeepers", this);
  }

  printRoom() {
    const { World } = require('./world');

    console.clear();
    console.log("");
    console.log(this.name);
    console.log("");
    console.log(this.description);
    console.log("");
    if (this.getCharacters("enemies").length > 0) {
      console.log(`Enemies: ${this.getCharacters("enemies").map(enemy => enemy.name).join(", ")}`);
    }
    if (this.getCharacters("shopkeepers").length > 0) {
      console.log(`There's a shopkeeper in front of you. Type "talk shopkeeper" to buy new items!`);
    }
    if (this.items.length > 0) {
      console.log(`Items: ${this.items.map(item => item.name).join(", ")}`);
    }
    console.log(this.getExitsString());
    console.log("");
  }

  getExits() {
    const exits = Object.keys(this.exits).filter((exit) => !(this.exits[exit].secret.player === true));

    return exits;
  }

  getExitsString() {
    return `Exits: ${this.getExits().join(", ")}`
  }

  connectRooms(direction, connectingRoom) {

    // Check if the direction and connecting room are valid
    if (['n', 's', 'e', 'w'].indexOf(direction) < 0 || !connectingRoom) {
      throw new Error("Error: Invalid room connection");
    }

    this.exits[direction] = connectingRoom;
  }

  getRoomInDirection(direction) {
    return this.exits[direction];
  }

  findHideout() {
    this.printRoom();

    for (let exit in this.exits) {
      if (this.exits[exit].secret.player) {
        this.exits[exit].secret.player = undefined;
        this.printRoom();
        console.log("You found a secret hideout!");
      }
    }
  }

  getItemByName(name) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name === name) {
        return this.items[i];
      }
    }

    return null;
    // Fill this in
  }

  getEnemyByName(name) {
    const { World } = require('./world');

    let result = this.getCharacters("enemies").reduce((accum, enemy) => {
    if (enemy.name === name) {
        return enemy;
    }

    return accum;
  }, {});

  return result;
    // Fill this in
  }

  getShopkeeperByName(name) {
    let result = this.getCharacters("shopkeepers").reduce((accum, shop) => {
      if (shop.name === name) {
        return shop;
      }

      return accum;
    }, null);

    return result;
  }

  removeItem(itemName) {
    const item = this.getItemByName(itemName);
    const index = this.items.indexOf(item);
    this.items = this.items.slice(0, index).concat(this.items.slice(index + 1));
  }
}

module.exports = {
  Room
}
