import { Config } from './config.js';
import { Vector } from './vector.js';

export class Wall extends Vector {
    constructor(x, y, v) {
        super(x, y);
        this.pos = this.copy().mult(Config.blockSize);
        this.render = {
            name: "walls",
            x: (v % 3 * Config.blockSize) * 2,
            y: Math.floor(v / 3) * Config.blockSize,
            w: Config.blockSize,
            h: Config.blockSize
        };
    }
}