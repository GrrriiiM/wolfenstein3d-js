import { Base } from "./base";

export class Wall extends Base {
    constructor(x, y, blockSize, typeId) {
        super(x, y, blockSize)
        this.typeId = typeId;
    }
}