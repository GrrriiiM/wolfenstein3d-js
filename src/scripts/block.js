import { Vector2d } from "./vector2d";

export class Block {
    constructor(x, y, blockSize) {
        this.min = {};
        this.max = {};
        this.center = {};
        this.size = blockSize;
        this.setXY(x, y);
    }

    get x() { return this._x; }
    set x(v) { this._x = v; this._update(); }
    get y() { return this._y; }
    set y(v) { this._y = v; this._update(); }

    setXY(x, y) {
        this._x = x,
        this._y = y;
        this._update();
    }

    _update() {
        this.min.x = this.x * this.size;
        this.min.y = this.y * this.size;
        this.max.x = this.min.x + this.size;
        this.max.y = this.min.y + this.size;
        this.center.x = this.min.x + this.size / 2;
        this.center.y = this.min.y + this.size / 2;
    }

    contain(point) {
        return (point.x >= this.min.x && point.x < this.max.x
            && point.y >= this.min.y && point.y < this.max.y)
    }
}