const { Block } = require("./block");

export class Item extends Block {
    constructor(x, y, blockSize, typeId) {
        super(x, y, blockSize)
        this.typeId = typeId;
    }

    static create(x, y, blockSize, spriteId) {
        return new Item(x, y, blockSize, spriteId);
    }
}

module.exports = { Item };