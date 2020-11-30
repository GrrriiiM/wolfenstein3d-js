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
            rays: this.view.rays.map(ray => ({
                x: ray.pos.x,
                y: ray.pos.y,
                dist: ray.distAdjusted,
                wallTypeId: ray.wall ? ray.wall.typeId : null,
                wallOffset: ray.wallOffset,
                isVertical: ray.isVertical,
                isInverted: ray.isInverted,
                isDoor: ray.isDoor,
                items: ray.items.map(item => ({
                    typeId: item.item.typeId,
                    isDoor: item.item.isDoor,
                    dist: item.distAdjusted,
                    offset: item.offset
                }))
            }))
        };
    }
}

module && (module.exports = Player);