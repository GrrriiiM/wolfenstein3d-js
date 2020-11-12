import { Vector2d } from "./vector2d.js";

export class Base extends Vector2d {
    constructor(x, y) {
        super(0, 0);
        this.onchange = this._update;
        this.block = new Vector2d(0, 0);
        this.offset = new Vector2d();
        this.setXY(x, y);
    }

    get x() { return this._x; }
    set x(v) { this._x = v; this._update() }

    get y() { return this._y; }
    set y(v) { this._y = v; this._update(); }

    _update() {
        this.block.setXY(
            Math.floor(this._x), 
            Math.floor(this._y));
        this.offset.set(this.copy().sub(this.block));
    }
}