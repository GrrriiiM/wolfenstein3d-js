class WorkerClient {
    constructor() {
        this.server = new Worker("./client/scripts/scenes/game/worker-server.js");
        this.start = () => this.server.postMessage({ command: "start" });
        this.stop = () => this.server.postMessage({ command: "stop" });
        this.startMoveFront = () => this.server.postMessage({ command: "startMoveFront" });
        this.startMoveBack = () => this.server.postMessage({ command: "startMoveBack" });
        this.startMoveLeft = () => this.server.postMessage({ command: "startMoveLeft" });
        this.startMoveRight = () => this.server.postMessage({ command: "startMoveRight" });
        this.startRotateRight = () => this.server.postMessage({ command: "startRotateRight" });
        this.startRotateLeft = () => this.server.postMessage({ command: "startRotateLeft" });

        this.stopMoveFront = () => this.server.postMessage({ command: "stopMoveFront" });
        this.stopMoveBack = () => this.server.postMessage({ command: "stopMoveBack" });
        this.stopMoveLeft = () => this.server.postMessage({ command: "stopMoveLeft" });
        this.stopMoveRight = () => this.server.postMessage({ command: "stopMoveRight" });
        this.stopRotateRight = () => this.server.postMessage({ command: "stopRotateRight" });
        this.stopRotateLeft = () => this.server.postMessage({ command: "stopRotateLeft" });

        this.interact = () => this.server.postMessage({ command: "interact" });
        
        this.server.onmessage = event => {
            switch (event.data.command) {
                case "state": return this.state = event.data.state;
            }
        }
    }
}



