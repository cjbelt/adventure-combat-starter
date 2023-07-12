const {Character} = require('./character');


class Enemy extends Character {
  constructor(name, description, currentRoom) {
    // Fill this in
    super(name, description, currentRoom);

    this.health = 80;
    this.strength = 5;
    this.cooldown = 3000;
    this.attackTarget = null;
    this.add = this.cooldown / 3;
  }

  setPlayer(player) {
    this.player = player;
  }


  randomMove() {
    // Fill this in
    this.cooldown += this.add;

    const exits = Object.keys(this.currentRoom.exits);
    const randomRoom = Math.floor(Math.random() * exits.length);
    const room = this.currentRoom.exits[exits[randomRoom]];

    if (!(room.secret.enemies)) {
      this.currentRoom = room;
    }
  }

  takeSandwich() {
    // Fill this in
    if (this.currentRoom === this.player.currentRoom && this.currentRoom.getItemByName("sandwich")) {
      this.takeItem("sandwich");
    }
  }

  // Print the alert only if player is standing in the same room
  alert(message) {
    if (this.player && this.player.currentRoom === this.currentRoom) {
      console.log(message);
    }
  }

  rest() {
    // Wait until cooldown expires, then act
    const enemy = this;
    const resetCooldown = function() {
      enemy.cooldown = 0;
      enemy.act();
    };
    setTimeout(resetCooldown, this.cooldown);
  }

  attack() {
    // Fill this in
    this.cooldown += this.add;

    if (this.attackTarget) {
      this.attackTarget.applyDamage(this.strength);
    }
  }

  act() {
    if (this.health <= 0) {
      // Dead, do nothing;
    } else if (this.cooldown > 0) {
      this.rest();
    } else {
      this.scratchNose();
      this.attack();
      if (this.player.currentRoom !== this.currentRoom) this.randomMove();
      this.takeSandwich();
      this.rest();
    }

    // Fill this in
  }


  scratchNose() {
    this.cooldown += this.add;

    this.alert(`${this.name} scratches its nose`);

  }


}

module.exports = {
  Enemy,
};
