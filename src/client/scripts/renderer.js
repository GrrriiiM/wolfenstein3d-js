const images = [
    "walls",
    "decorations"
];

class Renderer {
    constructor(client, elementQuerySelector) {
        this.client = client;
        this.density = 20;
        
        let querySelector = elementQuerySelector || "body";
        let element = document.querySelector(querySelector);
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.ctx.imageSmoothingEnabled = false;
        element.appendChild(this.canvas);
        this.loadImages(element);
        this.requestFrame;
        this.frame = (time) => {
            this.draw();
            this.requestFrame(this.frame);
        }

        if (typeof window !== 'undefined') {
            if (window.requestAnimationFrame) this.requestFrame = (frame) => window.requestAnimationFrame(frame);
            else if (window.webkitRequestAnimationFrame) this.requestFrame = (frame) => window.webkitRequestAnimationFrame(frame);
        }

        this.screen = new Screen(this.ctx);

        window.onresize = this.resize.bind(this);

        window.onkeydown = (e) => {
            switch (e.key.toUpperCase()) {
                case "W": this.client.startMoveFront(); break;
                case "S": this.client.startMoveBack(); break;
                case "A": this.client.startMoveLeft(); break;
                case "D": this.client.startMoveRight(); break;
                case "ARROWRIGHT": this.client.startRotateRight(); break;
                case "ARROWLEFT": this.client.startRotateLeft(); break;
                default: break;
            }
        }

        window.onkeyup = (e) => {
            switch (e.key.toUpperCase()) {
                case "W": this.client.stopMoveFront(); break;
                case "S": this.client.stopMoveBack(); break;
                case "A": this.client.stopMoveLeft(); break;
                case "D": this.client.stopMoveRight(); break;
                case "ARROWRIGHT": this.client.stopRotateRight(); break;
                case "ARROWLEFT": this.client.stopRotateLeft(); break;
                default: break;
            }   
        }

        this.resize();
        this.frame();
    }

    loadImages(element) {
        this.images = {};
        images.forEach(_ => {
            var img = document.createElement("img");
            img.style = "display: none";
            img.src = `assets/${_}.png`;
            element.appendChild(img);
            this.images[_] = img;
        })
    }

    resize() {
        this.w = window.innerWidth;
        this.h = window.innerHeight;
        // this.aw = this.w > (this.h/3)*4 ? (this.h/3)*4 : this.w;
        // this.ah = (this.aw/4) * 3;
        // this.border = (this.ah < this.aw ? this.ah : this.aw) / 30;
        // this.l = this.aw / 300;
        // this.menu = {};
        // this.menu.w = this.aw - this.border * 2;
        // this.menu.h = this.ah / 6;
        
        // this.area = {};
        // this.area.w = this.menu.w;
        // this.area.h = this.ah - this.menu.h - this.border * 3;
        // this.area.x = this.w / 2 - this.area.w / 2;
        // this.area.y = this.border;
        // this.menu.x = this.area.x;
        // this.menu.y = this.border * 2 + this.area.h;
        this.canvas.width = this.w;
        this.canvas.height = this.h;
        this.screen.resize();
    }

    draw() {
        this.ctx.imageSmoothingEnabled = false;
        
        if (!this.client.state) return;
        let p = this.screen.area.w / this.client.state.rays.length;
        this.ctx.fillStyle = "rgb(56, 56, 56)";
        this.ctx.fillRect(0, 0, this.screen.w, this.screen.h);
        this.ctx.fillStyle = "rgb(112, 112, 112)";
        this.ctx.fillRect(0, this.screen.area.y + this.screen.area.h / 2, this.screen.w, this.screen.h);
        for(let [i, ray] of this.client.state.rays.entries()) {
            const h = (this.screen.area.h) / (ray.dist * 3);
            this.ctx.drawImage(
                this.images["walls"],
                ((ray.wallTypeId % 3 * 64) * 2) + Math.floor(64 * (1 - ray.wallOffset)) + (ray.vertical ? 64 : 0),
                (Math.floor(ray.wallTypeId / 3) * 64),
                1,
                64,
                this.screen.area.x + p * i,
                this.screen.area.y + (this.screen.area.h / 2 - h / 2),
                p,
                h);
        }

        const imageData = this.ctx.getImageData(this.screen.area.x, this.screen.area.y, this.screen.area.w, this.screen.area.h);

        this.screen.draw();

        this.ctx.putImageData(imageData, this.screen.area.x, this.screen.area.y);
        
        // this.ctx.fillStyle = "rgb(0, 64, 64)";
        // this.ctx.fillRect(0, 0, this.w, this.h);

        // this.ctx.fillStyle = "gray";
        // this.ctx.fillRect(this.area.x, this.area.y, this.area.w, this.area.h);
        // this.ctx.fillStyle = "black";
        // this.ctx.fillRect(this.area.x - this.l, this.area.y - this.l, this.area.w + this.l, this.l);
        // this.ctx.fillRect(this.area.x - this.l, this.area.y - this.l, this.l, this.area.h + this.l);

        // this.ctx.fillStyle = "rgb(6, 108, 107)";
        // this.ctx.fillRect(this.area.x - this.l, this.area.y + this.area.h - this.l, this.area.w + this.l * 2, this.l);
        // this.ctx.fillRect(this.area.x + this.area.w, this.area.y - this.l, this.l, this.area.h + this.l);

        // this.ctx.fillStyle = "rgb(0, 0, 163)";
        // this.ctx.fillRect(this.menu.x, this.menu.y, this.menu.w, this.menu.h);



        // this.ctx.fillStyle = "black";
        // this.ctx.fillRect(this.menu.x - this.l, this.menu.y - this.l, this.menu.w + this.l, this.l);
        // this.ctx.fillRect(this.menu.x - this.l, this.menu.y - this.l, this.l, this.menu.h + this.l);

        // this.ctx.fillStyle = "rgb(6, 108, 107)";
        // this.ctx.fillRect(this.menu.x - this.l, this.menu.y + this.menu.h - this.l, this.menu.w + this.l * 2, this.l);
        // this.ctx.fillRect(this.menu.x + this.menu.w, this.menu.y - this.l, this.l, this.menu.h + this.l);



        
        const pos = this.client.state.pos;
        const angle = this.client.state.angle;
        this.ctx.strokeStyle = "black";
        let p1 = new Vector2d(0.5, 0);
        p1.rotate(angle).add(pos);
        let p2 = new Vector2d(0.5, 0);
        p2.rotate(angle - Math.PI / 2).div(2).add(pos);
        let p3 = new Vector2d(0.5, 0);
        p3.rotate(angle + Math.PI / 2).div(2).add(pos);
        this.line(pos.x * this.density, pos.y * this.density, p1.x * this.density, p1.y * this.density);
        this.line(pos.x * this.density, pos.y * this.density, p2.x * this.density, p2.y * this.density);
        this.line(pos.x * this.density, pos.y * this.density, p3.x * this.density, p3.y * this.density);


        for(var wall of this.client.state.walls) {
            this.ctx.drawImage(
                this.images["walls"],
                ((wall.typeId % 3 * 64) * 2),
                (Math.floor(wall.typeId / 3) * 64),
                64,
                64,
                wall.x * this.density,
                wall.y * this.density,
                this.density,
                this.density);
        }

        for(let ray of this.client.state.rays) {
            this.ctx.strokeStyle = "red";
            this.line(this.client.state.pos.x * this.density, this.client.state.pos.y * this.density, ray.x * this.density, ray.y * this.density);
        }

    }

    line(x1, y1, x2, y2) {
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
    }
}