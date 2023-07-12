const readline = require('readline');

const { Player } = require('./class/player');
const { World } = require('./class/world');

const worldData = require('./data/world-data');

let player;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function printHelp() {
  console.log("Controls:")
  console.log("  Type 'h' for help");
  console.log("  Type 'q' to quit");
  console.log("  Type 'l' to look around");
  console.log("  Type 'i' to check your inventory");
  console.log("  Type 'take <item>' to take an item");
  console.log("  Type 'drop <item>' to drop an item");
  console.log("  Type 'eat <item>' to eat a food item");
  console.log("  Type 'equip <item>' to equip a item");
  console.log("  Type 'n', 's', 'e', 'w' to move");
  console.log("");
}

function startGame() {
  console.clear();
  console.log("Welcome to App Academy Adventure!\n");

  rl.question('Please enter your name: ', (name) => {
    console.clear();
    console.log(`Hello, ${name}!\n`);

    // Create the world and player
    World.loadWorld(worldData, player);
    player = new Player(name, World.rooms[1], 50);
    World.setPlayer(player);

    // Show commands
    printHelp();

    rl.question('\nHit RETURN to start your adventure\n', () => {

      console.clear();
      player.currentRoom.printRoom();
      World.startGame();

      processCommand();
    });
  });
}


function processCommand() {

  rl.question('> ', (cmd) => {
    cmd = cmd.toLowerCase();

    if (cmd === 'h') {
      printHelp();

    } else if (cmd === 'q') {
      rl.close();
      process.exit();

    } else if (cmd === 'l') {
      player.currentRoom.findHideout();
    } else if (cmd === 'i') {
      player.printInventory();

    } else if (['n', 's', 'e', 'w'].indexOf(cmd) >= 0) {
      let direction = cmd;
      player.move(direction);

    } else if (cmd.startsWith("take ")) {
      let itemName = cmd.split(" ").slice(1).join(" ");

      player.takeItem(itemName);

    } else if (cmd.startsWith("drop ")) {
      let itemName = cmd.split(" ").slice(1).join(" ");

      player.dropItem(itemName);

    } else if (cmd.startsWith("eat ")) {
      let itemName = cmd.split(" ").slice(1).join(" ");

      player.eatItem(itemName);

    } else if (cmd.startsWith("equip ")) {
      let itemName = cmd.split(" ").slice(1).join(" ");

      player.equipItem(itemName);

    } else if (cmd.startsWith("hit ")) {
      let enemyName = cmd.split(" ").slice(1).join(" ");

      player.hit(enemyName);

    } else if (cmd.startsWith("talk ")) {
      let shopName = cmd.split(" ").slice(1).join(" ");

      player.talk(shopName);
    } else if (cmd.startsWith("buy ") && player.talking) {
        let itemName = cmd.split(" ").slice(1).join(" ");
        let shopName = player.talking.name;

        player.buy(shopName, itemName);
    } else {
      console.log("Invalid command. Type 'h' for help.");
    }

    processCommand();
  });
}

startGame();
