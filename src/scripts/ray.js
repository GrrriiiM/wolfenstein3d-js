import { Base } from "./base";
import { Vector2d } from "./vector2d";

export class Ray extends Base {
    constructor(view, angle) {
        super(0, 0);
        this.view = view;
        this.angle = angle;
    }

    cast() {
        const map2d = this.view.person.map2d;
        const dirX = this.calcDirX();
        const dirY = this.calcDirY();
        const deltaDistH = this.calcDistHorizontal();
        const deltaDistV = this.calcDistVertical();
        let distH = deltaDistH;
        let distV = deltaDistV;
        let blockX = this.view.person.block.x;
        let blockY = this.view.person.block.y;
        let vertical = false;

        while((blockX >= 0 && blockX < map2d.maxX) || (blockY >= 0 && blockY < map2d.maxY)) {
            if (distH < distY) {
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
                this.setXY(blockX, blockY);
                this.vertical = vertical;
                return;
            }
        }
    }

    calcAngle() {
        return (this.angle + this.view.person.angle + Math.PI * 2) % (Math.PI * 2);
    }

    calcDirY() {
        const angle = this.calcAngle();
        if (angle > 0 && angle < Math.PI) return 1;
        if (angle > Math.PI && angle < Math.PI * 2) return -1;
        return 0;
    }

    calcDirX() {
        const angle = this.calcAngle();
        if (angle > Math.PI * 1.5 || angle < Math.PI * 0.5) return 1;
        if (angle > Math.PI * 0.5 && angle < Math.PI * 1.5) return -1;
        return 0;
    }

    calcDistHorizontal() {
        const angle = this.calcAngle();
        const dir = this.calcDirY()
        if (dir == 1) return Math.abs((1 - this.view.person.offset.y) / Math.tan(angle));
        if (dir == -1) return Math.abs((this.view.person.offset.y) / Math.tan(angle));
        return 0;
    }

    calcDistVertical() {
        const angle = this.calcAngle();
        const dir = this.calcDirX();
        if (dir == 1) return Math.abs((1 - this.view.person.offset.x) / Math.tan(angle));
        if (dir == -1) return Math.abs((this.view.person.offset.x) / Math.tan(angle));
        return 0;
    }
}