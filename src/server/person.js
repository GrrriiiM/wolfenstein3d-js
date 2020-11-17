const { Block } = require("./block");
const { View } = require("./view");

class Person extends Block {
    constructor(x, y , viewAngle, typeId, map2d) {
        super(x, y);
        this.personId = typeId;
        this.map2d = map2d;
        this.view = new View(this, viewAngle);
    }

    update() {
        if (this.movingFront) this.moveFront();
        if (this.movingBack) this.moveBack();
        if (this.movingRight) this.moveRight();
        if (this.movingLeft) this.moveLeft();
        if (this.rotatingLeft) this.rotateLeft();
        if (this.rotatingRight) this.rotateRight();
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

    move(pos) {
        this.pos.rotate(-this.view.angle).add(pos).rotate(this.view.angle);
    }
}

module.exports = { Person };