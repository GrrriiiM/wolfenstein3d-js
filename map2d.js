import { Decoration } from "./decoration.js";
import { Player } from "./player.js";
import { Wall } from "./wall.js";


export class Map2d {
    constructor(walls, players, decorations) {
        this.walls = walls.map(_ => new Wall(_.x, _.y, _.v));
        this.decorations = decorations.map(_ => new Decoration(_.x, _.y, _.v));
        this.players = players.map(_ => new Player(_.x, _.y, this));
        let blockMax = this.walls.reduce((p, v) => {
            return {
                x: v.x > p.x ? v.x : p.x,
                y: v.y > p.y ? v.y : p.y
            }
        }, { x: 0, y: 0 })
        this.blocks = [];
        this.blocks.maxX = blockMax.x;
        this.blocks.maxY = blockMax.y;
        for (let wall of this.walls) {
            if (!this.blocks[wall.y]) this.blocks[wall.y] = [];
            this.blocks[wall.y][wall.x] = wall;
        }
        for (let decoration of this.decorations) {
            if (!this.blocks[decoration.y]) this.blocks[decoration.y] = [];
            this.blocks[decoration.y][decoration.x] = decoration;
        }


    }

    getBlock(x, y) {
        if (this.blocks[y]) return this.blocks[y][x];
    }

    getWall(x, y) {
        let block = this.getBlock(x, y);
        return block instanceof Wall ? block : null;
    }

    getDecoration(x, y) {
        let block = this.getBlock(x, y);
        return block instanceof Decoration ? block : null;
    }

    static createMap2d(mapPattern) {
        let m = mapPattern.trim().split('\n');
        let maxX = Math.floor(m.reduce((p, v, i) => v.length > p ? v.length : p, 0) / 2);
        let maxY = m.length;
        let walls = [];
        let players = [];
        let decorations = [];
        for (let y = 0; y < maxY; y++) {
            for (let x = 0; x < maxX; x++) {
                let s = m[y][x * 2] + m[y][x * 2 + 1];
                if (s != "  ") {
                    let v = parseInt(s, 16);
                    if (v < 55) {
                        walls.push({ x, y, v });
                    }
                    else if (v < 105) {
                        decorations.push({ x, y, v })
                    }
                    else if (v >= 240) {
                        players[v - 240] = { x, y };
                    }
                }
            }
        }
        return new Map2d(walls, players, decorations);
    }

}