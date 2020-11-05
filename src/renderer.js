import { Config } from "./config.js";
import { Vector } from "./vector.js";

export class Renderer {
    constructor(connection, elementQuerySelector) {
        this.connection = connection;
        let querySelector = elementQuerySelector || "body";
        let element = document.querySelector(querySelector);
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.ctx.imageSmoothingEnabled = false;
        element.appendChild(this.canvas);
        this.resize();
        this.loadImages(element);

    }

    loadImages(element) {
        this.images = {};
        let images = [
            "walls",
            "decorations"
        ];
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
        this.canvas.width = this.w;
        this.canvas.height = this.h;
    }

    draw() {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.w, this.h);
        this.drawFov();
        this.drawMap2d();
    }

    drawMap2d() {
        let state = this.connection?.state;
        let density = 1;
        if (state) {
            let map2d = state.map2d;
            for (let block of map2d.walls.concat(map2d.decorations)) {
                this.ctx.imageSmoothingEnabled = false;
                this.ctx.drawImage(
                    this.images[block.render.name],
                    block.render.x,
                    block.render.y,
                    block.render.w,
                    block.render.h,
                    block.pos.x * density,
                    block.pos.y * density,
                    block.render.w * density,
                    block.render.h * density);

                let imgd = this.ctx.getImageData(
                    block.pos.x * density,
                    block.pos.y * density,
                    block.render.w * density,
                    block.render.h * density);
                let pixels = imgd.data;
                let transparency = { r: 0, g: 0, b: 0, a: 0 };

                for (var i = 0; i < pixels.length; i += 4) {
                    let r = pixels[i];
                    let g = pixels[i + 1];
                    let b = pixels[i + 2];

                    if (r == 152 && g == 0 && b == 136) {
                        pixels[i] = transparency.r;
                        pixels[i + 1] = transparency.g;
                        pixels[i + 2] = transparency.b;
                        pixels[i + 3] = transparency.a;
                    }
                }

                this.ctx.putImageData(imgd, block.pos.x * density, block.pos.y * density);
            }
            for (let player of map2d.players) {
                this.ctx.strokeStyle = "green";
                let pos = new Vector(player.pos.x, player.pos.y);
                let p1 = new Vector(Config.blockSize / 2, 0);
                p1.rotate(player.angle).add(pos);
                let p2 = new Vector(Config.blockSize / 2, 0);
                p2.rotate(player.angle - Math.PI / 2).div(2).add(pos);
                let p3 = new Vector(Config.blockSize / 2, 0);
                p3.rotate(player.angle + Math.PI / 2).div(2).add(pos);
                this.line(pos.x * density, pos.y * density, p1.x * density, p1.y * density);
                this.line(pos.x * density, pos.y * density, p2.x * density, p2.y * density);
                this.line(pos.x * density, pos.y * density, p3.x * density, p3.y * density);
                for (let ray of player.rays) {
                    this.ctx.strokeStyle = "red";
                    if (ray.pos) this.line(pos.x * density, pos.y * density, ray.pos.x * density, ray.pos.y * density);
                }
            }
        }
    }

    drawFov() {
        let state = this.connection?.state;
        if (state) {
            let player = state.map2d.players[0];
            let w = this.w > this.h ? this.h : this.w;
            this.ctx.fillStyle = "rgb(65, 65, 65)";
            this.ctx.fillRect(0, 0, w, this.h / 2);
            this.ctx.fillStyle = "rgb(124, 124, 124)";
            this.ctx.fillRect(0, this.h / 2, w, this.h / 2);
            w = w / player.rays.length;
            player.rays.forEach((ray, i) => {
                let x = i * w;
                let wall = ray.wall;
                let sw;
                let h = ((this.h * 50) / (player.pos.copy().sub(ray.pos).mag + 1));
                let y = this.h / 2 - h / 2;
                if (!ray.vertical) {
                    sw = ray.pos.x - wall.pos.x;
                } else {
                    sw = ray.pos.y - wall.pos.y + Config.blockSize;
                }
                if (wall) {
                    this.ctx.drawImage(
                        this.images[wall.render.name],
                        wall.render.x + Math.floor(sw),
                        wall.render.y,
                        1,
                        wall.render.h,
                        x,
                        y,
                        w,
                        h);
                }
                ray.decorations.forEach((decoration) => {
                    let x = i * w;
                    let sw;
                    let h = ((this.h * 50) / (player.pos.copy().sub(decoration.pos).mag + 1));
                    let y = this.h / 2 - h / 2;
                    if (!ray.vertical) {
                        sw = ray.pos.x - decoration.pos.x;
                    } else {
                        sw = ray.pos.y - decoration.pos.y;
                    }
                    this.ctx.drawImage(
                        this.images[decoration.render.name],
                        decoration.render.x + Math.floor(sw),
                        decoration.render.y,
                        1,
                        decoration.render.h,
                        x,
                        y,
                        w,
                        h);
                });
            });
        }
    }

    line(x1, y1, x2, y2) {
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
    }
}