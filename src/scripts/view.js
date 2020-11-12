export class View {
    constructor(person, angle) {
        this.person = person;
        this.angleTotal = Math.PI / 3;
        this.angle = angle;
    }

    get angle() { return this._angle; }
    set angle(v) { this._angle = v; this._update(); }

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