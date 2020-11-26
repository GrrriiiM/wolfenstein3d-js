class View {
    constructor(person, angle) {
        this.person = person;
        this.angleTotal = (Math.PI / 3);
        this.angle = angle;
        this.rays = [];
        let c = 310;
        // c = c % 2 ? c : c + 1;
        let s = this.angleTotal / (c - 1);
        for (let i = 0; i < c; i++) {
            this.rays.push(new (require('./ray'))(this, (s * i) - (this.angleTotal / 2), i));
        }
    }

    get angle() { return this._angle; }
    set angle(v) { this._angle = v; this._update(); }

    cast() {
        this.rays.forEach(_ => _.cast());
    }

    _update() {
        this._angle %= Math.PI * 2;
        if (this._angle < 0) this._angle += Math.PI * 2;
        this.angleMin = this.angle - this.angleTotal / 2;
        this.angleMin %= Math.PI * 2;
        if (this.angleMin < 0) this.angleMin += Math.PI * 2;
        this.angleMax = this.angle + this.angleTotal / 2;
        this.angleMax %= Math.PI * 2;
        if (this.angleMax < 0) this.angleMax += Math.PI * 2;
    }
}

module && (module.exports = View);