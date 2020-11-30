import { Server } from "./server.js";

export class Local {
    constructor() {
        this.server = new Server();
    }

    start() {
        this.server.start();
        this.hash = this.server.connect({ update: this.update.bind(this) });
    }

    update(state) {
        this.state = state;
    }

    startMoveFront() {
        this.server.playerStartMoveFront(this.hash);
    }

    stopMoveFront() {
        this.server.playerStopMoveFront(this.hash);
    }

    startMoveBack() {
        this.server.playerStartMoveBack(this.hash);
    }

    stopMoveBack() {
        this.server.playerStopMoveBack(this.hash);
    }

    startMoveRight() {
        this.server.playerStartMoveRight(this.hash);
    }

    stopMoveRight() {
        this.server.playerStopMoveRight(this.hash);
    }

    startMoveLeft() {
        this.server.playerStartMoveLeft(this.hash);
    }

    stopMoveLeft() {
        this.server.playerStopMoveLeft(this.hash);
    }

    startRotateLeft() {
        this.server.playerStartRotateLeft(this.hash);
    }

    stopRotateLeft() {
        this.server.playerStopRotateLeft(this.hash);
    }

    startRotateRight() {
        this.server.playerStartRotateRight(this.hash);
    }

    stopRotateRight() {
        this.server.playerStopRotateRight(this.hash);
    }
}