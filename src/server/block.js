const { Vector2d } = require("./vector2d")

export class Block {
    constructor(x, y) {
        this.pos = new Vector2d(x, y);
        this.pos.onchange = this._onchange.bind(this);
        this.offset = new Vector2d();
        this._onchange();
    }

    get x() { return this._x; }
    get y() { return this._y; }

    _onchange() {
        this._x = Math.floor(this.pos.x);
        this._y = Math.floor(this.pos.y);
        this.offset.set(this.pos).sub({ x: this.x, y: this.y });
    }
}

module.exports = { Block };