class GameArea {
    constructor(gameScene) {
        this.scene = gameScene;
        this.x = this.scene.margin; 
        this.y = this.scene.margin;
        this.w = this.scene.renderer.w - this.scene.margin * 2;
        this.h = this.scene.margin * 30;
    }

    draw() {
        const ctx = this.scene.renderer.ctx;
        // ctx.fillStyle = "gray";
        // ctx.fillRect(this.x, this.y, this.w, this.h);
        this.scene.drawBorder(this.x, this.y, this.w, this.h);
    }
}