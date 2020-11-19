import { Config } from "./config.js";
import { Vector } from "./vector.js";
import { Wall } from "./wall.js";

export class Ray {
    constructor(player, angle, index) {
        this.player = player;
        this.angle = angle;
        this.index = index;
    }

    calc() {
        let blocks = this.player.map2d.blocks;
        let angle = ((this.player.angle + this.angle) + Math.PI * 2) % (Math.PI * 2);
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
            this.wall = r.wall;
            this.vertical = r.vertical;
            this.invert = r.invert;
            this.decorations = [];
            this.getDecorations(angle);
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
        let pos = new Vector(posX, posY).add(this.player.pos);
        let posOffset = pos.copy()
        if (invert) {
            if (!vertical) posOffset.y -= Config.blockSize;
            if (vertical) posOffset.x -= Config.blockSize;
        }
        posOffset.div(Config.blockSize).floor();
        let wall = this.player.map2d.getWall(posOffset.x, posOffset.y);
        if (wall) return { wall: wall, pos: pos, vertical: vertical, invert: invert };
    }

    
    getDecorations() {
        for(let decoration of this.player.decorations) {
            let decorationPos = decoration.pos.copy();
            decorationPos.x += Config.blockSize / 2;
            decorationPos.y += Config.blockSize / 2;
            decorationPos.sub(this.player.pos);
            decorationPos.rotate(-this.player.angle);
            decorationPos.y -= Config.blockSize / 2;
            decorationPos.x -= Config.blockSize / 2;
            let x = decorationPos.x;
            let y = Math.tan(this.angle) * x;
            if (y >= decorationPos.y && y <= decorationPos.y + Config.blockSize) {
                if (this.pos.copy().sub(this.player.pos).mag > new Vector(x, y).mag) {
                    this.decorations.push({
                        x: x,
                        y: decorationPos.y - y,
                        dist: new Vector(x, y).mag,
                        decoration: decoration
                    });
                }
            }
        }
        // if (angle > 3 * (Math.PI / 2) || angle < Math.PI / 2) {
        //     for (let i = 0; i < this.wall.x - this.player.x; i++) {
        //         let x = ((i + 1) * Config.blockSize - this.player.offset.x);
        //         let y = (Math.tan(angle) * x);
        //         let pos = new Vector(x, y).add(this.player.pos);
        //         let posOffset = pos.copy()
        //         posOffset.div(Config.blockSize).floor();
        //         let decoration = this.player.map2d.getDecoration(posOffset.x, posOffset.y);
        //         if (decoration) this.decorations.push(decoration);
        //     }
        // } else {
        //     for (let i = this.player.x; i > this.wall.x; i--) {
        //         let x = ((i - this.player.x) * Config.blockSize - this.player.offset.x);
        //         let y = (Math.tan(angle) * x);
        //         let pos = new Vector(x, y).add(this.player.pos);
        //         let posOffset = pos.copy()
        //         posOffset.div(Config.blockSize).floor();
        //         let decoration = this.player.map2d.getDecoration(posOffset.x, posOffset.y);
        //         if (decoration) this.decorations.push(decoration);
        //     }
        // }
        // if (angle > 0 && angle < Math.PI) {
        //     for (let i = 0; i < this.wall.y - this.player.y; i++) {
        //         let y = ((i + 1) * Config.blockSize - this.player.offset.y);
        //         let x = (Math.tan(Math.PI / 2 - angle) * y);
        //         let pos = new Vector(x, y).add(this.player.pos);
        //         let posOffset = pos.copy()
        //         posOffset.div(Config.blockSize).floor();
        //         let decoration = this.player.map2d.getDecoration(posOffset.x, posOffset.y);
        //         if (decoration) this.decorations.push(decoration);
        //     }
        // } else {
        //     for (let i = this.player.y; i > this.wall.y; i--) {
        //         let y = ((i - this.player.y) * Config.blockSize - this.player.offset.y);
        //         let x = Math.tan(Math.PI / 2 - angle) * y;
        //         let pos = new Vector(x, y).add(this.player.pos);
        //         let posOffset = pos.copy()
        //         posOffset.div(Config.blockSize).floor();
        //         let decoration = this.player.map2d.getDecoration(posOffset.x, posOffset.y);
        //         if (decoration) this.decorations.push(decoration);
        //     }
        // }
    }
}