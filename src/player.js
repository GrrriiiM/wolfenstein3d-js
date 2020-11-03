import { Vector } from './vector.js';
import { Config } from './config.js';
import { Ray } from './ray.js'
import { Wall } from './wall.js';

export class Player extends Vector {
    constructor(x, y, map2d) {
        super(x, y);
        this.map2d = map2d;
        this.offset = new Vector(Config.blockSize / 2);
        this.pos = this.copy().mult(Config.blockSize).add(this.offset);
        this.angle = 0;
        this.createRays();
    }

    setId(id) {
        this.id = id;
    }

    createRays() {
        this.rays = [];
        let c = Config.rayCount;
        let r = Math.PI / 3;
        if (c == 1) this.rays.push(new Ray(this, 0, 0));
        else {
            c = c % 2 ? c : c + 1;
            var t = (r);
            let s = t / (c - 1);
            for (let i = 0; i < c; i++) {
                this.rays.push(new Ray(this, (s * i) - (r / 2), i));
            }
        }
    }

    update() {
        if (this.movingFront) this.moveFront();
        if (this.movingBack) this.moveBack();
        if (this.rotatingLeft) this.rotateLeft();
        if (this.rotatingRight) this.rotateRight();
        this.calcRay();
    }

    moveFront() {
        this.move({ x: Config.playerMoveVelocity, y: 0 });
    }

    moveBack() {
        this.move({ x: -Config.playerMoveVelocity, y: 0 });
    }

    rotateLeft() {
        this.angle -= Config.playerRotateVelocity;
        if (this.angle < 0) this.angle += Math.PI * 2;
        this.angle = this.angle % (Math.PI * 2);
    }

    rotateRight() {
        this.angle += Config.playerRotateVelocity;
        this.angle = this.angle % (Math.PI * 2);
    }

    move(pos) {
        if (this.checkCollision(pos)) return;
        this.pos.rotate(-this.angle).add(pos).rotate(this.angle);
        this.set(this.pos).div(Config.blockSize).floor();
        this.offset.set(this.pos).sub(this.copy().mult(Config.blockSize));
    }

    checkCollision(pos) {
        let margin = Config.blockSize / 5;
        let newPos = this.pos.copy().rotate(-this.angle).add(pos).rotate(this.angle)
        if (this.angle >= Math.PI * 3 / 2 || this.angle < Math.PI / 2) {
            let n = newPos.copy().add({ x: margin, y: 0 }).div(Config.blockSize).floor();
            let block = this.map2d.getBlock(n.x, n.y);
            if ((block instanceof Wall)) return true;
        } else {
            let n = newPos.copy().add({ x: -margin, y: 0 }).div(Config.blockSize).floor();
            let block = this.map2d.getBlock(n.x, n.y);
            if ((block instanceof Wall)) return true;
        }

        if (this.angle >= 0 && this.angle < Math.PI) {
            let n = newPos.copy().add({ x: 0, y: margin }).div(Config.blockSize).floor();
            let block = this.map2d.getBlock(n.x, n.y);
            if ((block instanceof Wall)) return true;
        } else {
            let n = newPos.copy().add({ x: 0, y: -margin }).div(Config.blockSize).floor();
            let block = this.map2d.getBlock(n.x, n.y);
            if ((block instanceof Wall)) return true;
        }
    }

    calcRay() {
        for(let ray of this.rays) {
            ray.calc();
        }
    }

}