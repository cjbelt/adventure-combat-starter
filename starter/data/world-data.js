module.exports = {
  rooms: [
    {
      id: 1,
      name: "Crossroad",
      description: "You are standing at a crossroad. To the north, east, south and west you see some roads.",
      exits: {n: 2, e: 3, w: 4, s: 5},
      secret: {}
    },
    {
      id: 2,
      name: "Northern road",
      description: "You are standing at a road in the north point of a crossroad. To the north, you see the King's City. To the south, you see an intersection.",
      exits: {s: 1, n: 14},
      secret: {}
    },
    {
      id: 3,
      name: "Eastern road",
      description: "You are standing at a road in the east point of a crossroad. The road heads to a farm's entrance, which is locked. To the west, you see an intersection.",
      exits: {w: 1},
      secret: {}
    },
    {
      id: 4,
      name: "Western road",
      description: "You are standing at a road in the west point of a crossroad. To the west, you see a big river. You can't cross it because the bridge is broken. To the east, you see an empty intersection.",
      exits: {e: 1},
      secret: {}
    },
    {
      id: 5,
      name: "Southern road",
      description: "You are standing at a road in the south point of a crossroad. To the south, you see a big structure. To the north, you see an empty intersection.",
      exits: {n: 1, s: 6},
      secret: {}
    },
    {
      id: 6,
      name: "castle gate",
      description: "You found a castle! Do you want to get in it?",
      exits: {n: 5, s: 7},
      secret: {}
    },
    {
      id: 7,
      name: "castle entrance hall",
      description: "You are standing in a big entrance hall. There's stairs in front of you, in the south, and two rooms on your side, on East and on West.",
      exits: {n: 6, e: 8, w: 9, s: 10},
      secret: {}
    },
    {
      id: 8,
      name: "dark room",
      description: "You are standing at a very dark room. You can't see anything in it.",
      exits: {w: 7},
      alternate: {
        name: "art room",
        description: "You are standing at a room full of sculptures and paintings.",
        items: []
      },
      secret: {}
    },
    {
      id: 9,
      name: "dining hall",
      description: "You are standing in a dining hall.",
      exits: {e: 7, w: 11},
      secret: {}
    },
    {
      id: 10,
      name: "corridor",
      description: "You are standing in a corridor",
      exits: {n: 7, e: 12, s: 13},
      secret: {}
    },
    {
      id: 11,
      name: "secret hideout",
      description: "You are standing in a hideout. There's a shopkeeper in front of you.",
      secret: {
        player: true,
        enemies: true
      },
      exits: {e: 9},
    },
    {
      id: 12,
      name: "giant room",
      description: "You are standing in a big room. There's a chained giant sleeping in it.",
      exits: {w: 10},
      secret: {}
    },
    {
      id: 13,
      name: "princess room",
      description: "You are standing in a room that served as a jail for a princess. You freed her! But wait, there's a loud steps coming from outside...",
      exits: {n: 10},
      locked: true,
      secret: {}
    },
    {
      id: 14,
      name: "King City's gate",
      description: "You are standing at the King City's gate",
      exits: {n: 15, s: 2},
      secret: {}
    },
    {
      id: 15,
      name: "King's City",
      description: "You brought the princess to the Kings's castle. Congratulations!",
      exits: {},
      secret: {
        player: false,
        enemies: true
      },
      locked: true
    }
  ],
  items: [
    {
      name: "sandwich",
      description: "A tasty looking sandwich",
      room: 9,
      isFood: true
    },
    {
      name: "wooden sword",
      description: "a sword that can be used to kill enemies",
      room: 4,
      isWeapon: true,
      power: 5
    },
    {
      name: "coins",
      room: 2,
      isCoin: true,
      quantity: 50
    },
    {
      name: "coins",
      room: 7,
      isCoin: true,
      quantity: 50
    },
    {
      name: "coins",
      room: 8,
      isCoin: true,
      quantity: 100
    },
    {
      name: "coins",
      room: 12,
      isCoin: true,
      quantity: 150
    },
    {
      name: "key",
      description: "key",
      room: 8,
      isKey: true,
      unlocks: 13
    }
  ],
  enemies: [
    {
      name: "goblin",
      description: "A mean-looking goblin",
      room: 6
    },
    {
      name: "zombie",
      description: "A scary zombie",
      room: 10
    },
    {
      name: "giant",
      description: "A furious giant",
      room: 12,
      isGiant: true
    }
  ],
  shopkeepers: [
    {
      room: 11,
      items: [
        {
          name: "flashlight",
          description: "A flashlight for lightining dark places.",
          value: 50
        },
        {
          name: "silver sword",
          description: "a deadly sword to beat every enemy.",
          value: 150,
          isWeapon: true,
          power: 20
        },
        {
          name: "iron armor",
          description: "a armor that can reduce the damage by 50%",
          isArmor: true,
          protection: 0.5,
          value: 150
        }
      ]
    }
  ],
  triggers: {
    13: function(player) {
      const { World } = require('../class/world');

      World.getEnemyByName("giant").attackTarget = player;
      World.rooms["15"].locked = false;
    },
    15: function() {
      console.log("You Win!");
      process.exit();
    }
  }
}
