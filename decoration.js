import { Config } from "./config.js";
import { Vector } from "./vector.js";

export class Decoration extends Vector {
    constructor(x, y, v) {
        super(x, y);
        this.pos = this.copy().mult(Config.blockSize);
        v -= 56;
        this.render = {
            name: "decorations",
            x: ((v % 5) * Config.blockSize) + v % 5,
            y: Math.floor(v / 5) * Config.blockSize + Math.floor(v / 5),
            w: Config.blockSize,
            h: Config.blockSize
        };
    }
}