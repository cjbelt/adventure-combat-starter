const {Character} = require('./character');
const {Enemy} = require('./enemy');
const {Food} = require('./food');
const { Weapon } = require('./weapon');
const { World } = require('./world');
const { Shopkeeper } = require('./shopkeeper');

class Player extends Character {

  constructor(name, startingRoom, coins) {
    super(name, "main character", startingRoom, coins);

    this.talking = null;
  }

  move(direction) {

    const nextRoom = this.currentRoom.getRoomInDirection(direction);

    // If the next room is valid, set the player to be in that room
    if (nextRoom && nextRoom.locked) {
      console.log("The door is locked. You can't get in!");
    } else if (nextRoom && !(nextRoom.secret.player)) {
      this.currentRoom = nextRoom;

      nextRoom.printRoom(this);

      if (nextRoom.triggers) {
        nextRoom.triggers(this);
      }
    } else {
      console.log("You cannot move in that direction");
    }
  }

  printInventory() {
    if (this.items.length === 0) {
      console.log(`${this.name} is not carrying anything.`);
    } else {
      console.log(`${this.name} is carrying:`);
      for (let i = 0 ; i < this.items.length ; i++) {
        console.log(`  ${this.items[i].name}`);
      }
    }
  }

  hit(name) {
    const enemy = this.currentRoom.getEnemyByName(name);

    if (!(enemy.name)) {
      return;
    }

    enemy.applyDamage(this.strength);
    enemy.attackTarget = this;
    // Fill this in
  }

  die() {
    console.log("You are dead!");
    process.exit();
  }

  talk(characterName) {
    if (this.currentRoom.getShopkeeperByName(characterName)) {
      const character = this.currentRoom.getShopkeeperByName(characterName);
      this.talking = character;

      for (let i = 0; i < character.items.length; i++) {
        console.log(`${character.items[i].name} (${character.items[i].value} coins)`);
      }

      console.log("Type 'buy <item>' to buy something");
    } else {
      console.log("You can't talk to this.");
    }
  }

  buy(shopkeeperName, itemName) {
    const shopkeeper = this.currentRoom.getShopkeeperByName(shopkeeperName);
    const item = shopkeeper.getItemByName(itemName);

    if (this.talking && item && this.coins >= item.value) {
      this.coins -= item.value;
      console.log(`You have ${this.coins} coins`);

      this.items.push(item);
      shopkeeper.removeItem(itemName);
    } else {
      console.log("You can't buy this.");
    }
  }
}

module.exports = {
  Player,
};
