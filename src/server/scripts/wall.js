class Wall extends require("./block") {
    constructor(x, y, typeId) {
        super(x, y)
        this.typeId = typeId;
    }
}

module && (module.exports = Wall);