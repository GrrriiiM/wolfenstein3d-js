class Item extends require("./block") {
    constructor(x, y, typeId) {
        super(x, y)
        this.typeId = typeId;
    }

    static create(x, y, spriteId) {
        return new Item(x, y, spriteId);
    }
}

module && (module.exports = Item);