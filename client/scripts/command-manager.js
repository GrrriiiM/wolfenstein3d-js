class CommandManager {
    constructor() {
    }

    setRenderer(renderer) {
        this._renderer = renderer;
    }

    onkeydown(key) {
        switch (key.toUpperCase()) {
            case "W": this._renderer.sceneManager.scene.onStartMoveFront(); break;
            case "S": this._renderer.sceneManager.scene.onStartMoveBack(); break;
            case "A": this._renderer.sceneManager.scene.onStartMoveLeft(); break;
            case "D": this._renderer.sceneManager.scene.onStartMoveRight(); break;
            case "ARROWRIGHT": this._renderer.sceneManager.scene.onStartRotateRight(); break;
            case "ARROWLEFT": this._renderer.sceneManager.scene.onStartRotateLeft(); break;
            case " ": this._renderer.sceneManager.scene.onInteract(); break;
            default: break;
        }
    }

    onkeyup(key) {
        switch (key.toUpperCase()) {
            case "W": this._renderer.sceneManager.scene.onStopMoveFront(); break;
            case "S": this._renderer.sceneManager.scene.onStopMoveBack(); break;
            case "A": this._renderer.sceneManager.scene.onStopMoveLeft(); break;
            case "D": this._renderer.sceneManager.scene.onStopMoveRight(); break;
            case "ARROWRIGHT": this._renderer.sceneManager.scene.onStopRotateRight(); break;
            case "ARROWLEFT": this._renderer.sceneManager.scene.onStopRotateLeft(); break;
            default: break;
        } 
    }
}