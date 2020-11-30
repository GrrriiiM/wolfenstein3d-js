class GameArea {
    constructor(gameScene) {
        this.scene = gameScene;
        this.x = this.scene.border * 2; 
        this.y = this.scene.border * 2;
        this.w = this.scene.renderer.w - this.scene.border * 4;
        this.h = this.scene.renderer.h * 0.8;
    }

    draw() {
        const ctx = this.scene.renderer.ctx;

        this.drawFov();
        const imageData = ctx.getImageData(this.x, this.y, this.w, this.h);

        ctx.fillStyle = this.scene.backgroundColor;
        ctx.fillRect(0, 0, this.scene.renderer.w, this.scene.renderer.h);

        ctx.putImageData(imageData, this.x, this.y);

        this.scene.drawBorder(this.x, this.y, this.w, this.h);
    }

    drawFov() {
        const ctx = this.scene.renderer.ctx;
        ctx.fillStyle = "rgb(56, 56, 56)";
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = "rgb(112, 112, 112)";
        ctx.fillRect(this.x, this.y + this.h / 2, this.w, this.h / 2);
        if (!this.scene.client.state) return;
        
        const w = this.w / this.scene.client.state.rays.length;
        for(let [i, ray] of this.scene.client.state.rays.entries()) {
            const h = Math.floor((this.h * 1.6) / (ray.dist));
            let spriteX = ray.isDoor ? 4 : (ray.wallTypeId % 3) * 2;
            let spriteY = ray.isDoor ? 16 : Math.floor(ray.wallTypeId / 3);
            ctx.drawImage(
                this.scene.renderer.images["walls"],
                Math.floor((spriteX + (ray.isVertical ? 1 : 0) + ray.wallOffset) * 64),
                spriteY * 64,
                1,
                64,
                this.x + (i * w),
                this.y + (this.h / 2 - h / 2),
                w,
                h);
            
            for(let item of ray.items.sort((a, b) =>  b.dist - a.dist)) {
                const _h = Math.floor((this.h * 1.6) / (item.dist));
                if (item.isDoor) {
                    const image = "walls";
                    spriteX = 2;
                    spriteY = 16;
                    ctx.drawImage(
                        this.scene.renderer.images[image],
                        Math.floor((spriteX + (item.offset)) * 64),
                        spriteY * 64,
                        1,
                        64,
                        this.x + (i * w),
                        this.y + (this.h / 2 - _h / 2),
                        w,
                        _h);
                } else {
                    const image = "items";
                    spriteX = ((item.typeId - 56) % 5);
                    spriteY = Math.floor((item.typeId - 56) / 5);
                    if (item.isDoor) {
                        image = "walls";
                        spriteX = 2;
                        spriteY = 16;
                    }
                    ctx.drawImage(
                        this.scene.renderer.images[image],
                        Math.floor((spriteX - (item.offset) + 0.5) * 64) + spriteX,
                        spriteY * 64 + spriteY,
                        1,
                        64,
                        this.x + (i * w),
                        this.y + (this.h / 2 - _h / 2),
                        w,
                        _h);
                }
            }

        }

        // const imageData = this.ctx.getImageData(this.screen.area.x, this.screen.area.y, this.screen.area.w, this.screen.area.h);

        // this.screen.draw();

        // this.ctx.putImageData(imageData, this.screen.area.x, this.screen.area.y);
    }
}