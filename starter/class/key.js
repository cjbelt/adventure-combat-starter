const { Item } = require('./item');

class Key extends Item {
    constructor(name, description, room) {
        super(name, description);

        this.room = room;
    }
}

module.exports = {
    Key
};
