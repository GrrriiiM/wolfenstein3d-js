class BaseScene {
    constructor(renderer, backgroundColor) {
        this.renderer = renderer;
        this.backgroundColor = backgroundColor;
        this.border = renderer.w / 320;
        this.margin = renderer.w / 64;
    }

    onInit() {
        this.renderer.element.style.backgroundColor = this.backgroundColor;
    }

    draw() {
        this.onDraw();
    }
    onDraw() {
        this.renderer.ctx.fillStyle = this.backgroundColor;
        this.renderer.ctx.fillRect(0, 0, this.renderer.w, this.renderer.h);
    }

    onExit() {
        return true;
    }

    onresize() {

    }

    onStartMoveFront() {}
    onStartMoveBack() {}
    onStartMoveLeft() {}
    onStartMoveRight() {}
    onStartRotateRight() {}
    onStartRotateLeft() {}
    onStopMoveFront() {}
    onStopMoveBack() {}
    onStopMoveLeft() {}
    onStopMoveRight() {}
    onStopRotateRight() {}
    onStopRotateLeft() {}

    drawBorder(x, y, w, h, inside) {
        const ctx = this.renderer.ctx;
        const globalAlpha = ctx.globalAlpha;
        ctx.globalAlpha = 0.5;
        if (!inside) {
            ctx.fillStyle = "rgb(0, 0, 0)";
            ctx.fillRect(x - this.border, y - this.border, w + this.border, this.border);
            ctx.fillRect(x - this.border, y, this.border, h + this.border);
            ctx.fillStyle = "rgb(255, 255, 255)";
            ctx.fillRect(x, y + h, w + this.border, this.border);
            ctx.fillRect(x + w, y - this.border, this.border, h + this.border);
        } else {
            ctx.fillStyle = "rgb(255, 255, 255)";
            ctx.fillRect(x, y, w - this.border, this.border);
            ctx.fillRect(x, y + this.border, this.border, h - this.border);
            ctx.fillStyle = "rgb(0, 0, 0)";
            ctx.fillRect(x, y + h - this.border, w, this.border);
            ctx.fillRect(x + w - this.border, y, this.border, h - this.border);
        }
        ctx.globalAlpha = globalAlpha;
    }
}