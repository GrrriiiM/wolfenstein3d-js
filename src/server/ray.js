const { Block }  = require("./block");

export class Ray extends Block {
    constructor(view, angle) {
        super(0, 0);
        this.view = view;
        this.angle = angle;
    }

    cast() {
        const angle = this.calcAngle();
        const map2d = this.view.person.map2d;
        const dirX = this.calcDirV();
        const dirY = this.calcDirH();
        let distH = this.calcDistH();
        let distV = this.calcDistV();
        const deltaDistH = this.calcDeltaDistH();
        const deltaDistV = this.calcDeltaDistV();
        let blockX = this.view.person.block.x;
        let blockY = this.view.person.block.y;

        while((blockX >= 0 && blockX < map2d.maxX) || (blockY >= 0 && blockY < map2d.maxY)) {
            if (distH < distV) {
                blockY += dirY;
                this.wall = this.view.person.map2d.getWall(blockX, blockY);
                if (this.wall) {
                    this.pos.setXY(Math.cos(angle) * distH, Math.sin(angle) * distH).add(this.view.person.pos);
                    this.distAdjusted = Math.abs(Math.sin(this.angle) * distH);
                    this.wallOffset = this.offset.x;
                    this.vertical = false;
                    return;
                }
                distH += deltaDistH;
            } else {
                blockX += dirX;
                this.wall = this.view.person.map2d.getWall(blockX, blockY);
                if (this.wall) {
                    this.pos.setXY(Math.cos(angle) * distV, Math.sin(angle) * distV).add(this.view.person.pos);
                    this.distAdjusted = Math.abs(Math.cos(this.angle) * distV);
                    this.wallOffset = this.offset.y;
                    this.vertical = true;
                    return;
                }
                distV += deltaDistV
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