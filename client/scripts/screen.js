class Screen {
    constructor(ctx, w, h) {
        this.ctx = ctx;
        this.w = w;
        this.h = h;
        this.margin = 5;
        this.border = 1;
        this.colors = {
            background: "rgb(0, 64, 64)",
            backgroundBorderDark: "black",
            backgroundBorderLight: "rgb(6, 108, 107)",
            display: "rgb(0, 0, 163)",
            displayBorderDark: "rgb(1, 0, 109)",
            displayBorderLight: "rgb(67, 71, 229)",
        };

        this.area = { 
            x: this.margin,
            y: this.margin,
            w: this.w - this.margin * 2,
            h: this.h - (this.margin * 4) - 30
        };

        this.display = { 
            x: this.area.x,
            y: this.margin * 3 + this.area.h,
            w: this.area.w,
            h: 30
        };

        this.displayLevel = {
            x: this.display.x,
            y: this.display.y,
            w: this.display.w * 0.1,
            h: this.display.h
        };
        this.displayScore = {
            x: this.displayLevel.x + this.displayLevel.w,
            y: this.display.y,
            w: this.display.w * 0.2,
            h: this.display.h
        };
        this.displayLives = {
            x: this.displayScore.x + this.displayScore.w,
            y: this.display.y,
            w: this.display.w * 0.1,
            h: this.display.h
        };
        this.displayAvatar = {
            x: this.displayLives.x + this.displayLives.w,
            y: this.display.y,
            w: this.display.w * 0.1,
            h: this.display.h
        };
        this.displayHealth = {
            x: this.displayAvatar.x + this.displayAvatar.w,
            y: this.display.y,
            w: this.display.w * 0.134,
            h: this.display.h
        };
        this.displayAmmo = {
            x: this.displayHealth.x + this.displayHealth.w,
            y: this.display.y,
            w: this.display.w * 0.134,
            h: this.display.h
        };
        this.displayItem1 = {
            x: this.displayAmmo.x + this.displayAmmo.w,
            y: this.display.y,
            w: this.display.w * 0.03,
            h: this.display.h / 2
        };
        this.displayItem2 = {
            x: this.displayAmmo.x + this.displayAmmo.w,
            y: this.display.y + this.displayItem1.h,
            w: this.display.w * 0.03,
            h: this.display.h / 2
        };
        this.displayWeapon = {
            x: this.displayItem1.x + this.displayItem1.w,
            y: this.display.y,
            w: this.display.w + this.display.x - this.displayItem2.x - this.displayItem2.w,
            h: this.display.h
        };
    }

    draw() {
        this.drawBackground();
        this.drawDisplay();
    }

    drawBackground() {
        this.ctx.fillStyle = this.colors.background;
        this.ctx.fillRect(0, 0, this.w, this.h);
        this.drawBorder(this.area.x, this.area.y, this.area.w, this.area.h, this.colors.backgroundBorderDark, this.colors.backgroundBorderLight);
        this.drawBorder(this.display.x, this.display.y, this.display.w, this.display.h, this.colors.backgroundBorderDark, this.colors.backgroundBorderLight);
    }

    drawDisplay() {
        this.ctx.fillStyle = this.colors.display;
        this.ctx.fillRect(this.display.x, this.display.y, this.display.w, this.display.h);
        this.drawBorder(this.displayLevel.x, this.displayLevel.y, this.displayLevel.w, this.displayLevel.h, this.colors.displayBorderDark, this.colors.displayBorderLight, true);
        this.drawBorder(this.displayScore.x, this.displayScore.y, this.displayScore.w, this.displayScore.h, this.colors.displayBorderDark, this.colors.displayBorderLight, true);
        this.drawBorder(this.displayLives.x, this.displayLives.y, this.displayLives.w, this.displayLives.h, this.colors.displayBorderDark, this.colors.displayBorderLight, true);
        this.drawBorder(this.displayAvatar.x, this.displayAvatar.y, this.displayAvatar.w, this.displayAvatar.h, this.colors.displayBorderDark, this.colors.displayBorderLight, true);
        this.drawBorder(this.displayHealth.x, this.displayHealth.y, this.displayHealth.w, this.displayHealth.h, this.colors.displayBorderDark, this.colors.displayBorderLight, true);
        this.drawBorder(this.displayAmmo.x, this.displayAmmo.y, this.displayAmmo.w, this.displayAmmo.h, this.colors.displayBorderDark, this.colors.displayBorderLight, true);
        this.drawBorder(this.displayItem1.x, this.displayItem1.y, this.displayItem1.w, this.displayItem1.h, this.colors.displayBorderDark, this.colors.displayBorderLight, true);
        this.drawBorder(this.displayItem2.x, this.displayItem2.y, this.displayItem2.w, this.displayItem2.h, this.colors.displayBorderDark, this.colors.displayBorderLight, true);
        this.drawBorder(this.displayWeapon.x, this.displayWeapon.y, this.displayWeapon.w, this.displayWeapon.h, this.colors.displayBorderDark, this.colors.displayBorderLight, true);
    }

    drawBorder(x, y, w, h, colorDark, colorLight, inside) {
        if (!inside) {
            this.ctx.fillStyle = colorDark;
            this.ctx.fillRect(x, y - this.border, w + this.border, this.border);
            this.ctx.fillRect(x - this.border, y - this.border, this.border, h + this.border * 2);
            this.ctx.fillStyle = colorLight;
            this.ctx.fillRect(x, y + h, w + this.border, this.border);
            this.ctx.fillRect(x + w, y - this.border, this.border, h + this.border);
        } else {
            this.ctx.fillStyle = colorLight;
            this.ctx.fillRect(x, y, w - this.border, this.border);
            this.ctx.fillRect(x, y, this.border, h);
            this.ctx.fillStyle = colorDark;
            this.ctx.fillRect(x + this.border, y + h - this.border, w - this.border, this.border);
            this.ctx.fillRect(x + w - this.border, y + this.border, this.border, h - this.border);
        }
    }
}