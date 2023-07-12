const { Food } = require('./food');
const { Weapon } = require('./weapon');
const { Armor } = require('./armor');
const { Coins } = require('./coins');
const { Key } = require('./key');

class Character {

  constructor(name, description, currentRoom, coins = 0) {
    // Fill this in
    this.name = name;
    this.description = description;
    this.currentRoom = currentRoom;

    this.health = 100;
    this.items = [];
    this.equiped = null;
    this.strength = 10;
    this.armor = null;
    this.coins = coins;
  }

  applyDamage(amount) {
    // Fill this in
    let protection;

    if (this.armor) {
      protection = this.armor.protection;
    } else {
      protection = null;
    }

    this.health -= amount * (1 - protection);

    if (this.health <= 0) {
      this.die();
    }
  }

  die() {
    // Fill this in
    while (this.items.length > 0) {
      this.dropItem(this.items[0].name);
    }

    if (this.coins > 0) {
      const coins = new Coins(this.coins);
      this.coins = 0;
      this.currentRoom.items.push(coins);
    }

    this.currentRoom = null;
  }

  dropItem(itemName) {
    const item = this.getItemByName(itemName);
    let inventory = this.items;

    this.currentRoom.items.push(item);
    this.removeItem(itemName);
    // Fill this in
  }

  takeItem(itemName) {
    // Fill this in
    const item = this.currentRoom.getItemByName(itemName);
    if (item instanceof Coins) {
      this.coins += item.quantity;
      console.log(`You have ${this.coins} coins`);
    } else {
      this.items.push(item);
    }
    this.currentRoom.removeItem(itemName);
  }

  eatItem(itemName) {
    // Fill this in
    const item = this.getItemByName(itemName);

    if (item instanceof Food) {
      console.log(`You ate a ${item.name}!`);
      this.health += item.heal;
      this.removeItem(itemName);
    }
  }

  equipItem(itemName) {
    const item = this.getItemByName(itemName);

    if (this.equiped && this.equiped.name === "flashlight") {
      this.revealRoom();
      this.currentRoom.printRoom();
    }

    if (item instanceof Weapon) {
      let power;
      if (this.equiped) {
        power = this.equiped.power;
      } else {
        power = 0;
      }

      this.strength -= power;
      this.equiped = item;
      this.strength += this.equiped.power;
      console.log(`item equiped: ${this.equiped.name}`, `player strength: ${this.strength}`);
    } else if (item instanceof Armor) {
      this.armor = item;
    } else if (item.name === "flashlight") {
      this.equiped = item;
      this.revealRoom();
      this.currentRoom.printRoom();
    } else if (item instanceof Key) {
      this.unlock(item);
    }
  }

  getItemByName(name) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name === name) {
        return this.items[i];
      }
    }

    return {};
    // Fill this in
  }

  removeItem(itemName) {
    const item = this.getItemByName(itemName);
    const index = this.items.indexOf(item);
    this.items = this.items.slice(0, index).concat(this.items.slice(index + 1));
  }

  revealRoom() {
    const { World } = require('./world');

    const rooms = World.rooms;

    for (let room in rooms) {
      if (rooms[room].alternate) {
        let name = rooms[room].name;
        let description = rooms[room].description;
        let items = rooms[room].items;
        rooms[room].name = rooms[room].alternate.name;
        rooms[room].description = rooms[room].alternate.description;
        rooms[room].items = rooms[room].alternate.items;
        rooms[room].alternate.name = name;
        rooms[room].alternate.description = description;
        rooms[room].alternate.items = items;
      }
    }
  }

  unlock(key) {
    for (let direction in this.currentRoom.exits) {
      if (this.currentRoom.exits[direction] === key.room) {
        this.currentRoom.exits[direction].locked = false;
        console.log("You've unlocked the door!");
      }
    }
  }
}

module.exports = {
  Character,
};
