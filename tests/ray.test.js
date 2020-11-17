const { Ray } = require("../src/server/ray");

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
    let blocks = [];
    blocks[4] = [];
    blocks[4][2] = {};
    let view = {
        person: {
            angle: 0,
            block: { x: 1, y: 2 },
            offset: { y: 0.2, x: 0.3 },
            map2d: {
                maxX: 10,
                maxY: 10,
                blocks: blocks
            }
        }
    };
    let ray = new Ray(view, Math.PI / 3);
    
    ray.cast();

    expect(ray.calcDistV()).toBeCloseTo(1.21244, 5);
});