import { Block } from "./block.js";
import { Vector2d } from "./vector2d.js";

export class Base extends Vector2d {
    constructor(x, y, blockSize) {
        super(0, 0);
        this.onchange = this._update;
        this.block = new Block(0, 0, blockSize);
        this.offset = new Vector2d();
        this.setXY(x, y);
    }

    get x() { return this._x; }
    set x(v) { this._x = v; this._update() }

    get y() { return this._y; }
    set y(v) { this._y = v; this._update(); }

    _update() {
        this.block.setXY(
            Math.floor(this._x / this.block.size), 
            Math.floor(this._y / this.block.size));
        this.offset.set(this.copy().sub(this.block.min));
    }
}