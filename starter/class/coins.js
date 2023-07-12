const { Item } = require('./item');

class Coins extends Item {
    constructor(quantity) {
        super("coins", "gold coins! Money!");
        this.quantity = quantity;
    }
}

module.exports = {
    Coins
};
