const { Block } = require("./block");

export class Wall extends Block {
    constructor(x, y, typeId) {
        super(x, y)
        this.typeId = typeId;
    }
}

module.exports = { Wall }