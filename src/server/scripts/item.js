const decorationNonSolid = [58, 62, 67, 72, 73, 77, 81, 92, 96, 99, 100, 101, 102];
const decorationSolid = [57, 60, 61, 63, 65, 66, 68, 69, 70, 71, 74, 75, 76, 80, 93, 94, 95, 97];
const doorVertical = [ 49 ];
const doorHorizontal = [ 50 ];

class Item extends require("./block") {
    constructor(x, y, isSolid, typeId, map2d) {
        super(x, y);
        this.typeId = typeId;
        this.isSolid = isSolid;
        this.map2d = map2d;
    }

    static create(x, y, typeId, map2d) {
        if (doorVertical.indexOf(typeId) >= 0) return new (require("./door"))(x + 0.5, y, true, typeId, map2d);
        if (doorHorizontal.indexOf(typeId) >= 0) return new (require("./door"))(x, y + 0.5, false, typeId, map2d);
        if (decorationNonSolid.indexOf(typeId) >= 0) return new (require("./item"))(x + 0.5, y + 0.5, false, typeId, map2d);
        if (decorationSolid.indexOf(typeId) >= 0) return new (require("./item"))(x + 0.5, y + 0.5, true, typeId, map2d);
    }

    isInView(view) {
        let pos = this.pos.copy();
        pos.sub(view.person.pos);
        pos.rotate(-view.angle);
        if (pos.x <= 0) return false;
        let itemAngleMin = pos.ang;
        pos.y += 1;
        let itemAngleMax = pos.ang;
        if (itemAngleMin <= view.angleTotal * 0.5 && view.angleTotal * -0.5 <= itemAngleMax) {
            return true;
        } else {
            return false;
        }
    }

    cast(ray) {
        const angle = ray.calcAngle();
        var rayPos = ray.pos.copy().sub(ray.view.person.pos).rotate(-angle);
        var itemPos = this.pos.copy().sub(ray.view.person.pos).rotate(-angle);
        if (rayPos.x < itemPos.x) return;
        if (itemPos.y > 0.5 || itemPos.y < -0.5) return;
        const dist = Math.sin(Math.PI / 2 - ray.angle) * itemPos.x;
        return {
            distAdjusted: dist,
            item: this,
            offset: itemPos.y
        };
    }
}

module && (module.exports = Item);