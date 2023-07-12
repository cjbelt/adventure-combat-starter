const { Character } = require('./character');

class Shopkeeper extends Character {
    constructor(currentRoom) {
        super("shopkeeper", "a friendly shopkeeper that wants to sell his items", currentRoom);

        this.items = [];
    }
}

module.exports = {
    Shopkeeper
};
