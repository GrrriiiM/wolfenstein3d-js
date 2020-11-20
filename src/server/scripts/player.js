class Player extends require("./person") {
    constructor(x, y , viewAngle, typeId, map2d) {
        super(x, y, viewAngle, typeId, map2d);
    }

    update() {
        super.update();
        this.view.cast();
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
            })),
            rays: this.view.rays.map(_ => ({
                x: _.pos.x,
                y: _.pos.y,
                dist: _.distAdjusted,
                wallTypeId: _.wall ? _.wall.typeId : null,
                wallOffset: _.wallOffset,
                vertical: _.vertical
            }))
        };
    }
}

module && (module.exports = Player);