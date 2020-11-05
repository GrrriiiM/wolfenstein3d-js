import { Config } from "./config.js";
import { Vector } from "./vector.js";

export class Decoration extends Vector {
    constructor(x, y, v) {
        super(x, y);
        this.pos = this.copy().mult(Config.blockSize);
        v -= 50;
        this.render = {
            name: "decorations",
            x: (v % 4 * Config.blockSize) + v % 4,
            y: Math.floor(v / 4) * Config.blockSize + Math.floor(v / 4),
            w: Config.blockSize,
            h: Config.blockSize
        };
    }
}