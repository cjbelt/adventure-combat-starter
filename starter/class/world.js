const { Room } = require('./room');
const { Item } = require('./item');
const { Food } = require('./food');
const { Enemy } = require('./enemy');
const { Weapon } = require('./weapon');
const { Armor } = require('./armor');
const { Giant } = require('./giant');
const { Coins } = require('./coins');
const { Key } = require('./key');
const { Shopkeeper } = require('./shopkeeper');

class World {

  static rooms = {};
  static enemies = [];
  static shopkeepers = [];

  static setPlayer(player) {
    for (let i = 0 ; i < World.enemies.length ; i++) {
      if (World.enemies[i]) {
        World.enemies[i].setPlayer(player);
      }
    }
  }

  static startGame() {
    for (let i = 0 ; i < World.enemies.length ; i++) {
      if (World.enemies[i]) {
        World.enemies[i].rest();
      }
    }
  }

  static getCharactersInRoom(key, room) {
    return World[key].filter(character => character.currentRoom === room);
  }

  static getShopkeepersInRoom(room) {
    return World.shopkeepers.filter((shopkeeper) => shopkeeper.room === room);
  }

  static getEnemyByName(enemyName) {
    for (let i = 0; i < World.enemies.length; i++) {
      if (World.enemies[i].name === enemyName) {
        return World.enemies[i];
      }
    }
  }

  static createItem(obj) {
    let newItem;

      if (obj.isFood) {
        newItem = new Food(obj.name, obj.description, obj.heal);
      } else if (obj.isWeapon) {
        newItem = new Weapon(obj.name, obj.description, obj.power, obj.value);
      } else if (obj.isArmor) {
        newItem = new Armor(obj.name, obj.description, obj.protection, obj.value);
      } else if (obj.isCoin) {
        newItem = new Coins(obj.quantity);
      } else if (obj.isKey) {
        newItem = new Key(obj.name, obj.description, World.rooms[obj.unlocks]);
      } else {
        newItem = new Item(obj.name, obj.description, obj.value);
      }

    return newItem;
  }

  static loadWorld(worldData) {

    const roomList = worldData.rooms;
    const itemList = worldData.items;
    const enemyList = worldData.enemies;
    const shopList = worldData.shopkeepers;

    // Instantiate new room objects
    // Get name, id and description from room data
    for (let i = 0 ; i < roomList.length ; i++) {

        let roomData = roomList[i];
        let newRoom = new Room(roomData.name, roomData.description, roomData.secret, roomData.locked, roomData.alternate);

        World.rooms[roomData.id] = newRoom;
    }

    // Connect rooms by ID
    // Note that all rooms must be created before they can be connected
    for (let i = 0 ; i < roomList.length ; i++) {

      let roomID = roomList[i].id;
      let roomConnections = roomList[i].exits;

      for (const direction in roomConnections) {
        let connectedRoomID = roomConnections[direction];
        let roomToConnect = World.rooms[connectedRoomID];
        World.rooms[roomID].connectRooms(direction, roomToConnect);
      }

    }

    // insert room triggers
    for (let i = 0; i < roomList.length; i++) {
      let roomID = roomList[i].id;
      let room = World.rooms[roomID];

      for (let id in worldData.triggers) {
        if (id == roomID) {
          room.triggers = worldData.triggers[id];
        }
      }
    }

    // Instantiate items
    for (let i = 0 ; i < itemList.length ; i++) {

      let itemData = itemList[i];
      const newItem = World.createItem(itemData);

      let itemRoom = World.rooms[itemData.room];

      if (itemRoom.alternate) {
        itemRoom.alternate.items.push(newItem);
      } else {
        itemRoom.items.push(newItem);
      }
   }

    // Instantiate enemies
    for (let i = 0 ; i < enemyList.length ; i++) {

      let enemyData = enemyList[i];
      let enemyRoom = World.rooms[enemyData.room];
      let newEnemy;
      if (enemyData.isGiant) {
        newEnemy = new Giant(enemyData.name, enemyData.description, enemyRoom);
      } else {
        newEnemy = new Enemy(enemyData.name, enemyData.description, enemyRoom);
      }

      World.enemies.push(newEnemy);
    }

    // Instantiate shopkeeper
    for (let i = 0 ; i < shopList.length ; i++) {

      let shopData = shopList[i];
      let shopRoom = World.rooms[shopData.room];

      const newShopkeeper = new Shopkeeper(shopRoom);

      for (let i = 0; i < shopData.items.length; i++) {
        const item = this.createItem(shopData.items[i]);
        newShopkeeper.items.push(item)
      }

      World.shopkeepers.push(newShopkeeper);
    }
  }
}

module.exports = {
  World
};
