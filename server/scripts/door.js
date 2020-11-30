class Door extends require("./item") {
    constructor(x, y, isVertical, typeId, map2d) {
        super(x, y, true, typeId, map2d);
        this.typeId = typeId;
        this.isDoor = true;
        this.isVertical = isVertical;
        this.hasInteract = true;
        this.isOpening = false;
        this.isOpened = false;
        this.isClosing = false;
        this.openingOffset = 0;
        this.isClosing = false;
    }

    isInView(view) {
        let pos = this.pos.copy();
        pos.sub(view.person.pos);
        pos.rotate(-view.angle);
        if (pos.x <= 0) return false;
        if (this.isVertical && view.angle >= Math.PI * 0.5 && view.angle <= Math.PI * 1.5) {
            pos.y -= 1;   
        } else if (!this.isVertical && view.angle > 0 && view.angle < Math.PI) {
            pos.y -= 1;
        }
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
        if (this.isVertical) {
            let isInverted = (angle >= Math.PI * 0.5 && angle <= Math.PI * 1.5);
            if (!isInverted && (this.pos.x > ray.pos.x)) return;
            if (isInverted && (this.pos.x < ray.pos.x)) return;
            const x = this.pos.x - ray.view.person.pos.x;
            const y = Math.tan(angle) * x;
            const v = new (require("./vector2d"))(x, y);
            const posY = ray.view.person.pos.y + y;
            if (posY < this.pos.y || posY > this.pos.y + 1) return;
            const dist = Math.sin(Math.PI / 2 - ray.angle) * v.mag;
            let offset = (this.pos.y - posY) - Math.floor(this.pos.y - posY);
            return {
                distAdjusted: dist,
                item: this,
                offset: offset,
                isVertical: true
            };
        } else {
            let isInverted = (angle >= Math.PI && angle <= Math.PI * 2);
            if (!isInverted && (this.pos.y > ray.pos.y)) return;
            if (isInverted && (this.pos.y < ray.pos.y)) return;
            const y = this.pos.y - ray.view.person.pos.y;
            const x = y / Math.tan(angle);
            const v = new (require("./vector2d"))(x, y);
            const posX = ray.view.person.pos.x + x;
            if (posX < this.pos.x || posX > this.pos.x + 1) return;
            const dist = Math.sin(Math.PI / 2 - ray.angle) * v.mag;
            let offset = (this.pos.x - posX) - Math.floor(this.pos.x - posX);
            return {
                distAdjusted: dist,
                item: this,
                offset: offset
            };
        }
    }

    interact(person) {
        this.open();
    }

    open() {
        if (!this.isOpening && !this.isOpened) this.isOpening = true;
    }

    update() {
        if (this.isOpening && !this.isOpened) {
            this.openingOffset -= 0.1;
            if (this.isVertical) this.pos.y -= 0.1;
            if (!this.isVertical) this.pos.x -= 0.1;
            if (this.openingOffset <= -1) {
                this.isOpening = false;
                this.isOpened = true;
                this.isSolid = false;
            }
        }
        else if (!this.isClosing && this.isOpened) {
            if (!this.map2d.players.some(_ => 
                    Math.abs(_.x - (this.x - (!this.isVertical ? this.openingOffset: 0))) <= 2 && 
                    Math.abs(_.y - (this.y - (this.isVertical ? this.openingOffset: 0))) <= 2)) {
                this.isClosing = true;
            }
        }
        else if (this.isClosing && this.isOpened) {
            this.isSolid = true;
            this.openingOffset += 0.1;
            if (this.isVertical) this.pos.y += 0.1;
            if (!this.isVertical) this.pos.x += 0.1;
            if (Math.round(this.openingOffset * 100) / 100 >= 0) {
                this.isClosing = false;
                this.isOpened = false;
            }
        }
    }
}

module && (module.exports = Door);