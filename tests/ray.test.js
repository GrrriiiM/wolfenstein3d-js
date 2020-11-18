const { Ray } = require("../src/server/ray");
const { Wall } = require("../src/server/wall");

test("constructor success", () => {
    let ray = new Ray({ angle: 10 }, 20);
    expect(ray.angle).toBe(20);
    expect(ray.view.angle).toBe(10);
});

test("calcAngle success 1", () => {
    let ray = new Ray({ person: { angle: Math.PI * 1.5 } }, Math.PI * 0.5 + Math.PI / 6);
    expect(ray.calcAngle()).toBeCloseTo(Math.PI / 6, 5);
});

test("calcAngle success 2", () => {
    let ray = new Ray({ person: { angle: Math.PI } }, Math.PI * 0.5 + Math.PI / 6);
    expect(ray.calcAngle()).toBeCloseTo(Math.PI * 1.5 + Math.PI / 6, 5);
});


test("calcDirY success 1", () => {
    let ray = new Ray({ person: { angle: 0 } }, Math.PI * 0.5);
    expect(ray.calcDirH()).toBe(1);
});

test("calcDirY success 2", () => {
    let ray = new Ray({ person: { angle: 0 } }, Math.PI * 1.5);
    expect(ray.calcDirH()).toBe(-1);
});

test("calcDirY success 3", () => {
    let ray = new Ray({ person: { angle: 0 } }, Math.PI);
    expect(ray.calcDirH()).toBe(0);
});

test("calcDirX success 1", () => {
    let ray = new Ray({ person: { angle: 0 } }, Math.PI * 2);
    expect(ray.calcDirV()).toBe(1);
});

test("calcDirX success 2", () => {
    let ray = new Ray({ person: { angle: 0 } }, Math.PI);
    expect(ray.calcDirV()).toBe(-1);
});

test("calcDirX success 3", () => {
    let ray = new Ray({ person: { angle: 0 } }, Math.PI * 0.5);
    expect(ray.calcDirV()).toBe(0);
});



test("calcDistH success 1", () => {
    let ray = new Ray({ person: { offset: { y: 0.2 }, angle: 0 } }, Math.PI / 6);
    expect(ray.calcDistH()).toBeCloseTo(1.6, 5);
});

test("calcDistH success 2", () => {
    let ray = new Ray({ person: { offset: { y: 0.2 }, angle: 0 } },  Math.PI + Math.PI / 3);
    expect(ray.calcDistH()).toBeCloseTo(0.23094, 5);
});

test("calcDistH success 3", () => {
    let ray = new Ray({ person: { offset: { y: 0.2 }, angle: 0 } }, 0);
    expect(ray.calcDistH()).toBeCloseTo(0, 5);
});

test("calcDistH success 4", () => {
    let ray = new Ray({ person: { offset: { y: 0.2 }, angle: 0 } }, Math.PI);
    expect(ray.calcDistH()).toBeCloseTo(0, 5);
});





test("calcDistV success 1", () => {
    let ray = new Ray({ person: { offset: { x: 0.3 }, angle: 0 } }, Math.PI / 6);
    expect(ray.calcDistV()).toBeCloseTo(0.80829, 5);
});

test("calcDistV success 2", () => {
    let ray = new Ray({ person: { offset: { x: 0.3 }, angle: 0 } },  Math.PI + Math.PI / 3);
    expect(ray.calcDistV()).toBeCloseTo(0.6, 5);
});

test("calcDistV success 3", () => {
    let ray = new Ray({ person: { offset: { x: 0.3 }, angle: 0 } }, Math.PI * 0.5);
    expect(ray.calcDistV()).toBe(0, 5);
});

test("calcDistV success 4", () => {
    let ray = new Ray({ person: { offset: { x: 0.3 }, angle: 0 } }, Math.PI * 1.5);
    expect(ray.calcDistV()).toBeCloseTo(0, 5);
});





test("calcDeltaDistH success 1", () => {
    let ray = new Ray({ person: { offset: { y: 0.2 }, angle: 0 } }, Math.PI / 6);
    expect(ray.calcDeltaDistH()).toBeCloseTo(2, 5);
});

test("calcDeltaDistH success 2", () => {
    let ray = new Ray({ person: { offset: { y: 0.2 }, angle: 0 } },  Math.PI + Math.PI / 3);
    expect(ray.calcDeltaDistH()).toBeCloseTo(1.15470, 5);
});

test("calcDeltaDistV success 1", () => {
    let ray = new Ray({ person: { offset: { x: 0.3 }, angle: 0 } }, Math.PI / 6);
    expect(ray.calcDeltaDistV()).toBeCloseTo(1.15470, 5);
});

test("calcDeltaDistV success 2", () => {
    let ray = new Ray({ person: { offset: { x: 0.3 }, angle: 0 } },  Math.PI + Math.PI / 3);
    expect(ray.calcDeltaDistV()).toBeCloseTo(2, 5);
});







test("cast success 1", () => {
    let wall = new Wall();
    let walls = [];
    walls[2] = [];
    walls[2][3] = wall;
    let view = {
        person: {
            angle: 0,
            block: { x: 1, y: 2 },
            offset: { x: 0.3, y: 0.2 },
            pos: { x: 1.3, y: 2.2 },
            map2d: {
                maxX: 10,
                maxY: 10,
                getWall: (x, y) => walls[x] ? walls[x][y] : null
            }
        }
    };
    let ray = new Ray(view, Math.PI / 6);
    
    ray.cast();

    expect(ray.wall).toBe(wall);
    expect(ray.vertical).toBe(false);
    expect(ray.pos.x).toBeCloseTo(2.69, 2);
    expect(ray.pos.y).toBeCloseTo(3, 0);
    expect(ray.distAdjusted).toBeCloseTo(0.8, 2);
    expect(ray.wallOffset).toBeCloseTo(0.69, 2);
});



test("cast success 2", () => {
    let wall = new Wall();
    let walls = [];
    walls[7] = [];
    walls[7][6] = wall;
    let view = {
        person: {
            angle: 0,
            block: { x: 1, y: 2 },
            offset: { x: 0.3, y: 0.2 },
            pos: { x: 1.3, y: 2.2 },
            map2d: {
                maxX: 10,
                maxY: 10,
                getWall: (x, y) => walls[x] ? walls[x][y] : null
            }
        }
    };
    let ray = new Ray(view, Math.PI / 6);
    
    ray.cast();

    expect(ray.wall).toBe(wall);
    expect(ray.vertical).toBe(false);
    expect(ray.pos.x).toBeCloseTo(7.88, 2);
    expect(ray.pos.y).toBeCloseTo(6, 0);
    expect(ray.distAdjusted).toBeCloseTo(3.8, 2);
    expect(ray.wallOffset).toBeCloseTo(0.88, 2);
});


test("cast success 3", () => {
    let wall = new Wall();
    let walls = [];
    walls[3] = [];
    walls[3][1] = wall;
    let view = {
        person: {
            angle: 0,
            block: { x: 4, y: 2 },
            offset: { x: 0.4, y: 0.4 },
            pos: { x: 4.4, y: 2.4 },
            map2d: {
                maxX: 10,
                maxY: 10,
                getWall: (x, y) => walls[x] ? walls[x][y] : null
            }
        }
    };
    let ray = new Ray(view, Math.PI + Math.PI / 6);
    
    ray.cast();

    expect(ray.wall).toBe(wall);
    expect(ray.vertical).toBe(false);
    expect(ray.pos.x).toBeCloseTo(3.71, 2);
    expect(ray.pos.y).toBeCloseTo(2, 0);
    expect(ray.distAdjusted).toBeCloseTo(0.4, 2);
    expect(ray.wallOffset).toBeCloseTo(0.71, 2);
});


test("cast success 4", () => {
    let wall = new Wall();
    let walls = [];
    walls[1] = [];
    walls[1][0] = wall;
    let view = {
        person: {
            angle: 0,
            block: { x: 4, y: 2 },
            offset: { x: 0.4, y: 0.4 },
            pos: { x: 4.4, y: 2.4 },
            map2d: {
                maxX: 10,
                maxY: 10,
                getWall: (x, y) => walls[x] ? walls[x][y] : null
            }
        }
    };
    let ray = new Ray(view, Math.PI + Math.PI / 6);
    
    ray.cast();

    expect(ray.wall).toBe(wall);
    expect(ray.vertical).toBe(false);
    expect(ray.pos.x).toBeCloseTo(1.98, 2);
    expect(ray.pos.y).toBeCloseTo(1, 0);
    expect(ray.distAdjusted).toBeCloseTo(1.4, 2);
    expect(ray.wallOffset).toBeCloseTo(0.98, 2);
});




test("cast success 5", () => {
    let wall = new Wall();
    let walls = [];
    walls[2] = [];
    walls[2][2] = wall;
    let view = {
        person: {
            angle: 0,
            block: { x: 1, y: 2 },
            offset: { x: 0.4, y: 0.5 },
            pos: { x: 1.4, y: 2.5 },
            map2d: {
                maxX: 10,
                maxY: 10,
                getWall: (x, y) => walls[x] ? walls[x][y] : null
            }
        }
    };
    let ray = new Ray(view, Math.PI / 6);
    
    ray.cast();

    expect(ray.wall).toBe(wall);
    expect(ray.vertical).toBe(true);
    expect(ray.pos.x).toBeCloseTo(2, 0);
    expect(ray.pos.y).toBeCloseTo(2.85, 2);
    expect(ray.distAdjusted).toBeCloseTo(0.6, 2);
    expect(ray.wallOffset).toBeCloseTo(0.85, 2);
});