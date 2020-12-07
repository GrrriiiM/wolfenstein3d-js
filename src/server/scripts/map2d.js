class Map2d {
    constructor(walls, items, sizeX, sizeY, config) {
        this.config = config;
        this.walls = walls.map(_ => new (require("./wall"))(_.x, _.y, _.id));
        this.items = items.map(_ => (require("./item")).create(_.x, _.y, _.id, this)).filter(_ => _);
        this.doors = this.items.filter(_ => _.isDoor);
        this.size = { x: sizeX, y: sizeY };
        this.blocks = [];
        this.players = [];
        for(let wall of this.walls) {
            if (!this.blocks[wall.x]) this.blocks[wall.x] = [];
            this.blocks[wall.x][wall.y] = wall;
        }
        for(let item of this.items) {
            if (!this.blocks[item.x]) this.blocks[item.x] = [];
            this.blocks[item.x][item.y] = item;
        }
    }

    getWall(x, y) {
        let block = this.blocks[x] ? this.blocks[x][y] : null;
        return block instanceof require("./wall") ? block : null;
    }

    getDoor(x, y) {
        let block = this.blocks[x] ? this.blocks[x][y] : null;
        return block instanceof require("./door") ? block : null;
    }

    addPlayer(player) {
        this.players.push(player);
    }

    update() {
        this.players.forEach(_ => _.update());
        this.doors.forEach(_ => _.update());
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
                if (id <= 48) {
                    walls.push({ x, y, id: id });
                } else if (id <= 105) {
                    items.push({ x, y, id: id });
                }
            }
        }
        return new Map2d(walls, items, lengthX, l.length, config);
    }
}

module.exports = Map2d;