export class View {
    constructor(person, angle) {
        this.person = person;
        this.angle = angle;
    }

    get angle() { return this._angle; }
    set angle(v) { this._angle = v; this._update(); }

    _update() {
        this._angle %= Math.PI * 2;
        if (this._angle < 0) this._angle += Math.PI * 2;
    }
}