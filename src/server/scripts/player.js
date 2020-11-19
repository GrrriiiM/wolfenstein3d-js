class Player extends require("./person") {
    constructor(x, y , viewAngle, typeId, map2d) {
        super(x, y, viewAngle, typeId, map2d);
    }

    getState() {
        return {
            pos: {
                x: this.pos.x,
                y: this.pos.y
            },
            angle: this.view.angle,
            walls: this.map2d.walls.map(_ => ({
                x: _.x,
                y: _.y,
                typeId: _.typeId
            }))
        }
    }
}

module && (module.exports = Player);