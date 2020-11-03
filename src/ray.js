import { Config } from "./config.js";
import { Vector } from "./vector.js";

export class Ray {
    constructor(player, angle, index) {
        this.player = player;
        this.angle = angle;
        this.index = index;
    }

    calc() {
        let blocks = this.player.map2d.blocks;
        let angle = (this.player.angle + this.angle) % (Math.PI * 2);
        let h = this.calcHorizontal(angle, blocks);
        let v = this.calcVertical(angle, blocks);
        let r;
        if (!h) {
            r = v;
        } else if (!v) {
            r = h;
        } else if (v.pos.copy().sub(this.player.pos).mag < h.pos.copy().sub(this.player.pos).mag) {
            r = v;
        } else {
            r = h;
        }
        if (r) {
            this.pos = r.pos;
            this.block = r.block;
            this.vertical = r.vertical;
            this.invert = r.invert;
        }
    }

    calcVertical(angle, blocks) {
        if (angle > 3 * (Math.PI / 2) || angle < Math.PI / 2) {
            for (let i = 0; i < blocks.maxX - this.player.x; i++) {
                let x = ((i + 1) * Config.blockSize - this.player.offset.x);
                let y = (Math.tan(angle) * x);
                let rayPosition = this.calcRayPosition(x, y, false, true);
                if (rayPosition) return rayPosition;
            }
        } else {
            for (let i = this.player.x; i > 0; i--) {
                let x = ((i - this.player.x) * Config.blockSize - this.player.offset.x);
                let y = (Math.tan(angle) * x);
                let rayPosition = this.calcRayPosition(x, y, true, true);
                if (rayPosition) return rayPosition;
            }
        }
    }


    calcHorizontal(angle, blocks) {
        if (angle > 0 && angle < Math.PI) {
            for (let i = 0; i < blocks.maxY - this.player.y; i++) {
                let y = ((i + 1) * Config.blockSize - this.player.offset.y);
                let x = (Math.tan(Math.PI / 2 - angle) * y);
                let rayPosition = this.calcRayPosition(x, y, false, false);
                if (rayPosition) return rayPosition;
            }
        } else {
            for (let i = this.player.y; i > 0; i--) {
                let y = ((i - this.player.y) * Config.blockSize - this.player.offset.y);
                let x = Math.tan(Math.PI / 2 - angle) * y;
                let rayPosition = this.calcRayPosition(x, y, true, false);
                if (rayPosition) return rayPosition;
            }
        }
    }

    calcRayPosition(posX, posY, invert, vertical) {
        let map2d = this.player.map2d;
        let pos = new Vector(posX, posY).add(this.player.pos);
        let posOffset = pos.copy()
        if (invert) {
            if (!vertical) posOffset.y -= Config.blockSize;
            if (vertical) posOffset.x -= Config.blockSize;
        }
        posOffset.div(Config.blockSize).floor();
        let block = this.player.map2d.getBlock(posOffset.x, posOffset.y);
        if (block) return { block: block, pos: pos, vertical: vertical, invert: invert };
    }
}