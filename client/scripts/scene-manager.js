class SceneManager {
    constructor() {
    }

    setRenderer(renderer) {
        this._renderer = renderer;
    }

    goToGame() {
        this.scene?.onExit();
        this.scene = new GameScene(this._renderer); 
        this.scene.onInit();
    }
}