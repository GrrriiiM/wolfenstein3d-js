const { Block }  = require("./block");

export class Ray extends Block {
    constructor(view, angle) {
        super(0, 0);
        this.view = view;
        this.angle = angle;
    }

    cast() {
        const map2d = this.view.person.map2d;
        const dirX = this.calcDirV();
        const dirY = this.calcDirH();
        const distH = this.calcDistH();
        const distV = this.calcDistV();
        let deltaDistH = this.calcDeltaDistH();
        let deltaDistV = this.calcDeltaDistV();
        let blockX = this.view.person.block.x;
        let blockY = this.view.person.block.y;
        let vertical = false;

        while((blockX >= 0 && blockX < map2d.maxX) || (blockY >= 0 && blockY < map2d.maxY)) {
            if (distH < distV) {
                distH += deltaDistH;
                blockY += dirY;
                vertical = false;
            } else {
                distV += deltaDistV;
                blockX += dirX;
                vertical = true;
            }
            let block = this.view.person.map2d.blocks[blockX][blockY];
            if (block) {
                this.block = block;
                if (vertical) {
                    this.pos.setXY(Math.sin(angle) * distV, Math.cos(angle) * distV).add(this.view.person);
                    this.vertical = true;
                } else {
                    this.pos.setXY(Math.sin(angle) * distH, Math.cos(angle) * distV).add(this.view.person);
                    this.vertical = true;
                }
                return;
            }
        }
    }

    calcAngle() {
        return (this.angle + this.view.person.angle + Math.PI * 2) % (Math.PI * 2);
    }

    calcDirH() {
        const angle = this.calcAngle();
        if (angle > 0 && angle < Math.PI) return 1;
        if (angle > Math.PI && angle < Math.PI * 2) return -1;
        return 0;
    }

    calcDirV() {
        const angle = this.calcAngle();
        if (angle > Math.PI * 1.5 || angle < Math.PI * 0.5) return 1;
        if (angle > Math.PI * 0.5 && angle < Math.PI * 1.5) return -1;
        return 0;
    }

    calcDistH() {
        const angle = this.calcAngle();
        const dir = this.calcDirH()
        if (dir == 1) return Math.abs((1 - this.view.person.offset.y) / Math.sin(angle));
        if (dir == -1) return Math.abs(this.view.person.offset.y / Math.sin(angle));
        return 0;
    }

    calcDistV() {
        const angle = this.calcAngle();
        const dir = this.calcDirV();
        if (dir == 1) return Math.abs((1 - this.view.person.offset.x) / Math.cos(angle));
        if (dir == -1) return Math.abs(this.view.person.offset.x / Math.cos(angle));
        return 0;
    }
    
    calcDeltaDistH() {
        const angle = this.calcAngle();
        const dir = this.calcDirH()
        if (dir == 1) return Math.abs((1 + Math.abs(1 - this.view.person.offset.y)) / Math.sin(angle)) - this.calcDistH();
        if (dir == -1) return Math.abs((1 + Math.abs(this.view.person.offset.y)) / Math.sin(angle)) - this.calcDistH();
        return 0;
    }

    calcDeltaDistV() {
        const angle = this.calcAngle();
        const dir = this.calcDirV();
        if (dir == 1) return Math.abs((1 + Math.abs(1 - this.view.person.offset.x)) / Math.cos(angle)) - this.calcDistV();
        if (dir == -1) return Math.abs((1 + Math.abs(this.view.person.offset.x)) / Math.cos(angle)) - this.calcDistV();
        return 0;
    }

}

module.exports = { Ray };