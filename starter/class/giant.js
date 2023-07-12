const { Enemy } = require('./enemy');
const {Character} = require('./character');

class Giant extends Enemy {
    constructor(name, description, room) {
        super(name, description, room);

        this.health = 1000;
        this.strength = 40;
        this.cooldown = 7000;
        this.add = this.cooldown / 3;
    }

    act() {
        if (this.attackTarget) {
            super.act();
        } else {
            this.rest();
        }
    }
}

module.exports = {
    Giant
};
