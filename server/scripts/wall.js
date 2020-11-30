class Wall extends require("./block") {
    constructor(x, y, typeId) {
        super(x, y);
        this.isSolid = true;
        this.typeId = typeId;
    }
}

module && (module.exports = Wall);