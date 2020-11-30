import { Config } from "./config.js";
import { Decoration } from "./decoration.js";
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
        this.ctx.imageSmoothingEnabled = false;
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.w, this.h);
        this.drawFov();
        //this.drawMap2d();
    }

    drawMap2d() {
        let state = this.connection?.state;
        let density = 0.25;
        if (state) {
            let map2d = state.map2d;
            let player = map2d.players[0];
            for (let wall of map2d.walls) {
                
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
            for (let decoration of map2d.decorations) {
                this.ctx.imageSmoothingEnabled = false;

                // this.ctx.save();
                // this.ctx.translate((decoration.pos.x + Config.blockSize / 2) * density, (decoration.pos.y + Config.blockSize / 2) * density);
                // this.ctx.rotate(player.angle);

                this.ctx.drawImage(
                    this.images[decoration.render.name],
                    decoration.render.x,
                    decoration.render.y,
                    decoration.render.w,
                    decoration.render.h,
                    decoration.pos.x * density,
                    decoration.pos.y * density,
                    decoration.render.w * density,
                    decoration.render.h * density);
                    
                //this.ctx.restore();
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
                let dist = player.pos.copy().sub(ray.pos).mag;
                dist *= Math.cos(ray.angle);
                let h = ((this.h * 60) / (dist + 1));
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
                ray.decorations.sort((a, b) => b.dist - a.dist).forEach((_) => {
                    // let dist = decoration.pos.copy().add({ x: Config.blockSize / 2, y: Config.blockSize / 2 }).sub(player.pos);
                    // dist.rotate(-player.angle);
                    // // if (player.angle > Math.PI) dist.x -= Config.blockSize/2;
                    // // else dist.x += Config.blockSize/2; 
                    // let disty = Math.sin(ray.angle) * dist.x;
                    // disty = dist.y - disty;
                    // disty -= Config.blockSize / 2;
                    // let sx = disty % Config.blockSize;
                    let h1 = ((this.h * 60) / (_.x));
                    // if (sx < 0) sx = Config.blockSize + sx;
                    let p = player.pos.copy();
                    p.sub(_.decoration.pos);

                    this.ctx.drawImage(
                        this.images[_.decoration.render.name],
                        _.decoration.render.x + (Config.blockSize - Math.floor(_.y)) - Config.blockSize,
                        _.decoration.render.y,
                        1,
                        _.decoration.render.h,
                        x,
                        this.h/2 - h1/2,
                        w,
                        h1);

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