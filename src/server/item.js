const { Block } = require("./block");

export class Item extends Block {
    constructor(x, y, typeId) {
        super(x, y)
        this.typeId = typeId;
    }

    static create(x, y, spriteId) {
        return new Item(x, y, spriteId);
    }
}

module.exports = { Item };