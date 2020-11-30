class Person extends require("./block") {
    constructor(x, y , viewAngle, typeId, map2d) {
        super(x, y);
        this.personId = typeId;
        this.map2d = map2d;
        this.view = new (require("./view"))(this, viewAngle);
    }

    update() {
        if (this.movingFront) this.moveFront();
        if (this.movingBack) this.moveBack();
        if (this.movingRight) this.moveRight();
        if (this.movingLeft) this.moveLeft();
        if (this.rotatingLeft) this.rotateLeft();
        if (this.rotatingRight) this.rotateRight();
        if (this.interacting) this.interact();
    }

    moveFront() {
        this.move({ x: this.map2d.config.playerMoveVelocity, y: 0 });
    }

    moveBack() {
        this.move({ x: -this.map2d.config.playerMoveVelocity, y: 0 });
    }

    moveRight() {
        this.move({ x: 0, y: this.map2d.config.playerMoveVelocity });
    }

    moveLeft() {
        this.move({ x: 0, y: -this.map2d.config.playerMoveVelocity });
    }

    rotateLeft() {
        this.view.angle -= this.map2d.config.playerRotateVelocity;
    }

    rotateRight() {
        this.view.angle += this.map2d.config.playerRotateVelocity;
    }

    startInteract() {
        this.interacting = true;
    }

    interact() {
        this.interacting = false;
        let pos = new (require("./vector2d"))(1, 0);
        pos.rotate(this.view.angle);
        pos.norm();
        pos.mult(1);
        pos.add(this.pos);
        const item = this.map2d.blocks[Math.floor(pos.x)][Math.floor(pos.y)];
        if (item?.hasInteract) {
            item.interact();
        } 
    }

    move(pos) {
        let newPos = this.pos.copy().rotate(-this.view.angle).add(pos).rotate(this.view.angle);
        let diffPos = newPos.copy().sub(this.pos);
        
        const blockX = this.map2d.blocks[Math.floor(newPos.x + (0.5 * Math.sign(diffPos.x)))][this.y];
        if (blockX?.isSolid) {
            if (diffPos.x > 0) {
                newPos.x = blockX.x - 0.5; 
            } else if (diffPos.x < 0) {
                newPos.x = blockX.x + 1.5; 
            }
        }
        const blockY = this.map2d.blocks[this.x][Math.floor(newPos.y + (0.5 * Math.sign(diffPos.y)))];
        if (blockY?.isSolid) {
            if (diffPos.y > 0) {
                newPos.y = blockY.y - 0.5; 
            } else if (diffPos.y < 0) {
                newPos.y = blockY.y + 1.5; 
            }
        }
        this.pos.set(newPos);
    }

    check() {
        
    }
}

module && (module.exports = Person);