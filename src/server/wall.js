const { Block } = require("./block");

export class Wall extends Block {
    constructor(x, y, blockSize, typeId) {
        super(x, y, blockSize)
        this.typeId = typeId;
    }
}

module.exports = { Wall }