export class Vector {
    constructor(x, y) {
        this.x = x ?? 0;
        this.y = y ?? x;
    }

    get magQ() { return Math.pow(this.x, 2) + Math.pow(this.y, 2); }

    get mag() { return Math.sqrt(this.magQ); }

    set(v) {
        this.x = v.x;
        this.y = v.y;
        return this;
    }

    setXY(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }

    copy() {
        return new Vector(this.x, this.y);
    }

    add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    sub(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    mult(n) {
        this.x *= n;
        this.y *= n;
        return this;
    }

    div(n) {
        this.x /= n;
        this.y /= n;
        return this;
    }

    rotate(r) {
        const cos = Math.cos(r);
        const sin = Math.sin(r);
        const x = this.x;
        const y = this.y;
        this.x = x * cos - y * sin;
        this.y = x * sin + y * cos;
        return this;
    }
    
    floor() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this;
    }
}