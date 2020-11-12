import { Config } from "./config";
import { Item } from "./item";
import { Wall } from "./wall";

export class Map2d {
    constructor(walls, items, sizeX, sizeY, config) {
        this.config = config;
        this.walls = walls.map(_ => new Wall(_.x, _.y, this.config.blockSize, _.id));
        this.items = items.map(_ => Item.create(_.x, _.y, this.config.blockSize, _.id));
        this.size = { x: sizeX, y: sizeY };
        this.blocks = [];
        for(let wall of this.walls) {
            if (!this.blocks[wall.block.x]) this.blocks[wall.block.x] = [];
            this.blocks[wall.block.x][wall.block.y] = wall;
        }
        for(let item of this.items) {
            if (!this.blocks[item.block.x]) this.blocks[item.block.x] = [];
            this.blocks[item.block.x][item.block.y] = item;
        }
    }

    static create(mapPattern, config) {
        const l = mapPattern.trim().split('\n');
        let lengthX = 0;
        let walls = [];
        let items = [];
        for(let y = 0; y < l.length; y++) {
            for(let i = 0; i < l[y].length; i += 2) {
                const x = i / 2;
                lengthX = x + 1 > lengthX ? x + 1 : lengthX;
                let id = parseInt(`${l[y][i]}${l[y][i+1]}`, 16);
                if (id <= 55) {
                    walls.push({ x, y, id: id });
                } else if (id <= 105) {
                    items.push({ x, y, id: id });
                }
            }
        }
        return new Map2d(walls, items, lengthX, l.length, config);
    }
}