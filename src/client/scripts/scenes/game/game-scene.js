class GameScene extends BaseScene {
    constructor(renderer) {
        super(renderer, "rgb(0, 64, 64)")
        this.gameArea = new GameArea(this);
        this.displayArea = new DisplayArea(this);
    }

    onInit() {
        super.onInit();
        this.client = new WorkerClient();
        this.client.start();
    }

    onDraw() {
        super.onDraw();
        this.gameArea.draw();
        this.displayArea.draw();
    }

    onExit() {
        this.client.stop();
        return super.onExit();
    }

    onStartMoveFront() { this.client.startMoveFront(); }
    onStartMoveBack() { this.client.startMoveBack(); }
    onStartMoveLeft() { this.client.startMoveLeft(); }
    onStartMoveRight() { this.client.startMoveRight(); }
    onStartRotateRight() { this.client.startRotateRight(); }
    onStartRotateLeft() { this.client.startRotateLeft(); }
    onStopMoveFront() { this.client.stopMoveFront(); }
    onStopMoveBack() { this.client.stopMoveBack(); }
    onStopMoveLeft() { this.client.stopMoveLeft(); }
    onStopMoveRight() { this.client.stopMoveRight(); }
    onStopRotateRight() { this.client.stopRotateRight(); }
    onStopRotateLeft() { this.client.stopRotateLeft(); }

}