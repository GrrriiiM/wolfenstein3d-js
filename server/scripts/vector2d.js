class Vector2d {
    constructor(x, y, onchange) {
        this.onchange = onchange
        this.setXY(x, y);
    }

    get x() { return this._x; }
    set x(v) { this._x = v; !this.onchange || this.onchange(); }

    get y() { return this._y; }
    set y(v) { this._y = v; !this.onchange || this.onchange(); }

    get mag() { return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)); }

    get ang() { return Math.atan2(this.y, this.x); }

    set(v) {
        this.setXY(v.x, v.y);
        return this;
    }

    setXY(x, y) {
        this._x = x || 0;
        this._y = y == undefined ? this._x : y;
        !this.onchange || this.onchange();
        return this;
    }

    copy() {
        return new Vector2d(this.x, this.y);
    }

    add(v) {
        this.setXY(this.x + v.x, this.y + v.y);
        return this;
    }

    sub(v) {
        this.setXY(this.x - v.x, this.y - v.y);
        return this;
    }

    mult(n) {
        this.setXY(this.x * n, this.y * n);
        return this;
    }

    div(n) {
        this.setXY(this.x / n, this.y / n);
        return this;
    }

    rotate(r) {
        const cos = Math.cos(r);
        const sin = Math.sin(r);
        const x = this.x;
        const y = this.y;
        this.setXY(x * cos - y * sin, x * sin + y * cos);
        return this;
    }
    
    floor() {
        this.setXY(Math.floor(this.x), Math.floor(this.y));
        return this;
    }

    norm() {
        let m = this.mag;
        if (m == 0) return this;
        this.setXY(this._x / m, this._y / m);
        return this;
    }
}

module && (module.exports = Vector2d);