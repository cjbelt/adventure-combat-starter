const { Item } = require('./item');

class Weapon extends Item {
    constructor(name, description, power, value) {
        super(name, description, value);
        this.power = power;
    }
}

module.exports = {
    Weapon
};
