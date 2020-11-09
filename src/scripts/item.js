import { Base } from "./base";

export class Item extends Base {
    constructor(x, y, blockSize, typeId) {
        super(x, y, blockSize)
        this.typeId = typeId;
    }

    static create(x, y, blockSize, spriteId) {
        return new Item(x, y, blockSize, spriteId);
    }
}