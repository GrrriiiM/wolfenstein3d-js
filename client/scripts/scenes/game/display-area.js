class DisplayArea {
    constructor(gameScene) {
        this.scene = gameScene;
        this.x = this.scene.margin; 
        this.y = this.scene.margin + this.scene.gameArea.y + this.scene.gameArea.h;
        this.w = this.scene.renderer.w - this.scene.margin * 2;
        this.h = this.scene.renderer.h - this.scene.gameArea.h - this.scene.margin * 2;
    }

    draw() {
        const ctx = this.scene.renderer.ctx;
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x, this.y, this.w, this.h);
        this.scene.drawBorder(this.x, this.y, this.w, this.h);
        this.scene.drawBorder(this.x, this.y, this.w, this.h, true);
    }
}