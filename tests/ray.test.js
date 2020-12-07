const Ray = require("../src/server/scripts/ray");
const Wall = require("../src/server/scripts/wall");

test("constructor success", () => {
    let ray = new Ray({ angle: Math.PI }, Math.PI/2);
    expect(ray.angle).toBe(Math.PI/2);
    expect(ray.view.angle).toBe(Math.PI);
});

test("calcAngle success 1", () => {
    let ray = new Ray({ angle: Math.PI * 1.5 }, Math.PI * 0.5 + Math.PI / 6);
    expect(ray.calcAngle()).toBeCloseTo(Math.PI / 6, 5);
});

test("calcAngle success 2", () => {
    let ray = new Ray({ angle: Math.PI }, Math.PI * 0.5 + Math.PI / 6);
    expect(ray.calcAngle()).toBeCloseTo(Math.PI * 1.5 + Math.PI / 6, 5);
});


test("calcDirY success 1", () => {
    let ray = new Ray({ angle: 0 }, Math.PI * 0.5);
    expect(ray.calcDirH()).toBe(1);
});

test("calcDirY success 2", () => {
    let ray = new Ray({ angle: 0 }, Math.PI * 1.5);
    expect(ray.calcDirH()).toBe(-1);
});

test("calcDirY success 3", () => {
    let ray = new Ray({ person: { angle: 0 } }, Math.PI);
    expect(ray.calcDirH()).toBe(0);
});

test("calcDirX success 1", () => {
    let ray = new Ray({ angle: 0 }, Math.PI * 2);
    expect(ray.calcDirV()).toBe(1);
});

test("calcDirX success 2", () => {
    let ray = new Ray({ angle: 0 }, Math.PI);
    expect(ray.calcDirV()).toBe(-1);
});

test("calcDirX success 3", () => {
    let ray = new Ray({ angle: 0 }, Math.PI * 0.5);
    expect(ray.calcDirV()).toBe(0);
});



test("calcDistH success 1", () => {
    let ray = new Ray({ person: { offset: { y: 0.2 } }, angle: 0 }, Math.PI / 6);
    expect(ray.calcDistH()).toBeCloseTo(1.6, 5);
});

test("calcDistH success 2", () => {
    let ray = new Ray({ person: { offset: { y: 0.2 } }, angle: 0 },  Math.PI + Math.PI / 3);
    expect(ray.calcDistH()).toBeCloseTo(0.23094, 5);
});

test("calcDistH success 3", () => {
    let ray = new Ray({ person: { offset: { y: 0.2 } }, angle: 0 }, 0);
    expect(ray.calcDistH()).toBeCloseTo(Infinity, 5);
});

test("calcDistH success 4", () => {
    let ray = new Ray({ person: { offset: { y: 0.2 }, angle: 0 } }, Math.PI);
    expect(ray.calcDistH()).toBeCloseTo(Infinity, 5);
});





test("calcDistV success 1", () => {
    let ray = new Ray({ person: { offset: { x: 0.3 } }, angle: 0 }, Math.PI / 6);
    expect(ray.calcDistV()).toBeCloseTo(0.80829, 5);
});

test("calcDistV success 2", () => {
    let ray = new Ray({ person: { offset: { x: 0.3 } }, angle: 0 },  Math.PI + Math.PI / 3);
    expect(ray.calcDistV()).toBeCloseTo(0.6, 5);
});

test("calcDistV success 3", () => {
    let ray = new Ray({ person: { offset: { x: 0.3 } }, angle: 0 }, Math.PI * 0.5);
    expect(ray.calcDistV()).toBe(Infinity, 5);
});

test("calcDistV success 4", () => {
    let ray = new Ray({ person: { offset: { x: 0.3 } }, angle: 0 }, Math.PI * 1.5);
    expect(ray.calcDistV()).toBeCloseTo(Infinity, 5);
});





test("calcDeltaDistH success 1", () => {
    let ray = new Ray({ person: { offset: { y: 0.2 } }, angle: 0 }, Math.PI / 6);
    expect(ray.calcDeltaDistH()).toBeCloseTo(2, 5);
});

test("calcDeltaDistH success 2", () => {
    let ray = new Ray({ person: { offset: { y: 0.2 } }, angle: 0 },  Math.PI + Math.PI / 3);
    expect(ray.calcDeltaDistH()).toBeCloseTo(1.15470, 5);
});

test("calcDeltaDistV success 1", () => {
    let ray = new Ray({ person: { offset: { x: 0.3 } }, angle: 0 }, Math.PI / 6);
    expect(ray.calcDeltaDistV()).toBeCloseTo(1.15470, 5);
});

test("calcDeltaDistV success 2", () => {
    let ray = new Ray({ person: { offset: { x: 0.3 } }, angle: 0 },  Math.PI + Math.PI / 3);
    expect(ray.calcDeltaDistV()).toBeCloseTo(2, 5);
});







test("castWall success 1", () => {
    let wall = new Wall();
    let walls = [];
    walls[2] = [];
    walls[2][3] = wall;
    let view = {
        angle: 0,
        person: {
            x: 1, 
            y: 2,
            offset: { x: 0.3, y: 0.2 },
            pos: { x: 1.3, y: 2.2 },
            map2d: {
                size: {
                    x: 10,
                    y: 10,
                },
                getWall: (x, y) => walls[x] ? walls[x][y] : null
            }
        }
    };
    let ray = new Ray(view, Math.PI / 6);
    
    ray.castWall();

    expect(ray.wall).toBe(wall);
    expect(ray.isVertical).toBe(false);
    expect(ray.pos.x).toBeCloseTo(2.69, 2);
    expect(ray.pos.y).toBeCloseTo(3, 0);
    expect(ray.distAdjusted).toBeCloseTo(1.39, 2);
    expect(ray.wallOffset).toBeCloseTo(0.69, 2);
});



test("castWall success 2", () => {
    let wall = new Wall();
    let walls = [];
    walls[7] = [];
    walls[7][6] = wall;
    let view = {
        angle: 0,
        person: {
            x: 1, 
            y: 2,
            offset: { x: 0.3, y: 0.2 },
            pos: { x: 1.3, y: 2.2 },
            map2d: {
                size: {
                    x: 10,
                    y: 10,
                },
                getWall: (x, y) => walls[x] ? walls[x][y] : null
            }
        }
    };
    let ray = new Ray(view, Math.PI / 6);
    
    ray.castWall();

    expect(ray.wall).toBe(wall);
    expect(ray.isVertical).toBe(false);
    expect(ray.pos.x).toBeCloseTo(7.88, 2);
    expect(ray.pos.y).toBeCloseTo(6, 0);
    expect(ray.distAdjusted).toBeCloseTo(6.581, 2);
    expect(ray.wallOffset).toBeCloseTo(0.88, 2);
});


test("castWall success 3", () => {
    let wall = new Wall();
    let walls = [];
    walls[3] = [];
    walls[3][1] = wall;
    let view = {
        angle: 0,
        person: {
            x: 4, 
            y: 2,
            offset: { x: 0.4, y: 0.4 },
            pos: { x: 4.4, y: 2.4 },
            map2d: {
                size: {
                    x: 10,
                    y: 10,
                },
                getWall: (x, y) => walls[x] ? walls[x][y] : null
            }
        }
    };
    let ray = new Ray(view, Math.PI + Math.PI / 6);
    
    ray.castWall();

    expect(ray.wall).toBe(wall);
    expect(ray.isVertical).toBe(false);
    expect(ray.pos.x).toBeCloseTo(3.71, 2);
    expect(ray.pos.y).toBeCloseTo(2, 0);
    expect(ray.distAdjusted).toBeCloseTo(0.693, 2);
    expect(ray.wallOffset).toBeCloseTo(0.71, 2);
});


test("castWall success 4", () => {
    let wall = new Wall();
    let walls = [];
    walls[1] = [];
    walls[1][0] = wall;
    let view = {
        angle: 0,
        person: {
            x: 4, 
            y: 2,
            offset: { x: 0.4, y: 0.4 },
            pos: { x: 4.4, y: 2.4 },
            map2d: {
                size: {
                    x: 10,
                    y: 10,
                },
                getWall: (x, y) => walls[x] ? walls[x][y] : null
            }
        }
    };
    let ray = new Ray(view, Math.PI + Math.PI / 6);
    
    ray.castWall();

    expect(ray.wall).toBe(wall);
    expect(ray.isVertical).toBe(false);
    expect(ray.pos.x).toBeCloseTo(1.98, 2);
    expect(ray.pos.y).toBeCloseTo(1, 0);
    expect(ray.distAdjusted).toBeCloseTo(2.425, 2);
    expect(ray.wallOffset).toBeCloseTo(0.98, 2);
});




test("castWall success 5", () => {
    let wall = new Wall();
    let walls = [];
    walls[2] = [];
    walls[2][2] = wall;
    let view = {
        angle: 0,
        person: {
            x: 1, 
            y: 2,
            offset: { x: 0.4, y: 0.5 },
            pos: { x: 1.4, y: 2.5 },
            map2d: {
                size: {
                    x: 10,
                    y: 10,
                },
                getWall: (x, y) => walls[x] ? walls[x][y] : null
            }
        }
    };
    let ray = new Ray(view, Math.PI / 6);
    
    ray.castWall();

    expect(ray.wall).toBe(wall);
    expect(ray.isVertical).toBe(true);
    expect(ray.pos.x).toBeCloseTo(2, 0);
    expect(ray.pos.y).toBeCloseTo(2.85, 2);
    expect(ray.distAdjusted).toBeCloseTo(0.6, 2);
    expect(ray.wallOffset).toBeCloseTo(0.85, 2);
});