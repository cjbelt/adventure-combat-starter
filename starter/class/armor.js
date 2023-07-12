const { Item } = require('./item');

class Armor extends Item {
    constructor(name, description, protection, value) {
        super(name, description, value);
        this.protection = protection;
    }
}

module.exports = {
    Armor
};
