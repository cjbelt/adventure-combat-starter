const { Item } = require('./item');

class Food extends Item {

  constructor(name, description, heal = 15) {
    super(name, description);
    this.heal = heal;
  }
}

module.exports = {
  Food,
};
