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
            "walls"
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

    drawMap2d() {
        let state = this.connection?.state;
        let density = 0.25;
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.w, this.h);
        if (state) {
            let map2d = state.map2d;
            for(let wall of map2d.walls) {
                this.ctx.imageSmoothingEnabled = false;
                this.ctx.drawImage(
                    this.images[wall.render.name], 
                    wall.render.x, 
                    wall.render.y, 
                    wall.render.w, 
                    wall.render.h,
                    wall.pos.x * density,
                    wall.pos.y * density,
                    wall.render.w * density,
                    wall.render.h * density);
            }
            for(let player of map2d.players) {
                this.ctx.strokeStyle = "green";
                let pos = new Vector(player.pos.x, player.pos.y);
                let p1 = new Vector(Config.blockSize / 2, 0);
                p1.rotate(player.angle).add(pos);
                let p2 = new Vector(Config.blockSize / 2, 0);
                p2.rotate(player.angle - Math.PI / 2).div(2).add(pos);
                let p3 = new Vector(Config.blockSize / 2, 0);
                p3.rotate(player.angle + Math.PI / 2).div(2).add(pos);
                this.line(pos.x * density, pos.y * density, p1.x  * density, p1.y * density);
                this.line(pos.x * density, pos.y * density, p2.x  * density, p2.y * density);
                this.line(pos.x * density, pos.y * density, p3.x  * density, p3.y * density);
                for(let ray of player.rays) {
                    this.ctx.strokeStyle = "red";
                    if (ray.pos) this.line(pos.x * density, pos.y * density, ray.pos.x  * density, ray.pos.y * density);
                }
            }
        }
    }

    line(x1, y1, x2, y2) {
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
    }
}